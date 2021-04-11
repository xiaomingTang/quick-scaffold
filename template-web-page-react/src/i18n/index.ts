import i18n from "i18next"
import i18nBackEnd from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

import { defaultLang } from "./datas"

i18n
  .use(i18nBackEnd)
  .use(initReactI18next)
  .init({
    lng: defaultLang,
    fallbackLng: defaultLang,
    fallbackNS: "translation",
    backend: {
      loadPath: "./static/i18n-locales/{{lng}}/{{ns}}.json",
    },
  })
