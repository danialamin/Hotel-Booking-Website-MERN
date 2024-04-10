
const addHotelApiCall = async (formData: FormData) => {
  const resp = await fetch('http://localhost:3100/hotels/create', {
    method: 'POST',
    credentials: 'include',
    body: formData
  }) 

  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error('error')
  }
}

export default addHotelApiCall