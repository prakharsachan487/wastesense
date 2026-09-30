'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationTracker() {
  const pathname = usePathname();
  const currentPathRef = useRef(pathname);

  useEffect(() => {
    try {
      const prev = sessionStorage.getItem('wastesense_current_path');
      if (prev && prev !== pathname) {
        sessionStorage.setItem('wastesense_previous_path', prev);
      }
      sessionStorage.setItem('wastesense_current_path', pathname);
      currentPathRef.current = pathname;
    } catch {}
  }, [pathname]);

  return null;
}
