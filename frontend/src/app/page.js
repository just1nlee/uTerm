'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from './components/TerminalWindow';
import blackHole from './components/BlackHole';
import screenText from './components/TypingText';
import title from './components/UTermTitle';



export default function TerminalScreen() {
  const router = useRouter();

  const allLines = [...blackHole, ...title, ...screenText];

  const [phase, setPhase] = useState('blackHole');
  const [linesShown, setLinesShown] = useState(0);

  useEffect(() => {
    if (linesShown < allLines.length) {
      const timeout = setTimeout(() => setLinesShown((n) => n + 1), 30);
      return () => clearTimeout(timeout);
    }
  }, [linesShown]);

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
    <div className="bg-black text-bone font-mono flex justify-center">
      <div className="w-[60ch] whitespace-pre leading-tight">
        {allLines.slice(0, linesShown).map((line, i) => {
          if (i < blackHole.length) {
            return <div key={i} className="text-xs text-left">{line}</div>;
          } else if (i < blackHole.length + title.length) {
            return <div key={i} className="text-lg font-bold text-center">{line}</div>;
          } else {
            return <div key={i} className="text-base text-center">{line}</div>;
          }
        })}
      </div>
    </div>
  </TerminalWindow>
  );
}
