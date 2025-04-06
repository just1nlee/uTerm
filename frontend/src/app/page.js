'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from './components/TerminalWindow';
import UTermLogo from './components/uTermLogo';

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
      <div className="flex flex-col items-center justify-center text-center px-6 py-12 w-full font-vt text-bone">
        <UTermLogo />
        <p className="mb-4 text-[1.83rem] leading-snug">░▒▓█ A terminal to the observable universe █▓▒░</p>
       <p className="text-[1.83rem] leading-snug">press [ ENTER ] to continue</p>
      </div>
    </TerminalWindow>
    );
}