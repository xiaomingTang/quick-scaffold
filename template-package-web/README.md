# <%= scaffoldConfig.projectName %>
模板来自 [quick-scaffold](https://github.com/xiaomingTang/quick-scaffold) -> [web package](https://github.com/xiaomingTang/quick-scaffold/tree/master/template-package-web)

<%= scaffoldConfig.description %>

### 项目特点
- `webpack 5` + `typescript` + `react`
- `less module` + `postcss` + `autoprefixer`
- 出于开发便利角度, 启用了 `babel-loader`, 导致 `esm` `tree shaking` 暂时无效, 待修复

### warning
- `dist-examples` 目录内的内容可以在 development 环境下以 `/file-path` 或 `./file-path` 访问到
- 如有需要, 可以自定义 `config/webpack.prod.config.ts` 内 `externals` 的值
