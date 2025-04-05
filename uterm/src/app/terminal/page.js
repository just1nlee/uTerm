'use client';

import React, { Component } from 'react'
import Terminal from 'react-console-emulator';
import { useRouter } from 'next/navigation';

export default function TerminalPage() {
  const router = useRouter();

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

  return (
    <div className="h-screen bg-black text-white p-4">
      <Terminal
        commands={commands}
        welcomeMessage="Welcome to uTerm! Type 'help' to begin."
        promptLabel="> "
      />
    </div>
  );
}