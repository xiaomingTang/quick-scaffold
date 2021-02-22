import pkg from "../package.json"

export const thatTime = Date.now()

export const isProduction = process.env.NODE_ENV !== "development"

export const appName = pkg.name

export const appVersion = pkg.version
