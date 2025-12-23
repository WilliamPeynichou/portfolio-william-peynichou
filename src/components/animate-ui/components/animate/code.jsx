import { useState, useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'

export function Code({ children, className, code }) {
  return (
    <div className={`bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-gray-800 ${className || ''}`}>
      {children}
    </div>
  )
}

export function CodeHeader({ icon: Icon, children, copyButton }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-black border-b border-[#3e3e42]">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-3 h-3 text-[#519aba]" />}
        <span className="text-xs text-gray-400 font-mono">{children}</span>
      </div>
      {copyButton && (
        <button
          onClick={handleCopy}
          className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 rounded hover:bg-gray-700"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      )}
    </div>
  )
}

export function CodeBlock({ code, lang, writing, duration, delay, cursor }) {
  const [displayedCode, setDisplayedCode] = useState('')
  const [highlightedCode, setHighlightedCode] = useState('')
  
  useEffect(() => {
    if (!writing) {
      setDisplayedCode(code)
      return
    }

    // Réinitialiser le code affiché
    setDisplayedCode('')
    
    let currentIndex = 0
    let intervalId

    const timer = setTimeout(() => {
      intervalId = setInterval(() => {
        if (currentIndex <= code.length) {
          setDisplayedCode(code.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(intervalId)
        }
      }, duration / code.length)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (intervalId) clearInterval(intervalId)
    }
  }, [code, writing, duration, delay])

  useEffect(() => {
    if (displayedCode) {
      const grammar = Prism.languages[lang] || Prism.languages.javascript
      const highlighted = Prism.highlight(displayedCode, grammar, lang)
      setHighlightedCode(highlighted)
    } else {
      setHighlightedCode('')
    }
  }, [displayedCode, lang])

  return (
    <div className="p-3 font-mono text-[11px] leading-[1.6] text-gray-300 overflow-auto max-h-[450px] bg-[#1e1e1e]">
      <pre className="whitespace-pre-wrap !bg-transparent !m-0 !p-0">
        <code 
          className={`language-${lang} !bg-transparent`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
        {cursor && writing && displayedCode.length < code.length && (
          <span className="animate-pulse text-white">|</span>
        )}
      </pre>
    </div>
  )
}

