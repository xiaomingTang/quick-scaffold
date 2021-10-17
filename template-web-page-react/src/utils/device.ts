const ua = (window.navigator.userAgent || "").toLowerCase()

export const isMobile = ua.includes("android") || ua.includes("iphone")
export const isAndroid = ua.includes("android")
