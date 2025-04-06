'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from '../components/TerminalWindow';

export default function TempPage() {
  const router = useRouter();

  const options = [
    { label: 'Precise', value: '0.1', description: 'Factual, grounded, realistic' },
    { label: 'Balanced', value: '0.5', description: 'Logical, curious, exploratory' },
    { label: 'Chaotic', value: '0.9', description: 'Paradoxes, multiverses, impossibilities'}
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = async (e) => {
    if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    } else if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'Enter') {
      const selected = options[selectedIndex];
      try {
        const res = await fetch('https://backend-4na6.onrender.com/create/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'X-API-Key': '18ca0b78f576cf69741d7fac47570aad',
           },
          body: JSON.stringify({ temperature: selected.value }),
        });
  
        const data = await res.json();

        const universeID = data.message;

        if (universeID) {
          sessionStorage.setItem('universeID', universeID);
          sessionStorage.setItem('uterm-temperature', selected.value);
          router.push('/bootup');
        } else {
          console.error('Could not extract universe ID from response');
        }
  
        if (universeID) {
          sessionStorage.setItem('universeID', universeID);
          sessionStorage.setItem('uterm-temperature', selected.value);
          router.push('/bootup');
        } else {
          console.error('Could not extract universe ID from response');
        }
      } catch (err) {
        console.error('Failed to create universe:', err);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  

  return (
    <TerminalWindow>
    <div className="h-[500px] bg-black text-bone font-mono text-xs flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl justify-center mb-6">Select your creativity temperature:</h1>

      <div className="flex flex-col gap-2 text-lg font-mono">
        {options.map((opt, i) => (
          <div key={i} className="text-bone">
            <span className="inline-block w-[1.5ch]">
              {i === selectedIndex ? '>' : '\u00A0'}
            </span>
            <span className={i === selectedIndex ? 'animate-blink' : ''}>
              {opt.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-bone h-6">
        {options[selectedIndex].description}
      </div>

      <div className="mt-6 text-sm text-bone text-center">
        Use ↑ ↓ to navigate<br />
        Press [ ENTER ] to explore
      </div>
    </div>
    </TerminalWindow>
  );
}