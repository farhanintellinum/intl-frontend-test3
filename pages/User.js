import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function User (){
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ fullname: '', username: '', email: '', address: '' , password:''});
    const [token, setToken] = useState('');
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken);
    }, []);
    useEffect(() => {
      if (token) {
        fetchUsers(); // only runs when token is updated
      }
    }, [token]);

    const fetchUsers = async () => {
      console.log(token);
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res);
      setUsers(res.data);
    };
  
    const createUser = async () => {
      await axios.post('http://localhost:5000/api/users', { ...form});
      
    };
  
    const deleteUser = async (id) => {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    };
  
    return (
      <div className="p-6">
        <h1 className="text-2xl mb-4">User Details</h1>
        <input className="border p-2 mr-2" placeholder="Fullname" onChange={e => setForm({ ...form, fullname: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="border p-2 mr-2" placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
        <input className="border p-2 mr-2" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="bg-green-600 text-white px-4 py-2" onClick={createUser}>Add User</button>
  
        <ul className="mt-6">
          {users.map(user => (
            <li key={user.id} className="flex justify-between my-2 border p-2">
              {user.fullname} - {user.email}
              <button className="text-red-500" onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
}

// export default User;
