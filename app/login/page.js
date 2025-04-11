'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, loginWithGoogle } from '../../lib/auth';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    getCurrentUser().then((user) => {
      if (user) {
        router.push('/');
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => loginWithGoogle()}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
