import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./layout/Layout"

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >

    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
