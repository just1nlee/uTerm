'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from './components/TerminalWindow';

export default function HomePage() {
  const router = useRouter();

  // Listen for ENTER key to navigate to /temp
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
    <TerminalWindow>
      <div className="flex flex-col items-center justify-center text-center p-6 w-full">
        <p className="mb-6 text-lg">░▒▓█ A terminal to the observable universe █▓▒░</p>
        <h1 className="animate-pulse text-sm">press [ ENTER ] to continue</h1>
      </div>
      <div className="p-10">
    </div>
    </TerminalWindow>
    );
}