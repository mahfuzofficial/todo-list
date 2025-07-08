const BASE_URL = process.env.REACT_APP_API_URL

// signup new user
export const register = async (body) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  return res.json()
}

// login user
export const login = async (body) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  return res.json()
}

// get all tasks of user
export const getTasks = async (token) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}

// add new task
export const addTask = async (token, taskData) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(taskData)
  })
  return res.json()
}

// flip the completed (true/false)
export const toggleComplete = async (token, id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}

// delete one task by id
export const deleteTask = async (token, id) => {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}

// get current user profile (name, email)
export const getUserProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}

