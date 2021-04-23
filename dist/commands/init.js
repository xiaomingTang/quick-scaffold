"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const tang_base_node_utils_1 = require("tang-base-node-utils");
const utils_1 = require("../utils");
const templates_1 = require("../templates");
function checkProjectName(input, curAnswers) {
    if (!/^[a-zA-Z][a-zA-Z0-9_-]{0,30}$/g.test(input)) {
        return "/^[a-zA-Z][a-zA-Z0-9_-]{0,30}$/g is accepted.";
    }
    const base = new tang_base_node_utils_1.Base(utils_1.resolveUser(input));
    if (base.isFile) {
        return `there is a file named ${input} exists`;
    }
    if (!base.isDir) {
        return true;
    }
    const availableChildren = [
        ".git",
        "node_modules",
    ];
    // 如果除允许存在的 children 外, 目标目录还存在其他文件, 则不合法
    if (base.asDir().rawChildren.filter((child) => !availableChildren.includes(child)).length > 0) {
        return `the dir includes othre file except [${availableChildren.join(", ")}]`;
    }
    return true;
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "templateType",
                message: "template type:",
                choices: templates_1.templateTypes,
                loop: true,
            },
            {
                type: "input",
                name: "projectName",
                message: "your project name:",
                default: `quick-scaffold-${Date.now()}`,
                validate: checkProjectName,
            },
            {
                type: "input",
                name: "description",
                message: "your project description:",
                default: "a quick-scaffold project",
            },
        ]);
        const { templateType, projectName } = answers;
        const templateRootPath = templates_1.getTemplateFromTitle(templateType).rootPath;
        // 正常情况下该值是存在的, 如果不存在则是程序出错
        if (!templateRootPath) {
            throw new Error("invalid template type.");
        }
        const templateDir = new tang_base_node_utils_1.Dir(templateRootPath);
        const allFiles = [];
        const notCopiedList = [
            ".git",
            "node_modules",
        ];
        // 极其简陋地忽略 node_modules 及 .git 目录/文件(正常情况下模板目录中不会出现这些目录/文件)
        templateDir.rawChildren.forEach((childName) => {
            if (notCopiedList.includes(childName)) {
                return;
            }
            const base = templateDir.childOf(childName);
            if (base.isDir) {
                allFiles.push(...base.asDir().allFiles);
            }
            else if (base.isFile) {
                allFiles.push(base.asFile());
            }
            else {
                // 正常情况下应当永远不会执行到这儿, 所以报个错
                throw new Error(`${childName} is not fold neither file`);
            }
        });
        allFiles.forEach((f) => {
            const relPath = path_1.default.relative(templateDir.path, f.path).replace("__UNUSED_PREFIX__", "");
            const tarBase = new tang_base_node_utils_1.Base(utils_1.resolveUser(projectName, relPath));
            let replacedContent = f.read();
            let isConfigIncluded = false;
            Object.entries(answers)
                // 在此明确指出, 哪些 answers 参与 replace
                .filter(([key]) => ["projectName", "description"].includes(key))
                .forEach(([key, val]) => {
                replacedContent = replacedContent.replace(new RegExp(`<%= scaffoldConfig.${key} %>`, "gm"), () => {
                    isConfigIncluded = true;
                    return val;
                });
            });
            // 存在待替换的配置, 则将替换后的内容写入文本文件(因为该项目中文本文件都是 utf8 编码的)
            // 不存在则原封不动复制过去(这样就不必判断源文件编码)
            if (isConfigIncluded) {
                tarBase.createAsFile().write(replacedContent);
            }
            else {
                tarBase.parent.createAsDir();
                fs_1.default.copyFileSync(f.path, tarBase.path);
            }
        });
        utils_1.log.success(`
  your project ${projectName} has been inited.
  next cmd you should run:

    cd ${projectName}
    yarn
    yarn start

  - for more scripts, you can review \`${projectName}/package.json\` > scripts
  - for more infomation, you can review \`${projectName}/README.md\`
  `);
    });
}
exports.init = init;
