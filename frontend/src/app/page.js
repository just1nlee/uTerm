// Author:
// Description: 

'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from './components/TerminalWindow';
import UTermLogo from './components/uTermLogo';

export default function TerminalScreen() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        router.push('/temp');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="w-[336px] h-[372px] bg-black animate-line-wipe" />
    </div>

    <TerminalWindow>
      <div className="relative w-full h-full overflow-hidden">
    
        <div className="absolute inset-0 z-40 bg-black animate-line-wipe pointer-events-none" />

        <div className="absolute inset-x-0 bottom-0 animate-scroll-up px-6 py-12 text-center flex flex-col items-center justify-center text-bone">
          <UTermLogo />
          <p className="mt-6 text-[1.83rem] leading-snug">A terminal to the observable universe</p>
          <p className="text-[1.83rem] leading-snug">press [ ENTER ] to continue</p>
        </div>
      </div>
    </TerminalWindow>
  </>
); 
}
