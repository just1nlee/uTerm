// Author: Justin Lee
// Description: 
//  Terminal page for universe terminal. CLI interface for interacting with 
//  Gemini 2.0 Flash-Lite API. 

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
  const [welcomeTyped, setWelcomeTyped] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [treeOutput, setTreeOutput] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const isLockedRef = useRef(false);

  // Ref to lock input after a command has been entered to avoid multiple requests
  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);

  // Welcome message text
  const welcomeMessage = `
░▒▓█ welcome to uTerm, a terminal-based universe explorer

Type 'help' to see available commands.
Type 'exit' to return to the homepage.

  `;

  // Uses saved universe ID from session storage
  useEffect(() => {
    // Retreives stored universe ID from session storage
    const storedID = sessionStorage.getItem('universeID');
    // If found, set it to state
    if (storedID) {
      setUniverseID(parseInt(storedID, 10));
    } else {
      console.warn('No universeID found in sessionStorage');
    }
  }, []); // Runs once on mount

  // Welcome message animation
  useEffect(() => {
    if (!welcomeTyped) {
      let currentText = '';
      const lines = welcomeMessage.split('\n');
      let currentLine = 0;
      let currentChar = 0;
  
      // Timer to type out message
      const typeInterval = setInterval(() => {
        // If there are still lines to type
        if (currentLine < lines.length) {
          // If there are still characters to type in the current line
          if (currentChar < lines[currentLine].length) {
            currentText += lines[currentLine][currentChar];
            setHistory([currentText]);
            currentChar++;
          // If the current line is finished, return a new line
          } else {
            currentText += '\n';
            currentLine++;
            // Reset char index for next line
            currentChar = 0;
          }
        // If all lines are finished, clear interval
        } else {
          clearInterval(typeInterval);
          // Set state
          setWelcomeTyped(true);
        }
      }, 30);   // Adjust typing speed here
  
      return () => clearInterval(typeInterval);
    }
  }, [welcomeTyped, welcomeMessage]);

  // Blinking cursor effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 530); // Cursor blink rate
    
    return () => clearInterval(blinkInterval);
  }, []);

  // Update cursor position when input changes
  useEffect(() => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart);
    }
  }, [input]);

  // Auto-scroll logic for reversed terminal (scrolls to top)
  useEffect(() => {
    if (terminalContentRef.current && autoScroll) {
      terminalContentRef.current.scrollTop = 0;
    }
  }, [history]);

  // Handles scrolling event
  const handleScroll = () => {
    if (terminalContentRef.current) {
      const isScrolledToTop = terminalContentRef.current.scrollTop < 10;
      setAutoScroll(isScrolledToTop);
    }
  };

  // Formats tree command output for display
  function formatTree(node, prefix = '', isLast = true) {
    const lines = [];
    if (!node || typeof node !== 'object' || !node.name) return lines;
  
    const hasChildren = Array.isArray(node.contents) && node.contents.length > 0;
    const connector = prefix + (prefix ? (isLast ? '└── ' : '├── ') : '');
    lines.push(connector + node.name);
  
    if (hasChildren) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      node.contents.forEach((child, i) => {
        const isLastChild = i === node.contents.length - 1;
        lines.push(...formatTree(child, newPrefix, isLastChild));
      });
    }
  
    return lines;
  }

  // Handles keydown events for input
  async function handleKeyDown(e) {
    // Updates cursor position
    setCursorPosition(e.target.selectionStart);
    // Tab key event
    if (e.key === 'Tab') {
      e.preventDefault();
      const trimmedInput = input.trim();

      let data;
      let output;
  
      try {
        // Send HTTP GET request to tabproxy API
        const res = await fetch(
          `/api/tabproxy?universeid=${universeID}&command=${encodeURIComponent(trimmedInput)}`,
          {
            method: 'GET',
          }
        );
      
        // If request fails, handle error
        if (!res.ok) {
          const errorData = await res.json();
          output = `Error ${res.status}: ${errorData.detail || 'unknown error'}`;
          setHistory((prev) => [...prev, output, `* ${input}`]);
          return;
        // If request succeeds, parses JSON response
        } else {
          data = await res.json();
        }
      } catch (err) {
        output = `Client error: ${err.message}`;
        setHistory((prev) => [...prev, `* ${input}`, output]);
        return;
      } 
  
      const suggestions = data.message;
  
      // Prints suggestions to terminal
      if (Array.isArray(suggestions)) {
        if (suggestions.length === 1) {
          setInput(suggestions[0]);
        } else if (suggestions.length > 1) {
          setHistory((prev) => [suggestions.join('  '), `* ${input}`, ...prev]);
        } else {
          setHistory((prev) => [`* ${input}`, 'No suggestions', ...prev]);
        }
        // Scrolls to bottom of terminal automatically
        setAutoScroll(true);
      }
    }
  }

  async function handleCommands(e) {
    e.preventDefault();
    if (isLockedRef.current) return;
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
  
    setIsLocked(true);
    let output = '';
  
    try {
      const [cmd, ...args] = trimmedInput.split(' ');
  
      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }
  
      if (builtInCommands[cmd]) {
        try {
          output = await builtInCommands[cmd].fn(...args);
          if (output === '') {
            setHistory((prev) => [`* ${input}`, ...prev]);
            setInput('');
          } else {
            setHistory((prev) => [output, `* ${input}`, ...prev]);
            setInput('');
          }
        } catch (err) {
          output = `Error executing command "${cmd}": ${err.message}`;
          setHistory((prev) => [output, `* ${input}`, ...prev]);
          setInput('');
        }
        return; 
      }
  
      // External command
      const res = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ universeid: universeID, command: trimmedInput }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        output = `Error ${res.status}: ${errorData.detail || 'unknown error'}`;
      } else {
        const data = await res.json();
        if (cmd === 'tree') {
          try {
            output = data.message; // this is the plain text tree
            setHistory((prev) => [output, `* ${input}`, ...prev]);
          } catch (err) {
            setHistory((prev) => [
              `Error parsing tree response: ${err.message}`,
              `Response was: ${data.message}`,
              `* ${input}`,
              ...prev,
            ]);
          } finally {
            setInput('');
            setAutoScroll(true);
          }
          return;
        }
        else {
          output = data.message || JSON.stringify(data);
        }
      }
  
      setHistory((prev) => [output, `* ${input}`, ...prev]);
      setInput('');
      setAutoScroll(true);
    } catch (err) {
      setHistory((prev) => [`Error: ${err.message}`, `* ${input}`, ...prev]);
      setInput('');
    } finally {
      setIsLocked(false);
    }
  }

  // Focus input on mount and when terminal is clicked
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const scrollToTop = () => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = 0;
    }
    setAutoScroll(true);
  };

  // Define the fixed order for commands.
const commandOrder = ['help', 'info', 'clear', 'bigbang', 'ls', 'tree', 'pwd', 'cd', 'cat', 'echo', 'exit'];

const helpInfo = {
  help: { description: 'List commands.', usage: 'help' },
  info: { description: 'Display information about current directory.', usage: 'info' }, 
  clear: { description: 'Clear terminal history.', usage: 'clear' },
  bigbang: { description: 'Reset the universe.', usage: 'bigbang' },
  ls: { description: 'List files and directories.', usage: 'ls [options] [path]' },
  tree: { description: 'Display explored universe.', usage: 'tree'},
  pwd: { description: 'Print working directory.', usage: 'pwd' },
  cd: { description: 'Change directory.', usage: 'cd <directory>' },
  cat: { description: 'Display file contents.', usage: 'cat <filename>' },
  echo: { description: 'Echo a passed string.', usage: 'echo <string>' },
  exit: { description: 'Exit the terminal and return to homepage.', usage: 'exit' },
};

let builtInCommands = {
  help: {
    description: 'List commands.',
    usage: 'help',
    fn: () => {
      // Build help output using our helpInfo object.
      const descriptions = commandOrder.map(cmd => {
        const info = helpInfo[cmd];
        return `${cmd.padEnd(10)} - ${info.description}\n`;
      });
      return descriptions;
    }
  },
  clear: {
    description: 'Clear terminal history.',
    usage: 'clear',
    fn: () => {
      setHistory([]);
      return '';
    }
  },
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: (...args) => args.join(' ')
  },
  exit: {
    description: 'Exit the terminal and return to homepage.',
    usage: 'exit',
    fn: () => router.push('/')
  },
}; 

  return (
    <TerminalWindow>
      <div 
        className="flex flex-col h-full w-full bg-black text-bone"
        onClick={handleTerminalClick}
      >
        {/* Terminal content (reversed order) */}
        <div 
          ref={terminalContentRef}
          className="flex-1 overflow-y-auto px-8 pb-2 flex flex-col-reverse"
          onScroll={handleScroll}
        >
          {history.map((line, i) => (
            <div 
              key={i} 
              className="w-full text-left text-xl text-bone whitespace-pre-wrap mb-1 leading-none"
            >
              {line}
            </div>
          ))}
        </div>
        
        {/* Command input area with custom blinking cursor */}
        <div className="w-full px-8 py-4 bg-black mt-auto border-t border-gray-800">
          <form onSubmit={handleCommands} className="flex w-full text-xl items-center">
            <span className="mr-2 text-white">*</span>
            {/* Custom Input Rendering */}
            <div className="flex-1 relative">
              <div className="flex items-center w-full">
                <div className="flex-1 relative min-h-[1.5rem]">
                  <span className="whitespace-pre">{input.substring(0, cursorPosition)}</span>
                  <span 
                    className={`h-5 w-2 bg-bone inline-block align-middle ${cursorBlink ? 'opacity-100' : 'opacity-0'}`}
                  ></span>
                  <span className="whitespace-pre">{input.substring(cursorPosition)}</span>
                  <input
                    ref={inputRef}
                    className="opacity-0 absolute top-0 left-0 w-full h-full bg-transparent border-none outline-none text-xl"
                    value={input}
                    onChange={(e) => {
                      if (isLockedRef.current) return;
                      setInput(e.target.value);
                      setCursorPosition(e.target.selectionStart);
                    }}
                    onKeyDown={(e) => {
                      handleKeyDown(e);
                      setCursorPosition(e.target.selectionStart);
                    }}
                    onClick={(e) => {
                      if (isLockedRef.current) return;
                      setCursorPosition(e.target.selectionStart);
                    }}
                    
                    onSelect={(e) => {
                      if (isLockedRef.current) return;
                      setCursorPosition(e.target.selectionStart);
                    }}
                    autoFocus
                  />
                </div>
              </div>
            </div>
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