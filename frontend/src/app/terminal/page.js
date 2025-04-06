'use client';

const universeID = 100;

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from '../components/TerminalWindow';

export default function TerminalPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const builtInCommands = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    },
    help: {
      description: 'List commands,',
      usage: 'help',
      fn: () => Object.keys(builtInCommands).join(', '),
    },
    exit: {
      description: 'Exit the terminal and return to homepage.',
      usage: 'exit',
      fn: () => router.push('/'),
    }
  };

  async function handleKeyDown(e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmedInput = input.trim();
  
      let data;
      let output;
  
      try {
        const res = await fetch(
          `https://backend-4na6.onrender.com/tab/?universeid=${universeID}&command=${encodeURIComponent(trimmedInput)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-API-Key': process.env.NEXT_PUBLIC_BACKEND_KEY,
            },
          }
        );
  
        if (!res.ok) {
          const errorData = await res.json();
          output = `Error ${res.status}: ${errorData.detail || 'unknown error'}`;
          setHistory((prev) => [...prev, `* ${input}`, output]);
          return;
        }
  
        data = await res.json();
      } catch (err) {
        output = `Client error: ${err.message}`;
        setHistory((prev) => [...prev, `* ${input}`, output]);
        return;
      }
  
      const suggestions = data.message;
  
      if (Array.isArray(suggestions)) {
        if (suggestions.length === 1) {
          setInput(suggestions[0]); // autofill
        } else if (suggestions.length > 1) {
          setHistory((prev) => [...prev, `* ${input}`, suggestions.join('  ')]);
        } else {
          setHistory((prev) => [...prev, `* ${input}`, 'No suggestions']);
        }
      }
    }
  }
  

  async function handleCommands(e) {
    e.preventDefault();
    const trimmedInput = input.trim();
    const [cmd, ...args] = trimmedInput.split(' ');

    let output = '';
    
    if (builtInCommands[cmd]) {
      try {
        output = await builtInCommands[cmd].fn(...args);
      } catch (err) {
        output = `Error executing command "${cmd}": ${err.message}`;
      }
  
      setHistory([...history, `* ${input}`, output]);
      setInput('');
      return;
    }

    try {
      const res = await fetch('https://backend-4na6.onrender.com/command/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_BACKEND_KEY},
        body: JSON.stringify({
          universeid: universeID,
          command: trimmedInput,
        }),
      });

      if(!res.ok){
        const errorData = await res.json();
        output = `Error ${res.status}: ${errorData.detail || 'unknown error'}`;
      } else {
        const data = await res.json();
        output = data.message || JSON.stringify(data);
      }
    } catch (err) {
      output = `Client error: ${err.message}`;
    }

    setHistory([...history, `* ${input}`, output]);
    setInput('');
  }

  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      });
    }
  }, [history]);

  return (
    <TerminalWindow>
      <div
        ref={scrollRef}
        className="flex flex-col h-[550px] w-full bg-black text-bone font-mono text-base overflow-y-auto px-8 pt-4"
      >
        <div className="w-1/2 flex flex-col justify-end flex-grow min-h-full">
          <div className="flex flex-col justify-end flex-grow">
            {history.map((line, i) => (
              <div key={i} className="w-full text-left text-base text-bone">
                {line}
              </div>
            ))}
          </div>

          <form onSubmit={handleCommands} className="flex w-full items-center mt-2">
            <span className="mr-2 text-white text-base">*</span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none flex-1 text-bone text-base font-mono"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </form>
        </div>
      </div>
    </TerminalWindow>
  );
}
