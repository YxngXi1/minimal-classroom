'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AdminPage: React.FC = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleChangeLoading, setRoleChangeLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      // grabbing uers from db
      axios.get('/api/admin/users').then((response) => {
        setUsers(response.data);
        setLoading(false);
      }).catch((error) => {
        console.error('❌ Error fetching users:', error);
        setError('❌ Error fetching users');
        setLoading(false);
      });
    }
  }, [session]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setRoleChangeLoading(userId);
    try {
      await axios.put(`/api/admin/users/${userId}`, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      setRoleChangeLoading(null);
    } catch (error) {
      console.error('❌ Error updating role:', error);
      setError('❌ Error updating role');
      setRoleChangeLoading(null);
    }
  };

  if (!session) return <div>Loading...</div>;

  if (session.user.role !== 'admin') return <div>Access Denied</div>;

  return (
    <div>
      <h1>Admin Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    disabled={roleChangeLoading === user._id}
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                  {roleChangeLoading === user._id && <span>Updating...</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;