// /src/app/bootup/page.js
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function BootupPage() {
  const router = useRouter();
  const [lines, setLines] = useState([]);

  const bootMessages = useMemo(() => [
    '[  OK  ] Establishing system uplink...',
    '[  OK  ] Launching uTerm Shell...',
    '',
    '[ BOOT ] Initializing uTerm v1.0 interface...',
    '[  OK  ] Environment Secure...',
    '[  OK  ] Loading Shell Components...',
    '[  OK  ] Connecting to Gemini 2.0 Flash-Lite API...',
    '[  OK  ] Reached target Gemini 2.0 Flash-Lite API...',
    '[  OK  ] Initializing tokenization pipeline...',
    '[  OK  ] Initializing input stream...',
    '[  OK  ] Reached target Path Units...',
    '[  OK  ] Mounting Cosmic I/O Drivers...',
    '[  OK  ] Establishing session context...',
    '[  OK  ] Dark Matter Cache seeded (entropy level: 99.92%)',
    '[  OK  ] Parsing spatial signature index...',
    '[ FAIL ] Extraterreestrial signal not detected...',
    '[  OK  ] Initiating procedural galaxy seeder...',
    '[  OK  ] Initializing Cosmic I/O Drivers...',
    '[  OK  ] Memory sector integrity: 100%',
    '[  OK  ] Ready to initiate starwalk.',
    '[  OK  ] Caching stardust entropy logs...',
    '[  OK  ] Interdimensional API loaded.',
    '[  OK  ] Staging inference sandbox for interactive shell...',
    '[  OK  ] Language model warm-start complete.',
    '[  OK  ] uTerm v1.0 is now online...',
  ], []);

  useEffect(() => {
    let i = 0;
  
    const interval = setInterval(() => {
      if (i < bootMessages.length) {
        setLines((prev) => [...prev, bootMessages[i]]);
        i++;
      }
  
      if (i === bootMessages.length) {
        clearInterval(interval);
        setTimeout(() => {
          router.push('/terminal');
        }, 850);
      }
    }, 25);
  
    return () => clearInterval(interval);
  }, [router, bootMessages]); 

  return (
    <div className="h-screen bg-black text-bone text-xl p-6">
      {lines.map((line, idx) => {
        const match = typeof line === 'string' ? line.match(/^\[\s*([A-Z]+)\s*\]\s(.+)$/i) : null;
        const tag = match ? match[1] : '';
        const content = match ? match[2] : line;

        let tagColor = 'text-white';
        if (tag === 'BOOT') tagColor = 'text-green-400';
        else if (tag === 'OK') tagColor = 'text-green-400';
        else if (tag === 'FAIL') tagColor = 'text-red-500';

        return (
          <div key={`${line}-${idx}`}>
            {tag ? (
              <>
                <span className="text-bone mr-2">
                  [
                  <span className={tagColor}>{tag}</span>
                  ]
                </span>
                <span>{content}</span>
              </>
            ) : (
              <span>{line}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}