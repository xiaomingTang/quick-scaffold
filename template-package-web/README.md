# <%= scaffoldConfig.projectName %>
模板来自 [quick-scaffold template-package-web](https://github.com/xiaomingTang/quick-scaffold)

<%= scaffoldConfig.description %>

### 项目特点
- `webpack 5` + `typescript` + `react`
- 使用`dll plugin`优化包体积
- `less module` + `postcss` + `autoprefixer`

### warning
- 个人将`.vscode`配置也加入了`git`版本管理, 你可以自主决定是否需要将`.vscode`添加到`.gitignore`(可能会影响到同时使用该项目的其他人)
- `dist-examples` 目录内的内容可以在 development 环境下以 `/file-path` 或 `./file-path` 访问到
- 如有需要, 可以自定义 `config/webpack.prod.config.ts` 内 `externals` 的值
