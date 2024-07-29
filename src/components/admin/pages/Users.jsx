import React, { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Updated token key
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/users/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Error fetching users. Please check your credentials and try again.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">Username</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Role</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Created Date</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="py-4 px-6 text-sm text-gray-500">{user.username}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{user.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{user.role}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{new Date(user.created_date).toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 flex space-x-2">
                    <Link to={`/admin/updateuser/${user.id}`} className="text-gray-700 hover:text-green-500">
                      <FaEdit className="text-xl" />
                    </Link>
                    <button className="text-gray-700 hover:text-red-500">
                      <MdAutoDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
