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
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded shadow max-w-md">
      <h2 className="text-lg font-semibold mb-4">Create User</h2>
      <label className="block mb-2">Name<input {...register('name', { required: true })} className="border p-2 rounded w-full" /></label>
      {errors.name && <div className="text-red-600">Required</div>}
      <label className="block mb-2">Email<input {...register('email', { required: true })} className="border p-2 rounded w-full" /></label>
      <label className="block mb-2">Role<select {...register('role', { required: true })} className="border p-2 rounded w-full"><option>USER</option><option>OPERATOR</option><option>ADMIN</option></select></label>
      <label className="block mb-4">Password<input type="password" {...register('password', { required: true, minLength: 6 })} className="border p-2 rounded w-full" /></label>
      <div className="flex gap-2"><button className="bg-blue-600 text-white px-3 py-1 rounded">Create</button><button type="button" onClick={() => nav('/users')} className="bg-gray-200 px-3 py-1 rounded">Cancel</button></div>
    </form>
  )
}
