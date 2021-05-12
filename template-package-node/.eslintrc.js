const path = require("path")

module.exports = {
  "root": true,
  "env": {
    "node": true,
    "es6": true,
  },
  "extends": [
    "eslint:recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": true
  },
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "import/named": "off",
    "import/prefer-default-export": "off",
    // "import/no-unresolved": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    // 关闭换行风格检测
    "linebreak-style": "off",
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "no-console": "off",
    "semi": ["error", "never"],
    "max-len": "off",
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".js", ".json"],
      },
      "webpack": {
        "config": {
          "resolve": {
            "alias": {
              "@Src": path.resolve("./src"),
              "@Test": path.resolve("./test"),
            },
          }
        }
      }
    },
  },
}