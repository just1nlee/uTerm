// Author: Justin Lee
// Description: Global root layout for uTerm

import { VT323 } from 'next/font/google';
import { Press_Start_2P } from 'next/font/google';
import './globals.css';

// Loads VT323 font from Google Fonts
const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

// Loads Press Start 2P font from Google Fonts
export const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pressstart',
});

// Root metadata
export const metadata = {
  title: 'uTerm',
  description: 'A terminal-based universe explorer',
};

// Root layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${vt323.variable} ${pressStart.variable}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="overflow-hidden touch-none font-body antialiased">
        {children}
      </body>
    </html>
  );
}