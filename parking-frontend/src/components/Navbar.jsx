import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <h1 className="text-xl font-bold">🚗 Parking System</h1>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/parking-lot">Parking Lot</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
