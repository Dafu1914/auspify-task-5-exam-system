'use client';

import { useEffect, useState } from 'react';
import Login from '@/app/components/Login';
import Dashboard from '@/app/components/Dashboard';

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('examUser');
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    setIsLoaded(true); // Prevents UI flicker before checking local storage
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('examUser');
    setUser(null);
  };

  // Show a loading screen for a split second while checking localStorage
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return <Dashboard username={user} onLogout={handleLogout} />;
}