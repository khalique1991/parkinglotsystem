function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-80">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Login</h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-3 border rounded-lg focus:outline-none"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
