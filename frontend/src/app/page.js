// Author: Justin Lee
// Description: 
//  Landing screen for universe terminal. Displays a terminal animation and waits for [ ENTER ] key press
//  to route to temperature select screen.

'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from './components/TerminalWindow';
import UTermLogo from './components/uTermLogo';

export default function TerminalScreen() {
  const router = useRouter();

  // Registers handleKeyDown as a listener and cleans up after unmount
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        // Routes to temp page
        router.push('/temp');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <>
    {/* Full screen overlay */}
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Custom loading animation */}
      <div className="w-[336px] h-[372px] bg-black animate-line-wipe" />
    </div>

    <TerminalWindow>
    {/* Container for custom loading animation */}
      <div className="relative w-full h-full overflow-hidden">
    
        {/* Custom loading line wipe aniimation */}
        <div className="absolute inset-0 z-40 bg-black animate-line-wipe pointer-events-none" />

        {/* Container for componenets that scroll upward into window */}
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
