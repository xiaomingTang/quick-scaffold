# <%= scaffoldConfig.projectName %>
模板来自 [quick-scaffold template-web-page-react](https://github.com/xiaomingTang/quick-scaffold)

<%= scaffoldConfig.description %>

### Usage
- dev: `yarn start`
- build: `yarn build` (需要先执行`yarn build:dll`, 详情参见下面的 warning)
- lint: `yarn lint` or `yarn lint:fix`
- 打包状况: `yarn bundle`
- 更多命令详见[package.json scripts 参数](./package.json)

### 项目特点
- `typescript` + `babel` + `PWA` + `代码分割(React.lazy)` + `页面切换动画` + `dll` + `eslint`
- `react` + `redux` + `router` + `i18n` + `antd` + `iconfont`
- `less module` + `postcss` + `autoprefixer`
- development 时依赖编辑器进行 `typescript` 及 `eslint` 校验, 加快开发构建速度
- production 时使用 `fork-ts-checker-webpack-plugin` 进行 `typescript` 及 `eslint` 校验
- 可在 `config/.env.ts` 或 `config/.env.local.ts` 配置 `process.env` 变量

### warning
- `package.json` 中将 `dll` 的构建从 `build` 命令中分离出来了, 所以运行 `yarn run build` 之前, **必须先运行 `yarn run build:dll` 生成 `dll` 目录**(项目中已存在 `dll` 目录且 `dll` 未变化则**无需**再次执行)
