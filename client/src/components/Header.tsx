import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between items-center'>
        <span className='text-3xl text-white font-bold tracking-tight max-sm:text-xl'>
          <Link to="/">MERNHolidays.com</Link>
        </span>
        <span className='flex space-x-2'>
          <Link to="/sign-in" className='flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 rounded-md py-1 max-sm:text-[0.95rem] max-sm:px-2'>Sign in</Link>
        </span>

      </div>
    </div>
  )
}

export default Header