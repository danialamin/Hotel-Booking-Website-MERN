

export const signup = async (formData: unknown) => {
  const res = await fetch("http://localhost:3100/users/createUser", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(formData)
  })

  if (res.ok) {
    return res.json()
  } else {
    throw new Error('error')
  }
}