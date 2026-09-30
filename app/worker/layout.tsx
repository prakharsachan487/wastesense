'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/dashboard/Header';
import { WorkerNav } from '../../components/worker/WorkerNav';
import { useWasteSense } from '../../context/WasteSenseContext';

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentUser, isLoggedIn, isAuthReady } = useWasteSense();

  useEffect(() => {
    if (!isAuthReady) return;

    if (!isLoggedIn) {
      router.replace('/');
      return;
    }

    if (currentUser.role !== 'worker') {
      if (currentUser.role === 'admin') {
        router.replace('/admin/dashboard');
      } else if (currentUser.role === 'citizen') {
        router.replace('/citizen/dashboard');
      } else {
        router.replace('/');
      }
    }
  }, [currentUser, isLoggedIn, isAuthReady, router]);

  // While checking auth state or redirecting unauthorized users
  if (!isAuthReady || !isLoggedIn || currentUser.role !== 'worker') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-slate-500">
        <div className="w-8 h-8 border-2 border-[#004A80] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs tracking-wider uppercase font-semibold text-slate-500 font-mono">
          Verifying Worker Fleet Session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-satoshi">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <WorkerNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
