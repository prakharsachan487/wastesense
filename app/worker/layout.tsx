'use client';

import React from 'react';
import { Header } from '../../components/dashboard/Header';
import { WorkerNav } from '../../components/worker/WorkerNav';

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <WorkerNav />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
