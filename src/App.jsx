import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { StandarLayouts } from './layouts/StandarLayouts'
import Home from './pages/home/Home'
import { LayoutsEspecial } from './layouts/LayoutsEspecial'
import { Viaje } from './pages/viajes/Viaje'
import { Compra } from './pages/compra/Compra'
import { CompraExitosa } from './pages/compraExistosa/CompraExitosa'
import { ErrorCompra } from './pages/errorCompra/ErrorCompra'

const router = createBrowserRouter([
  {
    element: <StandarLayouts/>,
    children: [
      {path: "/", element: <Home />},
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  },
  {
    element: <LayoutsEspecial/>,
    children: [
      {path: "/viaje", element:<Viaje/>},
      {path:"/compra", element:<Compra/>},
      {path: "/compraExitosa", element:<CompraExitosa/>},
      {path:"/errorCompra", element:<ErrorCompra/>},
      {path: "*", element: <Navigate to="/" replace /> }
    ]
  }
])

function App() {


  return (
    <>
      <RouterProvider router={router}/>      
    </>
  )
}

export default App
