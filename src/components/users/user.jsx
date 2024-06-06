import React, { useEffect, useState } from 'react';
import api from '../authentication/axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [action, setAction] = useState('');
  const [currentUser, setCurrentUser] = useState({
    idUser: null,
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    tel: '',
    password: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', currentUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers([...users, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user');
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!currentUser.idUser) {
      setError('User ID is missing');
      return;
    }

    try {
      const response = await api.put(`/users/${currentUser.idUser}`, currentUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.map(user => (user.idUser === currentUser.idUser ? response.data : user)));
      resetForm();
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    }
  };

  const handleDeleteUser = async (idUser) => {
    try {
      await api.delete(`/users/${idUser}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(user => user.idUser !== idUser));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const resetForm = () => {
    setCurrentUser({ idUser: null, firstname: '', lastname: '', email: '', role: '', tel: '', password: '' });
    setAction('');
  };

  const selectUser = (user) => {
    if (user && user.idUser) {
      setCurrentUser(user);
      setAction('edit');
    } else {
      console.error('Selected user is invalid:', user);
      setError('Selected user is invalid');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full bg-white border border-gray-200 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.idUser} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.firstname}</td>
              <td className="py-2 px-4 border-b">{user.lastname}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">{user.tel}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button onClick={() => selectUser(user)} className="bg-yellow-500 text-white p-2 rounded">
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.idUser)} className="bg-red-500 text-white p-2 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex space-x-4 mb-4">
        <button onClick={() => setAction('add')} className="bg-green-500 text-white p-2 rounded">Add User</button>
      </div>

      {(action === 'add' || action === 'edit') && (
        <form onSubmit={action === 'add' ? handleAddUser : handleUpdateUser} className="mb-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              value={currentUser.firstname}
              onChange={handleInputChange}
              placeholder="First Name"
              className="border p-2"
              required
            />
            <input
              type="text"
              name="lastname"
              value={currentUser.lastname}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="border p-2"
              required
            />
            <input
              type="email"
              name="email"
              value={currentUser.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border p-2"
              required
            />
            <input
              type="text"
              name="role"
              value={currentUser.role}
              onChange={handleInputChange}
              placeholder="Role"
              className="border p-2"
              required
            />
            <input
              type="tel"
              name="tel"
              value={currentUser.tel}
              onChange={handleInputChange}
              placeholder="Phone"
              className="border p-2"
              required
            />
            {action === 'add' && (
              <input
                type="password"
                name="password"
                value={currentUser.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="border p-2"
                required
              />
            )}
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
            {action === 'add' ? 'Add User' : 'Update User'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Users;
