"use client";
import Link from 'next/link';
import { useAuth } from '../src/context/AuthContext';

export default function SiteHeader(){
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="font-bold text-lg"><Link href="/">RaceMaster 360</Link></div>
      <nav className="space-x-4">
        <Link href="/">Events</Link>
        {user ? (
          <>
            <Link href="/admin/dashboard">Admin</Link>
            <button onClick={logout} className="ml-2 text-sm text-red-600">Logout</button>
          </>
        ) : (
          <Link href="/admin/login">Admin Login</Link>
        )}
      </nav>
    </header>
  );
}
