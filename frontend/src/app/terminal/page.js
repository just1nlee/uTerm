'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TerminalWindow from '../components/TerminalWindow';

export default function TerminalPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const terminalContentRef = useRef(null);
  const [universeID, setUniverseID] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const storedID = sessionStorage.getItem('universeID');
    if (storedID) {
      const parsedID = parseInt(storedID, 10);
      setUniverseID(parsedID);
    } else {
      console.warn('No universeID found in sessionStorage');
    }
  }, []);

  // Focus input on mount and when terminal is clicked
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const builtInCommands = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    },
    help: {
      description: 'List commands.',
      usage: 'help',
      fn: () => Object.keys(builtInCommands).join(', '),
    },
    clear: {
      description: 'Clear terminal history.',
      usage: 'clear',
      fn: () => {
        setHistory([]);
        return '';
      }
    },
    exit: {
      description: 'Exit the terminal and return to homepage.',
      usage: 'exit',
      fn: () => router.push('/'),
    },
  };

  // Handle scrolling when history changes
  useEffect(() => {
    if (terminalContentRef.current && autoScroll) {
      // For a reversed terminal, we scroll to top
      terminalContentRef.current.scrollTop = 0;
    }
  }, [history]);

  // Detect if user has manually scrolled down
  const handleScroll = () => {
    if (terminalContentRef.current) {
      // In reversed mode, we're checking if we're at the top
      const isScrolledToTop = terminalContentRef.current.scrollTop < 10;
      setAutoScroll(isScrolledToTop);
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
              'X-API-Key': '18ca0b78f576cf69741d7fac47570aad'
            },
          }
        );
  
        if (!res.ok) {
          const errorData = await res.json();
          output = `Error ${res.status}: ${errorData.detail || 'unknown error'}`;
          setHistory((prev) => [...prev, `* ${input}`, output]);
          return;
        } else{
          data = await res.json();
        }
      } catch (err) {
        output = `Client error: ${err.message}`;
        setHistory((prev) => [...prev, `* ${input}`, output]);
        return;
      }
  
      const suggestions = data.message;
  
      if (Array.isArray(suggestions)) {
        if (suggestions.length === 1) {
          setInput(suggestions[0]);
        } else if (suggestions.length > 1) {
          setHistory((prev) => [suggestions.join('  '), ...prev]);
        } else {
          setHistory((prev) => [...prev, `* ${input}`, 'No suggestions']);
        }
        setAutoScroll(true);
      }
    }
  }

  async function handleCommands(e) {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput) return;
    
    const [cmd, ...args] = trimmedInput.split(' ');

    let output = '';
    
    if (builtInCommands[cmd]) {
      try {
        output = await builtInCommands[cmd].fn(...args);
        if (output === '') {
          setHistory((prev) => [`* ${input}`, ...prev]);
          setInput('');
          return;
        }
      } catch (err) {
        output = `Error executing command "${cmd}": ${err.message}`;
      }
  
      setHistory((prev) => [output, `* ${input}`, ...prev]);
      setInput('');
      return;
    }

    try {
      const res = await fetch('https://backend-4na6.onrender.com/command/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': '18ca0b78f576cf69741d7fac47570aad',
        },
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

    // Reverse the order to build upwards - command first, then output
    setHistory((prev) => [output, `* ${input}`, ...prev]);
    setInput('');
    
    // Enable auto-scroll when user sends a command
    setAutoScroll(true);
  }

  // Handle terminal click to focus on input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const scrollToTop = () => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = 0;
    }
    setAutoScroll(true);
  };

  return (
    <TerminalWindow>
      <div 
        className="flex flex-col h-full w-full bg-black text-bone"
        onClick={handleTerminalClick}
      >
        {/* Terminal content building upwards, takes all available space */}
        <div 
          ref={terminalContentRef}
          className="flex-1 overflow-y-auto px-8 pb-2 flex flex-col-reverse"
          onScroll={handleScroll}
        >
          {history.map((line, i) => (
            <div 
              key={i} 
              className="w-full text-left text-xl text-bone whitespace-pre-wrap mb-1"
            >
              {line}
            </div>
          ))}
        </div>
        
        {/* Command input at the very bottom of the page */}
        <div className="w-full px-8 py-4 bg-black mt-auto">
          <form onSubmit={handleCommands} className="flex w-full text-xl items-center">
            <span className="mr-2 text-white">*</span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none flex-1 text-xl text-bone"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </form>
        </div>
        
        {!autoScroll && (
          <button 
            onClick={scrollToTop}
            className="absolute top-16 right-8 bg-bone text-black text-sm px-2 py-1 rounded opacity-50 hover:opacity-100"
          >
            ↑ Scroll to newest
          </button>
        )}
      </div>
    </TerminalWindow>
  );
}