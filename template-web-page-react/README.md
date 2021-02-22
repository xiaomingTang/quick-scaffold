# <%= scaffoldConfig.projectName %>

### 项目特点
- `webpack 5` + `typescript` + `react`
- 使用`dll plugin`优化包体积
- `less module` + `postcss` + `autoprefixer`
- development 时依赖编辑器进行 `typescript` 及 `eslint` 校验, 加快开发构建速度
- production 时使用 `fork-ts-checker-webpack-plugin` 进行 `typescript` 及 `eslint` 校验
- 一键(`yarn run bundle`)分析打包状况(利用`webpack-bundle-analyzer`)

### warning
- 个人将`.vscode`配置也加入了`git`版本管理, 你可以自主决定是否需要将`.vscode`添加到`.gitignore`(可能会影响到同时使用该项目的其他人)
