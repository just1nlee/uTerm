// Author: Justin Lee
// Description: 
//  Bootup screen for universe terminal. Displays a Linux Plymouth inspired animation before routing to 
//  terminal screen.

'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function BootupPage() {
  const router = useRouter();
  const [lines, setLines] = useState([]);

  // Custom bootup messages
  const bootMessages = useMemo(() => [
    '[  OK  ] Establishing system uplink...',
    '[  OK  ] Launching uTerm Shell...',
    '',
    '[ BOOT ] Initializing uTerm v1.0 interface...',
    '[  OK  ] Environment Secure...',
    '[  OK  ] Secure Boot Enabled...',
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
    '[  OK  ] Signal Acquired: Greetings from Oregon State University...',
    '[  OK  ] Core systems initialized. Thanks, Mom, for the original bootloader.',
    '[  OK  ] uTerm v1.0 is now online...',
  ], []);

  // Custom boot animation
  useEffect(() => {
    // Tracks current index of boot message
    let i = 0;
  
    const interval = setInterval(() => {
      if (i < bootMessages.length) {
        setLines((prev) => [...prev, bootMessages[i]]);
        i++;
      }
  
      // If all messages have been displayed, clear interval and route to terminal page
      if (i === bootMessages.length) {
        clearInterval(interval);
        // Wait for a bit before routing to terminal
        setTimeout(() => {
          router.push('/terminal');
        }, 850);
      }
    // Interval to display each boot message
    }, 25);
  
    return () => clearInterval(interval);
  // This updates the function and optimizes memory.
  }, [router, bootMessages]); 

  return (
    <div className="h-screen bg-black text-bone text-xl p-6">
      {/* Bootup animation */}
      {lines.map((line, idx) => {
        {/* Checks if line is a string and if it matches [ TAG ] content format */}
        const match = typeof line === 'string' ? line.match(/^\[\s*([A-Z]+)\s*\]\s(.+)$/i) : null;
        const tag = match ? match[1] : '';
        const content = match ? match[2] : line;

        
        {/* Sets text color based on tag */}
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