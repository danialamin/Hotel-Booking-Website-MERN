import React from 'react'
import HotelForm from '../components/AddHotelForm'
import { useMutation, useQueryClient } from 'react-query'
import addHotelApiCall from '../api fetch/addHotelApiCall'
import { useNavigate } from 'react-router-dom'

const AddHotel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (formDataNew: FormData) => addHotelApiCall(formDataNew),
    onSuccess: () => { 
      navigate('/myHotels')
      queryClient.invalidateQueries('myQueryKey',{exact: true}) }
  })

  return (
    <HotelForm mutation={mutation} isLoading={mutation.status} />
  )
}

export default AddHotel