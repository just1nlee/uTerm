'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from '../components/TerminalWindow';

export default function TempPage() {
  const router = useRouter();

  const options = [
    { label: 'Precise', description: 'Factual, grounded, realistic' },
    { label: 'Balanced', description: 'Logical, curious, exploratory' },
    { label: 'Chaotic', description: 'Paradoxes, multiverses, impossibilities'}
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'Enter') {
      const selected = options[selectedIndex].label.toLowerCase();
      localStorage.setItem('uterm-temperature', selected);
      router.push('/bootup');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <TerminalWindow>
    <div className="h-[500px] bg-black text-white-400 font-mono text-xs flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl mb-6">Select your creativity temperature:</h1>

      <div className="flex flex-col gap-2 text-lg font-mono">
        {options.map((opt, i) => (
          <div key={i} className={i === selectedIndex ? 'text-green-400' : 'text-gray-400'}>
            <span className="inline-block w-[1.5ch]">
              {i === selectedIndex ? '>' : '\u00A0'}
            </span>
            {opt.label}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-400 h-6">
        {options[selectedIndex].description}
      </div>

      <div className="mt-6 text-sm text-gray-500 text-center">
        Use ↑ ↓ to navigate<br />
        Press [ ENTER ] to explore
      </div>
    </div>
    </TerminalWindow>
  );
}