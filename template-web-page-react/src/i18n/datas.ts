// 需要增刪语言都在此处
const langList: {
  /**
   * static/locales/ 目录下的目录名, 必须唯一
   */
  name: string;
  label: string;
}[] = [
  { name: "simpleChinese", label: "简体中文" },
  { name: "traditionalChinese", label: "繁體中文" },
  { name: "english", label: "English" },
  { name: "martian", label: "oぃ吙煋伩ヤ" },
]

type LangTitleMap = Record<string, string>

const langTitleMap: LangTitleMap = (() => {
  const obj: LangTitleMap = {}
  langList.forEach(({ name, label }) => {
    if (obj[name]) {
      throw new Error(`wrong language config\nexist: name: ${name}, label: ${obj[name]}\nrepeat: name: ${name}, label: ${label}`)
    }
    obj[name] = label
  })
  return obj
})()

export function getLangTitle(lang: string) {
  return langTitleMap[lang] || "unknown lang"
}

export const availableLangs: string[] = langList.map(({ name }) => name)

export const defaultLang: string = availableLangs[0]
