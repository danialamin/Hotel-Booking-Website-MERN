import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./layout/Layout"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import isLoggedin from "./api fetch/isLoggedin"
import { isLoggedinAction, notLoggedinAction } from "./redux/loggedinSlice"
import ProtectedRoute from "./layout/ProtectedRoute"
import AddHotel from "./pages/AddHotel"
import MyHotels from "./pages/MyHotels"

function App() {
  const dispatch = useDispatch()
  const query = useQuery({
    queryKey: ['isLoggedin'],
    queryFn: isLoggedin,
  })
  if (query.status === 'success') {
    dispatch(isLoggedinAction())
  } if (query.status === 'error') {
    dispatch(notLoggedinAction())
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path="signin" element=<Signin /> />
      <Route path="signup" element=<Signup /> />
      <Route element={<ProtectedRoute />}>
        <Route path="addHotel" element={<AddHotel />} />
        <Route path="myHotels" element={<MyHotels />} />
      </Route>
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
