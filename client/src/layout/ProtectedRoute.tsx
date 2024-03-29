import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const loggedin = useSelector((state: {loggedin: {loggedin: boolean}}) => state.loggedin.loggedin)

  const navigateToSignin = () => {
    return useEffect(() => {
      navigate("/signin")
    }, [])
  }
  if (loggedin) {
    return <Outlet />
  } else {
    navigateToSignin
  }
}

export default ProtectedRoute