import React from "react"
import {
  useLocation, Link,
} from "react-router-dom"

export default function NotFound() {
  const location = useLocation()

  return <div key="404" style={{ padding: "10px" }}>
    <p>404 Not Found</p>
    <p>
      page
      [ {location.pathname} ]
      not found, you can go to
      <Link to="/" replace> Home</Link>
    </p>
  </div>
}
