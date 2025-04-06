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
      <div className="h-[500px] w-full text-bone flex flex-col justify-start px-8">
        <h1 className="mt-10 text-center w-full">░▒▓█ Select your creativity temperature  █▓▒░</h1>
  
        <div className="flex flex-col gap-2 mt-12 mb-4 pl-16">
          {options.map((opt, i) => (
            <div key={i} className="text-bone flex items-center min-h-[2rem] leading-none">
              <span className="w-4 inline-block text-right">
                {i === selectedIndex ? '>' : ' '}
              </span>
  
              <span className={`w-32 ml-10 ${i === selectedIndex ? 'animate-blink' : ''}`}>
                {opt.label}
              </span>
  
              <span 
                className="text-left"
                style={{ opacity: i === selectedIndex ? 1 : 0 }}
              >
                {opt.description}
              </span>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-20 left-0 w-full text-center text-bone">
          <span className="font-press text-sm">↑ ↓</span> to navigate<br />press [ ENTER ] to explore █▓▒░</div>
        </div>
    </TerminalWindow>
  );
}