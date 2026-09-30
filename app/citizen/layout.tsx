'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/dashboard/Header';
import { CitizenSidebar } from '../../components/citizen/CitizenSidebar';
import { useWasteSense } from '../../context/WasteSenseContext';

export default function CitizenLayout({
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

    if (currentUser.role !== 'citizen') {
      if (currentUser.role === 'admin') {
        router.replace('/admin/dashboard');
      } else if (currentUser.role === 'worker') {
        router.replace('/worker/dashboard');
      } else {
        router.replace('/');
      }
    }
  }, [currentUser, isLoggedIn, isAuthReady, router]);

  // While checking auth state or redirecting unauthorized users
  if (!isAuthReady || !isLoggedIn || currentUser.role !== 'citizen') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-slate-500">
        <div className="w-8 h-8 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-xs tracking-wider uppercase font-semibold text-slate-500 font-mono">
          Verifying Citizen Session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-satoshi">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <CitizenSidebar />
        <main className="flex-1 overflow-y-auto p-5 md:p-8 bg-[#F8FAFC]">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
