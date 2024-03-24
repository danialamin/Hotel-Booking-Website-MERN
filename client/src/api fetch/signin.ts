type RegisterFormData = {
  email: string,
  password: string
}

const signin = async (formData: RegisterFormData) => {
  const resp = await fetch("http://localhost:3100/users/signin", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(formData)
  })

  if (resp.ok) {
    return resp.json()
  } 
  else {
    throw new Error('error')
  }
}

export default signin