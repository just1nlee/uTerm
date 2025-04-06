'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from './components/TerminalWindow';
import blackHole from './components/BlackHole';
import screenText from './components/TypingText';

export default function TerminalScreen() {
  const router = useRouter();

  const [phase, setPhase] = useState('blackHole');
  const [linesShown, setLinesShown] = useState(0);

  useEffect(() => {
    if (phase === 'blackHole' && linesShown < blackHole.length) {
      const timeout = setTimeout(() => setLinesShown((prev) => prev + 1), 30);
      return () => clearTimeout(timeout);
    }

    if (phase === 'blackHole' && linesShown >= blackHole.length) {
      setTimeout(() => {
        setPhase('screenText');
        setLinesShown(0);
      }, 20);
    }

    if (phase === 'screenText' && linesShown < screenText.length) {
      const t = setTimeout(() => setLinesShown((n) => n + 1), 30);
      return () => clearTimeout(t);
    }
  }, [linesShown, phase]);

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
      <div className="max-h-[500px] h-screen bg-black text-bone-400 font-mono text-xs leading-normal whitespace-pre items-center px-6 py-8 flex flex-col gap-6">
        <div className="w-[60ch] mx-auto">
          <pre className="text-left">
            {blackHole.slice(0, phase === 'blackHole' ? linesShown : blackHole.length).join('\n')}
          </pre>
          {phase === 'screenText' && (
            <pre className="text-center mx-auto">
              {screenText.slice(0, linesShown).join('\n')}
            </pre>
          )}
        </div>
      </div>
    </TerminalWindow>
  );
}
