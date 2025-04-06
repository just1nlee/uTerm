'use client';

export default function TerminalWindow({ children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="w-full max-w-[912px] aspect-[912/610] border-[2px] border-bone flex items-center justify-center relative overflow-hidden rounded-[6px]">
        <div className="absolute inset-0 z-40 bg-black animate-line-wipe pointer-events-none opacity-0 rounded-[4px]" />
        {children}
      </div>
    </div>
  );
}