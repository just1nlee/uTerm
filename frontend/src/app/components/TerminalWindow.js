'use client';

export default function TerminalWindow({ children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-[912px] aspect-[912/610] border-[2px] border-bone p-4 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}