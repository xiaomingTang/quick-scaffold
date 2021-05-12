"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveProject = exports.resolveUser = exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
exports.log = {
    info: (...text) => {
        console.log(chalk_1.default.cyan("[info] ", ...text));
    },
    success: (...text) => {
        console.log(chalk_1.default.green("[success] ", ...text));
    },
    warn: (...text) => {
        console.log(chalk_1.default.yellow("[warn] ", ...text));
    },
    error: (...text) => {
        console.log(chalk_1.default.red("[error] ", ...text));
    },
    whispered: (...text) => {
        console.log(chalk_1.default.gray("[whispered] ", ...text));
    },
};
function resolveUser(...paths) {
    return path_1.default.resolve(process.cwd(), ...paths);
}
exports.resolveUser = resolveUser;
function resolveProject(...paths) {
    return path_1.default.resolve(__dirname, "../", ...paths);
}
exports.resolveProject = resolveProject;
