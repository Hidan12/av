import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { StandarLayouts } from './layouts/StandarLayouts'
import Home from './pages/home/Home'
import { LayoutsEspecial } from './layouts/LayoutsEspecial'
import { Viaje } from './pages/viajes/Viaje'
import { Compra } from './pages/compra/Compra'

const router = createBrowserRouter([
  {
    element: <StandarLayouts/>,
    children: [
      {path: "/", element: <Home />}
    ]
  },
  {
    element: <LayoutsEspecial/>,
    children: [
      {path: "/viaje", element:<Viaje/>},
      {path:"/compra", element:<Compra/>}
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
