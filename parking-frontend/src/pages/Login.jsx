import React, { useState } from 'react'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useAuthStore(state => state.login)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = await loginUser({ email, password })
      login(data.user)
      navigate('/dashboard')
    } catch (err) {
      alert('Login failed: ' + (err?.response?.data?.message || err.message))
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border px-3 py-2" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full border px-3 py-2" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}
