import React, { useEffect, useState } from 'react';
import api from '../authentication/axios';

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: 0,
    password: '',
    role: 'USER',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      await api.post('/users', newUser);
      fetchUsers();
      setNewUser({ firstname: '', lastname: '', email: '', phone: '', password: '', role: 'USER' });
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser(user);
  };

  const handleUpdateUser = async () => {
    try {
      await api.put(`/users/${editingUser.id}`, newUser);
      fetchUsers();
      setEditingUser(null);
      setNewUser({ firstname: '', lastname: '', email: '', phone: '', password: '', role: 'USER' });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>
      <table className="min-w-full bg-white table-fixed rounded-lg">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Modifier</button>
                <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h2>{editingUser ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h2>
        <input
          type="text"
          name="firstname"
          value={newUser.firstname}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastname"
          value={newUser.lastname}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="phone"
          value={newUser.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleInputChange}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button onClick={editingUser ? handleUpdateUser : handleAddUser}>
          {editingUser ? 'Mettre à jour' : 'Ajouter'}
        </button>
        {editingUser && <button onClick={() => setEditingUser(null)}>Annuler</button>}
      </div>
    </div>
  );
};

export default User;
