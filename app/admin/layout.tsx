'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/dashboard/Header';
import { AdminSidebar } from '../../components/dashboard/Sidebar';
import { useWasteSense } from '../../context/WasteSenseContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, isLoggedIn, isAuthReady } = useWasteSense();

  useEffect(() => {
    if (!isAuthReady) return;

    if (!isLoggedIn) {
      router.replace('/login');
      return;
    }

    if (currentUser.role !== 'admin') {
      if (currentUser.role === 'citizen') {
        router.replace('/citizen/dashboard');
      } else if (currentUser.role === 'worker') {
        router.replace('/worker/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [currentUser, isLoggedIn, isAuthReady, router]);

  // While checking auth state or redirecting unauthorized users
  if (!isAuthReady || !isLoggedIn || currentUser.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs tracking-wider uppercase font-semibold text-slate-500">
          Verifying Admin Access...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
