// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import AppRouter from "./app/router"
import "./styles/theme.css"

// Contextos
import { UserProvider } from "./context/UserContext"
import { CartProvider } from "./context/CartContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
)
