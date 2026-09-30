'use client';

import React from 'react';
import { Header } from '../../components/dashboard/Header';
import { CitizenSidebar } from '../../components/citizen/CitizenSidebar';

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <CitizenSidebar />
        <main className="flex-1 overflow-y-auto p-5 md:p-8 bg-slate-950">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
