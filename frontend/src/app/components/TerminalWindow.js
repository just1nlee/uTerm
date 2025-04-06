'use client';

export default function TerminalWindow({ children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-black overflow-hidden">
      <div className="border-[2px] border-bone p-6 w-full max-w-4xl h-[600px]">
        {children}
      </div>
    </div>
  );
}