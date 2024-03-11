import React, { useState, useEffect } from 'react';

const UsersTable = ({ token, householdId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsersByHouseholdId = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://roommaterivalry.azurewebsites.net/users?home=${householdId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();

      // Sort the data array by points in descending order
      const sortedUsers = data.sort((a, b) => b.points - a.points);

      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (householdId) {
      fetchUsersByHouseholdId();
    }
  }, [householdId, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Roommate</th>
          <th>Points</th>
          {/* Add other headings here as needed */}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#8fb7f3' }}>{user.name}</span>
              {' • '}
              <span>{user.email}</span>
              {' • '}
              <span>{user.phone}</span>
            </td>
            <td style={{ color: user.points <= 3 ? 'red' : 'black' }}>{user.points} pts</td>
            {/* Render other user properties here as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
