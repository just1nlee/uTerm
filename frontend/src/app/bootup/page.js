// /src/app/bootup/page.js
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function BootupPage() {
  const router = useRouter();
  const [lines, setLines] = useState([]);

  const bootMessages = useMemo(() => [
    '...',
    '...',
    'Connecting to Gemini 2.0 Flash-Lite API...',
    'Initializing uTerm v1.0 interface...'
  ], []);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setLines((prev) => [...prev, bootMessages[i]]);
      i++;

      if (i === bootMessages.length) {
        clearInterval(interval);
        setTimeout(() => {
          router.push('/terminal');
        }, 400); // pause briefly after last line
      }
    }, 200); // time between each boot line

    return () => clearInterval(interval);
  }, [router, bootMessages]);

  return (
    <div className="h-screen bg-black text-green-400 font-mono text-sm p-6">
      {lines.map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
    </div>
  );
}