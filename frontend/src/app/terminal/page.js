'use client';

import React, {useState, useRef, useEffect} from 'react'
import { useRouter } from 'next/navigation';
import TerminalWindow from '../components/TerminalWindow'

export default function TerminalPage() {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const commands = {
    echo: {
      description: 'Echo a passed string.',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    },
    exit: {
      description: 'Exit the terminal and return to homepage.',
      usage: 'exit',
      fn: () => {
        router.push('/');
      }
    }
  };

  function handleCommands(e){
    e.preventDefault()

    const [cmd, ...args] = input.trim().split(' ')
    const output = commands[cmd] ? commands[cmd](...args) : `Command not found: ${cmd}`

    setHistory([...history, `* ${input}`, output])
    setInput('')
  }

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [history]);

  return (
    <TerminalWindow>
      <div ref={scrollRef} className="flex flex-col h-[550px] bg-black text-white-400 items-start overflow-y-auto scrollbar-hide">
          <div className="flex-1">
            <div className="flex flex-col justify-end h-full">
              {history.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
        </div>
        <form onSubmit={handleCommands} className="flex text-white-400 font-mono text-sm py-2">
          <span className="mr-2">*</span>
            <input
              ref={inputRef}
              className="bg-transparent border-none outline-none flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
            />
          </form>
        </div>
    </TerminalWindow>
  );
}