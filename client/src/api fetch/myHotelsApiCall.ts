

const myHotelsApiCall = async () => {
  const resp = await fetch('http://localhost:3100/hotels/myHotels', {
    credentials: "include"
  })

  if (resp.ok) {
    return resp.json()
  } else {
    console.log('HI')
    throw new Error('HI')
  }
}

export default myHotelsApiCall