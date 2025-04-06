'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import TerminalWindow from './components/TerminalWindow';

export default function HomePage() {
  const router = useRouter();
  const [linesShown, setLinesShown] = useState(0)

  const ascii = `                       ++++++++++++++++++
                   ++++++++++++++++++++++++++++
               ++++++++++++++++++++++++     +++++++
            ++++++++++++++++++++++++++++++++    ++++++
          ++++++++++++++++++++++++++++++++++++++   ++++++
        ++++++++++++++                  +++++++++++    +++
       +++++++++++                    +      +++++++++   +++
      ++++++++++                         +    +++++++++   +++
     ++++++++++                            +     ++++++++   +++
     +++++++++                              ++    ++++++++   ++
     +++++++++                              +++   ++++++++  +++
     +++++++++                              +++   +++++++++  ++
     ++++++++++                          ++++++   +++++++++  ++
  +   ++++++++++++                     ++++++++   +++++++++  ++
  +    ++++++++++++++             +++++++++++    +++++++++   +
  ++    +++++++++++++++++++++++++++++++++++     +++++++++   +
   ++     ++++++++++++++++++++++++++++++     +++++++++++  +
     ++      +++++++++++++++++++++++++     +++++++++++
      ++++        +++++++++++++++       ++++++++++++
        +++++                       ++++++++++++++
          +++++++++++++++++++++++++++++++++++++
             +++++++++++++++++++++++++++++
                 ++++++++++++++++++++


`.trim().split('\n')

useEffect(() => {
  if(linesShown < ascii.length){
    const t = setTimeout(() => setLinesShown(linesShown + 1), 50)
    return () => clearTimeout(t)
  }
}, [linesShown])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        router.push('/temp');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when you leave the page
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <TerminalWindow>
      <div className="flex flex-col items-center justify-center text-white text-center p-6 w-full">
      <pre className="font-mono text-white text-xs leading-normal text-left whitespace-pre-wrap">
       {ascii.slice(0, linesShown).join('\n')}
      </pre> 
        <p className="mb-6 text-lg">░▒▓█ A terminal to the observable universe █▓▒░</p>
        <h1>press [ ENTER ] to continue</h1>
      </div>
    </TerminalWindow>
  ); 
}