import { resolveProject } from "./utils";

export interface Template {
  title: string;
  rootPath: string;
}

export const templates: Template[] = [
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
  {
    title: "tampermonkey",
    rootPath: resolveProject("template-tampermonkey"),
  },
]

export const templateTypes = templates.map(({ title }) => title)

export function getTemplateFromTitle(title: string): Template {
  return templates.find(({ title: theTitle }) => title === theTitle)
}
