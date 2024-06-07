import React, { useEffect, useState } from 'react';
import api from '../authentication/axios';
import { FaArrowLeft } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [action, setAction] = useState('');
  const [highlightedRow, setHighlightedRow] = useState(null);
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

  const handleDeleteUser = async () => {
    if (highlightedRow === null) {
      alert("Veuillez sélectionner un utilisateur à supprimer.");
      return;
    }

    try {
      const userId = users[highlightedRow].idUser;
      await api.delete(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(users.filter(user => user.idUser !== userId));
      setHighlightedRow(null);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const resetForm = () => {
    setCurrentUser({ idUser: null, firstname: '', lastname: '', email: '', role: '', tel: '', password: '' });
    setAction('');
    setHighlightedRow(null);
  };

  const selectUser = (index) => {
    setHighlightedRow(index);
    const user = users[index];
    setCurrentUser({
      idUser: user.idUser,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      tel: user.tel,
      password: '' // Reset password field for security reasons
    });
    setAction('edit');
  };

  const handleRowClick = (index) => {
    setHighlightedRow(index);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
      {error && <p className="text-red-500">{error}</p>}

      {action === 'edit' && (
        <div>
          <button onClick={resetForm} className="flex px-4 py-2 mb-4 text-gray-400 rounded bg-white hover:text-gray-800">
            <FaArrowLeft className="mr-2" />
          </button>
        </div>
      )}

      {action !== 'edit' && (
        <div>
          <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
            <table className="min-w-full text-sm bg-white table-fixed rounded-lg mb-4">
              <thead>
                <tr>
                  <th className="py-2 text-center">Nom</th>
                  <th className="py-2 text-center">Prénom</th>
                  <th className="py-2 text-center">Rôle</th>
                  <th className="py-2 text-center">Email</th>
                  
                  <th className="py-2 text-center">Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-t ${highlightedRow === index ? 'bg-blue-100' : ''}`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="py-2 px-4 text-center">{user.firstname}</td>
                    <td className="py-2 px-4 text-center">{user.lastname}</td>
                    <td className="py-2 px-4 text-center">{user.email}</td>
                    <td className="py-2 px-4 text-center">{user.role}</td>
                    <td className="py-2 px-4 text-center">{user.tel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-6 mr-10">
            <button onClick={() => setAction('add')} className="px-4 py-2 border-5 border-[#28a745] text-gray-600 rounded bg-[#28a745] text-white hover:bg-[#218838]">
              Ajouter
            </button>
            <button onClick={() => highlightedRow !== null ? selectUser(highlightedRow) : alert("Veuillez sélectionner un utilisateur à modifier.")} className="px-4 py-2 border-5 border-[#AED6F1] text-gray-600 rounded bg-[#AED6F1] text-white hover:bg-[#85C1E9]">
              Modifier
            </button>
            <button onClick={handleDeleteUser} className="px-4 py-2 border-5 border-[#ff4d4d] text-gray-600 rounded bg-[#ff4d4d] text-white hover:bg-[#ff3333]">
              Supprimer
            </button>
          </div>
        </div>
      )}

      {action === 'add' && (
        <form onSubmit={handleAddUser} className="mb-4">
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
            <input
              type="password"
              name="password"
              value={currentUser.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border p-2"
              required
            />
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
            Ajouter
          </button>
        </form>
      )}

      {action === 'edit' && (
        <form onSubmit={handleUpdateUser} className="mb-4">
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
          </div>
          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
            Modifier
          </button>
        </form>
      )}
    </div>
  );
};

export default Users;
