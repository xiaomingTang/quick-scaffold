#!/usr/bin/env node
import fs from "fs"
import path from "path"
import inquirer from "inquirer"
import { Base, File, Dir } from "tang-base-node-utils"

import { log, resolveProject, resolveUser } from "./utils"

interface Template {
  title: string;
  rootPath: string;
}

interface SimpleAnswers {
  templateType: string;
  projectName: string;
  description: string;
}

const templates: Template[] = [
  {
    title: "web page of react",
    rootPath: resolveProject("template-web-page-react"),
  },
  {
    title: "web package",
    rootPath: resolveProject("template-package-web"),
  },
  {
    title: "node package",
    rootPath: resolveProject("template-package-node"),
  },
]

function getTemplateFromTitle(title: string): Template {
  return templates.find(({ title: theTitle }) => title === theTitle)
}

async function replaceAndCopyTemplate() {
  const answers: SimpleAnswers = await inquirer.prompt([
    {
      type: "list",
      name: "templateType",
      message: "template type:",
      choices: templates.map(({ title }) => title),
      loop: true,
    },
    {
      type: "input",
      name: "projectName",
      message: "your project name:",
      default: `quick-scaffold-${Date.now()}`,
      validate: (input: string, curAnswers: SimpleAnswers) => {
        if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/g.test(input)) {
          return "/^[a-zA-Z][a-zA-Z0-9_-]*$/g is accepted."
        }
        if (fs.existsSync(resolveUser(input))) {
          return "file or dir exists, input a new name please."
        }
        return true
      },
    },
    {
      type: "input",
      name: "description",
      message: "your project description:",
      default: "",
    },
  ])

  const { templateType, projectName, description } = answers
  const templateRootPath = getTemplateFromTitle(templateType).rootPath

  if (!templateRootPath) {
    throw new Error("invalid template type.")
  }

  const templateDir = new Dir(templateRootPath)
  const allFiles: File[] = []
  // 及其简陋地忽略 node_modules 目录
  templateDir.rawChildren.forEach((childName) => {
    if (childName === "node_modules") {
      return
    }
    const base = templateDir.childOf(childName)
    if (base.isDir) {
      allFiles.push(...base.asDir().allFiles)
    } else if (base.isFile) {
      allFiles.push(base.asFile())
    } else {
      // 这儿应当永远不会出现(never), 所以报个错
      throw new Error(`${childName} is not fold neither file`)
    }
  })
  allFiles.forEach((f) => {
    const relPath = path.relative(templateDir.path, f.path).replace("__UNUSED_PREFIX__", "")
    const tarBase = new Base(resolveUser(projectName, relPath))
    let replacedContent = f.read()
    let isConfigIncluded = false
    Object.entries(answers)
      // 在此明确指出, 哪些 answers 参与 replace
      .filter(([key]) => ["projectName", "description"].includes(key))
      .forEach(([key, val]) => {
        replacedContent = replacedContent.replace(new RegExp(`<%= scaffoldConfig.${key} %>`, "gm"), () => {
          isConfigIncluded = true
          return val
        })
      })
    // 存在待替换的配置, 将替换后的内容写入文本文件(因为该项目中文本文件都是 utf8 编码的)
    // 不存在则原封不动复制过去(这样就不必判断源文件编码)
    if (isConfigIncluded) {
      tarBase.createAsFile().write(replacedContent)
    } else {
      tarBase.parent.createAsDir()
      fs.copyFileSync(f.path, tarBase.path)
    }
  })

  log.success(`
  your project ${projectName} has been inited.
  next cmd you should run:

    cd ${projectName}
    yarn

  for more scripts, you can review \`${projectName}/package.json\` > scripts
  for more infomation, you can review \`${projectName}/README.md\`
  `)
}

function main() {
  replaceAndCopyTemplate()
}

if (require.main === module) {
  main()
} else {
  log.warn("this file is only used for create quick-scaffold, cannot be imported.")
}
