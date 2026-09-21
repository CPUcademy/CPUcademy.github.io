import { useState, useRef, useEffect } from 'react'

type ToggleDescriptionProps = {
  children: React.ReactNode
}

function ToggleDescription({ children }: ToggleDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current)
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
  }, [isOpen])

  return (
    <>
      <a href="#" onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen) }} role="button" aria-expanded={isOpen} 
      className="toggle-description-btn">{isOpen ? 'Hide description' : 'Show description'}</a>
      <div ref={contentRef} className="mt-3" style={{ height: `${height}px`, overflow: 'hidden', transition: 'height 0.35s ease' }}>{children}</div>
    </>
  )
}

export default ToggleDescription