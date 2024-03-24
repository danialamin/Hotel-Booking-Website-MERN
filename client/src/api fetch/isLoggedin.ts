

const isLoggedin = async () => {
  const resp = await fetch('http://localhost:3100/users/isLoggedin', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: "include"
  })

  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error('error')
  }
}

export default isLoggedin