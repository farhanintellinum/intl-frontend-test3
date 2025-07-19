import React from 'react'
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
  
    const handleLogin = async () => {
      try {
        await login(email, password);
        console.log(email,password);
        alert('Login successful');
      } catch {
        alert('Login failed');
      }
    };
  
    return (
      <div className="flex flex-col items-center p-8">
        <input className="border p-2 my-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 my-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>Login</button>
      </div>
    );
}

// export default Login;