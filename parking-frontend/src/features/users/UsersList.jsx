/*
import React, { useState } from 'react';
import { useUsers, useCreateUser, useDeleteUser, useUpdateUser } from './useUser';

export default function UsersList() {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('USER');

  if (isLoading) return <div>Loading Users...</div>;

  const handleCreate = () => {
    if (!newName || !newEmail) return;
    createUser.mutate({ name: newName, email: newEmail, role: newRole });
    setNewName(''); setNewEmail('');
  };

  const handleDelete = (id) => deleteUser.mutate(id);

  const handlePromote = (id) => updateUser.mutate({ id, payload: { role: 'ADMIN' } });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin - Users</h1>

      <div className="mb-4 space-x-2">
        <input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
        <input placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
        <select value={newRole} onChange={e => setNewRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="OPERATOR">OPERATOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-2 py-1 rounded">Add User</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="space-x-2">
                <button onClick={() => handlePromote(u.id)} className="bg-green-500 text-white px-2 py-1 rounded">Make Admin</button>
                <button onClick={() => handleDelete(u.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 */


import React, { useState } from 'react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from './useUser';

export default function UsersList() {
  const { data: users, isLoading } = useUsers();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('USER');

  if (isLoading) return <div>Loading Users...</div>;

  const handleCreate = () => {
    if (!newName || !newEmail) return;
    createUser.mutate({ name: newName, email: newEmail, role: newRole });
    setNewName(''); setNewEmail('');
  };

  const handlePromote = (id) => updateUser.mutate({ id, payload: { role: 'ADMIN' } });
  const handleDelete = (id) => deleteUser.mutate(id);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users Admin</h1>

      <div className="mb-4 space-x-2">
        <input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} />
        <input placeholder="Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
        <select value={newRole} onChange={e => setNewRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="OPERATOR">OPERATOR</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-2 py-1 rounded">Add User</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(u => (
            <tr key={u.id} className="border-b">
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td className="space-x-2">
                <button onClick={() => handlePromote(u.id)} className="bg-green-500 text-white px-2 py-1 rounded">Make Admin</button>
                <button onClick={() => handleDelete(u.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
