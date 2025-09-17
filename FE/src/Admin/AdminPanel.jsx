import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteEmail, setDeleteEmail] = useState("");
  const navigate = useNavigate();

  // Replace with your actual admin check logic
  const isAdmin = localStorage.getItem('is_staff') === 'true';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    axios.get('/api/employees/')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, [isAdmin, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/auth/users/${id}/`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleDeleteByEmail = async () => {
    if (!deleteEmail) return setError("Please enter an email.");
    if (!window.confirm(`Delete user with email ${deleteEmail}?`)) return;
    try {
      await axios.delete("/api/auth/delete-by-email/", { data: { email: deleteEmail } });
      setUsers(users.filter(u => u.email !== deleteEmail));
      setDeleteEmail("");
      setError(null);
    } catch (err) {
      setError("Failed to delete user by email");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-6 flex items-center gap-2">
            <input
              type="email"
              className="border px-3 py-2 rounded w-64"
              placeholder="Enter email to delete user"
              value={deleteEmail}
              onChange={e => setDeleteEmail(e.target.value)}
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleDeleteByEmail}
            >Delete by Email</button>
          </div>
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{user.first_name} {user.last_name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
