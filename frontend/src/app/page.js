'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TerminalScreen() {
  const router = useRouter()

  const black_hole = [
    '                        +++++++++++++++++',
    '                   ++++++++++++++++++++++++++++',
    '               ++++++++++++++++++++++++     +++++++',
    '            ++++++++++++++++++++++++++++++++    ++++++',
    '          ++++++++++++++++++++++++++++++++++++++   ++++++',
    '        ++++++++++++++                  +++++++++++    +++',
    '       +++++++++++                    +      +++++++++   +++',
    '      ++++++++++                         +    +++++++++   +++',
    '     ++++++++++                            +     ++++++++   +++',
    '     +++++++++                              ++    ++++++++   ++',
    '     +++++++++                              +++   ++++++++  +++',
    '     +++++++++                              +++   +++++++++  ++',
    '     ++++++++++                          ++++++   +++++++++  ++',
    '  +   ++++++++++++                     ++++++++   +++++++++  ++',
    '  +    ++++++++++++++             +++++++++++    +++++++++   +',
    '  ++    +++++++++++++++++++++++++++++++++++     +++++++++   +',
    '   ++     ++++++++++++++++++++++++++++++     +++++++++++  +',
    '     ++      +++++++++++++++++++++++++     +++++++++++',
    '      ++++        +++++++++++++++       ++++++++++++',
    '        +++++                       ++++++++++++++',
    '          +++++++++++++++++++++++++++++++++++++',
    '             +++++++++++++++++++++++++++++',
    '                 ++++++++++++++++++++',
    '',
  ]

  const screen_text = [
    '░▒▓█ A terminal to the observable universe █▓▒░',
    'press [ ENTER ] to continue'
  ]

  const [phase, setPhase] = useState('black_hole')
  const [linesShown, setLinesShown] = useState(0)

  useEffect(() => {
    if (phase === 'black_hole' && linesShown < black_hole.length) {
      const timeout = setTimeout(() => { setLinesShown((prev) => prev + 1)}, 20)
      return () => clearTimeout(timeout)
    }

    if(phase === 'black_hole' && linesShown >= black_hole.length){
      setTimeout(() => { 
        setPhase('screen_text')
        setLinesShown(0)
      }, 60)
    }

    if(phase === 'screen_text' && linesShown < screen_text.length){
      const t = setTimeout(() => setLinesShown((n) => n + 1), 30)
      return () => clearTimeout(t)
    }
  }, [linesShown, phase])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && linesShown >= screenContent.length) {
        router.push('/temp')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router, linesShown])

  return (
    <div className="h-screen bg-black text-white-400 font-mono text-s leading-normal whitespace-pre items-center overflow-y-auto px-6 py-8 flex flex-col gap-6">
      <pre className="text-left">
        {black_hole.slice(0, phase === 'black_hole' ? linesShown : black_hole.length).join('\n')}
      </pre>
      {phase === 'screen_text' && (
        <pre className="text-center mx-auto">
          {screen_text.slice(0, linesShown).join('\n')}
        </pre>
      )}
    </div>
  )
}