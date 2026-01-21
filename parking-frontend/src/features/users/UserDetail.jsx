import { useParams, useNavigate } from 'react-router-dom'
import { useUser, useUpdateUser } from './useUser';
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function UserDetail() {
  const { id } = useParams()
  const { data: user, isLoading } = useUser(id)
  const updateMut = useUpdateUser()
  const { register, handleSubmit, reset } = useForm()
  const nav = useNavigate()

  useEffect(() => { if (user) reset({ name: user.name, email: user.email, role: user.role }) }, [user, reset])

  if (isLoading) return <div className="text-center py-10 text-lg text-gray-500">Loading...</div>
  if (!user) return <div className="text-center py-10 text-lg text-red-600">User not found</div>

  const onSubmit = async (payload) => {
    try {
      await updateMut.mutateAsync({ id, payload })
      alert('Updated')
      nav('/users')
    } catch { alert('Failed') }
  }

  return (
    <div className="p-10 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-xl mx-auto mt-12 flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold text-blue-700 mb-4">User #{user.id}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block mb-2">
          <span className="block text-gray-700 font-medium mb-1">Name</span>
          <input {...register('name', { required: true })} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </label>
        <label className="block mb-2">
          <span className="block text-gray-700 font-medium mb-1">Email</span>
          <input {...register('email', { required: true })} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
        </label>
        <label className="block mb-2">
          <span className="block text-gray-700 font-medium mb-1">Role</span>
          <select {...register('role')} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600">
            <option>USER</option>
            <option>OPERATOR</option>
            <option>ADMIN</option>
          </select>
        </label>
        <div className="flex gap-4 mt-6">
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-800 transition">Save</button>
          <button type="button" onClick={() => nav('/users')} className="bg-gray-200 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Back</button>
        </div>
      </form>
    </div>
  )
}
