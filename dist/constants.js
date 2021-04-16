"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplateFromTitle = exports.templateTypes = exports.templates = void 0;
const utils_1 = require("./utils");
exports.templates = [
    {
        title: "web page of react",
        rootPath: utils_1.resolveProject("template-web-page-react"),
    },
    {
        title: "web package",
        rootPath: utils_1.resolveProject("template-package-web"),
    },
    {
        title: "node package",
        rootPath: utils_1.resolveProject("template-package-node"),
    },
];
exports.templateTypes = exports.templates.map(({ title }) => title);
function getTemplateFromTitle(title) {
    return exports.templates.find(({ title: theTitle }) => title === theTitle);
}
exports.getTemplateFromTitle = getTemplateFromTitle;
