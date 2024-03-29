import React from 'react'
import { SubmitHandler, } from 'react-hook-form'
import HotelForm, { FormFields } from '../components/HotelForm'
import { useMutation } from 'react-query'
import addHotelApiCall from '../api fetch/addHotelApiCall'

const AddHotel = () => {

  const mutation = useMutation({
    mutationFn: (formDataNew: FormData) => addHotelApiCall(formDataNew),
  })

  return (
    <HotelForm mutation={mutation} isLoading={mutation.status} />
  )
}

export default AddHotel