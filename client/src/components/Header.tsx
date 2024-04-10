import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logout from '../api fetch/logout'

const Header = () => {
  const loggedin = useSelector((state:{loggedin: {loggedin: boolean}}) => state.loggedin.loggedin)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries(["isLoggedin"], {exact: true})
      navigate('/signin')
    }
  })
  return (
    <div className='bg-[#0e387a] py-6'>
      <div className='container mx-auto flex justify-between items-center flex-wrap'>
        <span className='text-3xl text-white font-bold tracking-tight mr-4 mb-2 max-sm:text-[25px]'>
          <Link to="/">MERNHolidays.com</Link>
        </span>

          {
            loggedin ? 
            <div className='flex gap-3 max-sm:gap-1'>
              <Link to={'/myBookings'} className='button'>My Bookings</Link>
              <Link to={'/myHotels'} className='button'>My Hotels</Link>
              <button onClick={() => mutation.mutate()} className='button'>Sign out</button>
            </div> :
            <span className='flex space-x-2'>
              <Link to="/signin" className='flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 rounded-md py-1 max-sm:text-[0.95rem] max-sm:px-2'>Sign in</Link>
            </span>
          }
        

      </div>
    </div>
  )
}

export default Header