'use client';

export default function TerminalWindow({ children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="border-[2px] border-white p-6 w-full max-w-4xl min-h-[400px]">
        {children}
      </div>
    </div>
  );
}