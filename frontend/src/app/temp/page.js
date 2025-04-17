// Author: Justin Lee
// Description: 
//  Temperature selection screen for universe terminal. Displays a list of temperature options and waits
//  for [ ENTER ] key press to create a universe with the selected temperature before routing to bootup screen.

'use client';

import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from '../components/TerminalWindow';
import AsciiSpinner from '../components/Spinner';

export default function TempPage() {
  const router = useRouter();

  // Custom Gemini 2.0 Flash-Lite API temperature options
  const options = [
    { label: 'Precise', value: '0.1', description: ' -- Factual, grounded, realistic' },
    { label: 'Balanced', value: '0.5', description: ' -- Logical, curious, exploratory' },
    { label: 'Chaotic', value: '0.9', description: ' -- Paradoxes, multiverses, impossibilities'}
  ];

  // Index of the current selected temperature option
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Loading state while creating a universe
  const [isLoading, setIsLoading] = useState(false);

  // Ref to lock input after [ ENTER ] key press, to avoid multiple requests
  const isLockedRef = useRef(false);
  
  // Handles arrow keydown and [ ENTER ] key press events
  const handleKeyDown = useCallback(async (e) => {
    if (isLockedRef.current) return;
  
    if (e.key === 'ArrowUp') {
      // Wrap around to last option if at the top, else move up
      setSelectedIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
    } else if (e.key === 'ArrowDown') {
      // Wrap around to first option if at the bottom, else move down 
      setSelectedIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'Enter') {
      setIsLoading(true);
      const selected = options[selectedIndex];
      try {
        // Sends HTTP POST request to create a new universe with the selected temperature
        const res = await fetch('/api/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ temperature: selected.value }),
        });
  
        // Parses JSON response and extracts universe ID
        const data = await res.json();
        const universeID = data.message;

        // If universe ID is valid, store it in session storage and route to bootup screen
        if (universeID) {
          sessionStorage.setItem('universeID', universeID);
          sessionStorage.setItem('uterm-temperature', selected.value);
          router.push('/bootup');
        // If universe ID is invalid, log error and set loading state to false
        } else {
          console.error('Could not extract universe ID from response');
          setIsLoading(false);

        }
      // If HTTP POST request fails, log error and set loading state to false
      } catch (err) {
        console.error('Failed to create universe:', err);
        setIsLoading(false);
      }
    }
  // Dependency array: options, selectedIndex, router. This updates the function and optimizes memory
  }, [options, selectedIndex, router]);
  
  // Registers handleKeyDown as a listener and cleans up after unmount
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Sets isLockedRef to always match the state of isLoading
  useEffect(() => {
    isLockedRef.current = isLoading;
  }, [isLoading]);
  
  return (
    <TerminalWindow>
      {/* Main content container inside terminal window */}  
      <div className="h-[500px] w-full text-bone flex flex-col justify-start px-8">
        <h1 className="mt-10 text-center w-full">Select your creativity temperature</h1>
  
        {/* Temperature options list */}  
        <div className="flex flex-col gap-2 mt-12 mb-4 pl-16">

          {/* Loop through temperature options */}  
          {options.map((opt, i) => (
            <div key={i} className="text-bone flex items-center min-h-[2rem] leading-none">

              {/* Displays selection arrow */}  
              <span className="w-4 inline-block text-right">
                {i === selectedIndex ? '>' : ' '}
              </span>
  
              <span className={`w-32 ml-10 ${i === selectedIndex ? 'animate' : ''}`}>
                  {opt.label}
              </span>
  
              {/* Displays description when hovering over option */}
              <span 
                className="text-left"
                style={{ opacity: i === selectedIndex ? 1 : 0 }}
              >
                {opt.description}
              </span>
            </div>
          ))}
        </div>
        
        {/* Displays ASCII spinner when isLoading */}
        <div className="mt-8 w-full text-center">
          {isLoading && (
            <AsciiSpinner 
              speed={180} 
            />
          )}
        </div>
        
        <div className="absolute bottom-20 left-0 w-full text-center text-bone">
          <span className="font-press text-sm">↑ ↓</span> to navigate<br />press [ ENTER ] to explore
        </div>
      </div>
    </TerminalWindow>
  );
}