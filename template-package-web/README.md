# <%= scaffoldConfig.projectName %>

### 项目特点
- `webpack 5` + `typescript` + `react`
- 使用`dll plugin`优化包体积
- `less module` + `postcss` + `autoprefixer`

### warning
- `package.json` 中将 `dll` 的构建从 `build` 命令中分离出来了, 所以运行 `yarn run build` 之前, **必须先运行 `yarn run build:dll` 生成 `dll` 目录**(项目中已存在 `dll` 目录且 `dll` 未变化则**无需**再次执行)
- 个人将`.vscode`配置也加入了`git`版本管理, 你可以自主决定是否需要将`.vscode`添加到`.gitignore`(可能会影响到同时使用该项目的其他人)
