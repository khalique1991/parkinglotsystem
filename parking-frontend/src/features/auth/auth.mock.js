export const loginMock = async ({ email, password }) => {
  await new Promise(r => setTimeout(r, 300))
  if ((email === 'admin@x.com' || email === 'test@example.com') && password === 'password') {
    return { data: { user: { id: 1, name: 'Admin User', role: 'ADMIN', email }, token: 'mock-token' } }
  }
  throw Object.assign(new Error('Invalid credentials'), { response: { status: 401 } })
}

export const meMock = async () => ({ data: { id: 1, name: 'Admin User', role: 'ADMIN', email: 'admin@x.com' } })
