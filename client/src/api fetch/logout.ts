

const logout = async () => {
  const resp = await fetch('http://localhost:3100/users/logout', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: "include"
  })

  if (resp.ok) {
    return resp.json()
  } else {
    throw new Error()
  }
}

export default logout