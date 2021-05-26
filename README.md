# quick-scaffold

用于快速生成模板    

当前以下几类模板:
- [web page of react](./template-web-page-react/README.md)
    - 用于快速搭建react页面
    - `typescript` + `babel` + `PWA` + `代码分割(React.lazy)` + `页面切换动画` + `dll` + `eslint`
    - `react` + `redux` + `router` + `i18n` + `antd` + `iconfont`
    - `less module` + `postcss` + `autoprefixer`
- [web package](./template-package-web/README.md)
    - 用于快速搭建 web 包
- [node package](./template-package-node/README.md)
    - 用于快速搭建 node 包
- [tampermonkey](./template-tampermonkey/README.md)
    - 用于快速搭建油猴脚本
    - `typescript` + `react` + `material-ui`(不用 `antd`, 因为 `antd` 会污染源网站的样式)
    - `hot reload`(development环境下) +  `eslint` + `less` + `less module`
    - 自动添加油猴脚本描述(详见[config/constants.ts](config/constants.ts))
    - 油猴内置函数的类型支持(详见[config/constants.ts](config/constants.ts)和[https://github.com/silverwzw/Tampermonkey-Typescript-Declaration](https://github.com/silverwzw/Tampermonkey-Typescript-Declaration))

### Usage
```
npx quick-scaffold
```
