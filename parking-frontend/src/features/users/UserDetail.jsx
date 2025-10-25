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

  if (isLoading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  const onSubmit = async (payload) => {
    try {
      await updateMut.mutateAsync({ id, payload })
      alert('Updated')
      nav('/users')
    } catch { alert('Failed') }
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-lg">
      <h2 className="text-xl font-semibold mb-4">User #{user.id}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <label>Name<input {...register('name', { required: true })} className="border p-2 rounded w-full" /></label>
        <label>Email<input {...register('email', { required: true })} className="border p-2 rounded w-full" /></label>
        <label>Role<select {...register('role')} className="border p-2 rounded w-full"><option>USER</option><option>OPERATOR</option><option>ADMIN</option></select></label>
        <div className="flex gap-2"><button className="bg-green-600 text-white px-3 py-1 rounded">Save</button><button type="button" onClick={() => nav('/users')} className="bg-gray-200 px-3 py-1 rounded">Back</button></div>
      </form>
    </div>
  )
}
