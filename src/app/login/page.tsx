'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import LoginPage from '@/components/LoginPage';
import { useApp } from '@/context/AppContext';

export default function LoginRoute() {
  const router = useRouter();
  const { isAuthenticated } = useApp();

  useEffect(() => {
    if (isAuthenticated) router.replace('/');
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] transition-colors duration-300">
      <Header />
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-6xl w-full mx-auto flex flex-col items-center justify-start">
        {!isAuthenticated && <LoginPage />}
      </main>
    </div>
  );
}