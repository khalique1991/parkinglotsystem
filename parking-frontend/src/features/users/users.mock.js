let users = [
  { id: 1, name: 'Alice Admin', email: 'alice@x.com', role: 'ADMIN' },
  { id: 2, name: 'Bob Operator', email: 'bob@x.com', role: 'OPERATOR' },
  { id: 3, name: 'Charlie', email: 'charlie@x.com', role: 'USER' },
];

export const fetchUsersMock = async () => {
  return { data: [...users] };
};

export const fetchUserMock = async (id) => {
  const user = users.find(u => u.id === id);
  return { data: user || null };
};

export const createUserMock = async (payload) => {
  const newUser = { id: Date.now(), ...payload };
  users.push(newUser);
  return { data: newUser };
};

export const updateUserMock = async (id, payload) => {
  users = users.map(u => (u.id === id ? { ...u, ...payload } : u));
  return { data: users.find(u => u.id === id) };
};

export const deleteUserMock = async (id) => {
  users = users.filter(u => u.id !== id);
  return { data: true };
};
