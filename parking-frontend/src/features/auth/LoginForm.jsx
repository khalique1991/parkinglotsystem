import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'


// This file uses either mock or real API depending on VITE_USE_MOCK
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
let apiModule
if (USE_MOCK) apiModule = await import('../../api/mock.api')
else apiModule = await import('../../api/auth.api')


export default function LoginForm() {
const { login } = useContext(AuthContext)
const navigate = useNavigate()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loading, setLoading] = useState(false)


const handleSubmit = async (e) => {
e.preventDefault()
setLoading(true)
try {
const res = await apiModule.login({ email, password })
// mock returns { data: { user, token } } ; real may vary
const user = res.data.user || res.data
const token = res.data.token || 'token'
login(user, token)
navigate('/dashboard')
} catch (err) {
alert('Invalid credentials')
} finally {
setLoading(false)
}
}


return (
<form onSubmit={handleSubmit} className="flex flex-col gap-3">
<input className="border p-2 rounded" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input className="border p-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
<button className="bg-blue-600 text-white p-2 rounded" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
</form>
)
}