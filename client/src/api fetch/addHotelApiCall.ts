import React from 'react'
import { FormFields } from '../components/HotelForm'

const addHotelApiCall = async (formData: FormData) => {
  const resp = await fetch('http://localhost:3100/hotels/create', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(formData)
  }) 

  if (resp.ok) {
    return resp.json()
  } else {
    console.log(formData)
    throw new Error('error')
  }
}

export default addHotelApiCall