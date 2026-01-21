import { useForm } from 'react-hook-form'
import { useCreateUser } from './useUsers'
import { useNavigate } from 'react-router-dom'

export default function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const createMut = useCreateUser()
  const nav = useNavigate()

  const onSubmit = async (data) => {
    try {
      await createMut.mutateAsync(data)
      alert('Created')
      nav('/users')
    } catch {
      alert('Failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-xl mx-auto mt-12 flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold text-blue-700 mb-4">Create User</h2>
      <label className="block mb-2">
        <span className="block text-gray-700 font-medium mb-1">Name</span>
        <input {...register('name', { required: true })} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
        {errors.name && <div className="text-red-600 text-sm">Required</div>}
      </label>
      <label className="block mb-2">
        <span className="block text-gray-700 font-medium mb-1">Email</span>
        <input {...register('email', { required: true })} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </label>
      <label className="block mb-2">
        <span className="block text-gray-700 font-medium mb-1">Role</span>
        <select {...register('role', { required: true })} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option>USER</option>
          <option>OPERATOR</option>
          <option>ADMIN</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="block text-gray-700 font-medium mb-1">Password</span>
        <input type="password" {...register('password', { required: true, minLength: 6 })} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </label>
      <div className="flex gap-4 mt-6">
        <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition">Create</button>
        <button type="button" onClick={() => nav('/users')} className="bg-gray-200 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Cancel</button>
      </div>
    </form>
  )
}
