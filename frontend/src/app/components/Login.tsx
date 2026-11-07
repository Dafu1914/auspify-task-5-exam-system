'use client';

import { useState } from 'react';
import { login, register } from '@/lib/api';

export default function Login({ onLogin }: { onLogin: (user: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(username, password);
        alert('Registered successfully! Please login.');
        setIsRegister(false);
      } else {
        const user = await login(username, password);
        localStorage.setItem('examUser', user.username);
        onLogin(user.username);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-8 text-white">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400 mb-6">
          📝 Exam System
        </h1>
        {error && <p className="text-rose-400 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 py-3 rounded-lg font-bold transition">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-slate-400 mt-4 cursor-pointer" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </p>
      </div>
    </main>
  );
}