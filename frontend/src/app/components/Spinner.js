'use client';

import { useEffect, useState } from 'react';

export default function AsciiSpinner({ message = 'Cold booting', speed = 180}) {
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const [dots, setDots] = useState(1);
  const spinnerFrames = ['|', '/', '-', '\\'];

  useEffect(() => {
    const spinnerInterval = setInterval(() => {
      setSpinnerIndex((prev) => (prev + 1) % spinnerFrames.length);
    }, speed);
    
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev % 3) + 1);
    }, speed * 5);

    return () => {
      clearInterval(spinnerInterval);
      clearInterval(dotsInterval);
    };
  }, [speed]);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-2">
      <div className="text-2xl">
        {spinnerFrames[spinnerIndex]}
      </div>
      <div className="text-sm text-bone opacity-70">
        {message}{'.'.repeat(dots)}
      </div>
    </div>
  );
}