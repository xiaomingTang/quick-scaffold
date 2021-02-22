import React from "react"
import {
  useLocation, Link,
} from "react-router-dom"

export default function NotFound() {
  const location = useLocation()

  return <div>
    <p>404 Not Found</p>
    <p>
      页面
      【{location.pathname}】
      未找到, 立即
      <Link to="/">返回主页</Link>
    </p>
  </div>
}
