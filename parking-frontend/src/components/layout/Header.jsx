import { useAuth } from '../../contexts/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()
  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md border-b">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-extrabold text-blue-700 tracking-tight">Parking Admin</div>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-base text-gray-700 font-medium">{user.name} <span className="text-xs text-gray-500">({user.role})</span></span>
            <button onClick={logout} className="text-sm px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition font-semibold">Logout</button>
          </>
        ) : null}
      </div>
    </header>
  )
}
