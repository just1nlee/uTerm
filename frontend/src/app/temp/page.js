'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from '../components/TerminalWindow';

export default function TempPage() {
  const router = useRouter();

  const options = [
    { label: 'Precise', value: '0.1', description: ' -- Factual, grounded, realistic' },
    { label: 'Balanced', value: '0.5', description: ' -- Logical, curious, exploratory' },
    { label: 'Chaotic', value: '0.9', description: ' -- Paradoxes, multiverses, impossibilities'}
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
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ temperature: selected.value }),
        });
  
        const data = await res.json();
  
        const match = data.message.match(/created (\d+)/);
        const universeID = match ? match[1] : null;
  
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
      <div className="h-[500px] text-bone flex flex-col items-start justify-start pt-10 px-10">
        <h1 className="mb-2 text-center w-full">Select your creativity temperature:</h1>
  
        <div className="flex flex-col gap-2">
          {options.map((opt, i) => (
            <div key={i} className="text-bone flex items-center min-h-[1.5rem]">
              <span className="inline-block w-[1.5ch]">{i === selectedIndex ? '>' : '\u00A0'}</span>
              <span className={`ml-8 ${i === selectedIndex ? 'animate-blink' : ''}`}>{opt.label}</span>
              <span className="ml-4">{i === selectedIndex ? opt.description : '\u00A0'}</span>
            </div>
          ))}
        </div>
  
        <div className="absolute bottom-20 left-0 w-full text-center text-bone">
          ↑ ↓ to navigate<br />
          press [ ENTER ] to explore
        </div>
      </div>
    </TerminalWindow>
  );
}