'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function TempPage() {
  const router = useRouter();

  const options = useMemo(() => [
    { label: 'Precise', description: 'Factual, grounded, realistic' },
    { label: 'Balanced', description: 'Logical, curious, exploratory' },
    { label: 'Chaotic', description: 'Paradoxes, multiverses, impossibilities' },
  ], []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
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
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, options, router]);

  return (
    <div className="h-screen bg-black text-white font-mono flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl mb-6">Select your creativity temperature:</h1>

      <div className="flex flex-col gap-2 text-lg">
        {options.map((opt, i) => (
          <div key={i} className={i === selectedIndex ? 'text-green-400' : 'text-gray-400'}>
            {i === selectedIndex ? '> ' : '  '}
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
  );
}