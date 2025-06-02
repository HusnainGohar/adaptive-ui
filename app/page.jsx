"use client"

import { UserProvider } from "../src/context/UserContext"
import App from "../src/App"
import "../src/index.css"

export default function Page() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  )
}
