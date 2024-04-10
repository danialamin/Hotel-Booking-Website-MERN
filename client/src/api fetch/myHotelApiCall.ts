

const myHotelApiCall = async (id: string) => {
  const resp = await fetch(`http://localhost:3100/hotels/myHotel/${id}`, {
    credentials: "include"
  })

  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error('error')
  }
}

export default myHotelApiCall