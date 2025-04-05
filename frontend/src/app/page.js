'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter();

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
    <div className="h-screen bg-black flex flex-col items-center justify-center text-white text-center p-6">
      <pre className="font-mono text-white-400 text-xs leading-normal text-left"      >
        {`                       ++++++++++++++++++++
                   ++++++++++++++++++++++++++++
               ++++++++++++++++++++++++     +++++++
            ++++++++++++++++++++++++++++++++    ++++++
          ++++++++++++++++++++++++++++++++++++++   ++++++
        ++++++++++++++                  +++++++++++    +++
       +++++++++++                    +      +++++++++   +++
      ++++++++++                         +    +++++++++   +++
     ++++++++++                            +    ++++++++   +++
     +++++++++                              ++   ++++++++   ++
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


`}
      </pre>
      <p className="mb-6 text-lg">░▒▓█ A terminal to the observable universe █▓▒░</p>
      <h1> press [ ENTER ] to continue</h1>
    </div>
  );
}