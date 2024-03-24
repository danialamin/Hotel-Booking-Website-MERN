import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#0e387a] py-10'>
      <div className='container mx-auto flex justify-between items-center gap-2'>
        <span className='text-3xl text-white font-bold tracking-tight max-sm:text-[1.2rem]'>
          MernHolidays.com
        </span>
        <span className='text-white font-bold tracking-tight flex gap-2'>
          <p className='cursor-pointer max-sm:text-[0.9rem] tracking-tighter'>Privacy Policy</p>
          <p className='cursor-pointer max-sm:text-[0.9rem] tracking-tighter'>Terms of Service</p>
        </span>
      </div>
    </div>
  )
}

export default Footer