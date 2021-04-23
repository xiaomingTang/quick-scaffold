import axios from "axios"

export const cancelSource = axios.CancelToken.source()

export const http = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {},
})

axios.interceptors.request.use((config) => ({
  // 自带 cancelToken 的就不覆盖
  cancelToken: cancelSource.token,
  ...config,
}))
