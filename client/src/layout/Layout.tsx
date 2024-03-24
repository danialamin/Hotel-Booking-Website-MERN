import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Hero />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout