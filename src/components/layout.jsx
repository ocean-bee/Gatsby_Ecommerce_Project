import React from "react"
import NavBar from "./nav"
import Footer from "./footer"

export default function Layout({ children }) {
  return (
    <div>
        <NavBar />
        <div className="py-10 bg-gray-100">
            {children}
          </div>
        <Footer />
    </div>
  )
}