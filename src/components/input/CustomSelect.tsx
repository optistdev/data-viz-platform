import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface CustomSelectProps {
  options: string[]
  onChange?: (value: string) => void
  defaultValue?: string
}

export default function CustomSelect({
  options,
  onChange,
  defaultValue,
}: CustomSelectProps) {
  const [selected, setSelected] = useState(defaultValue || options[0])
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: string) => {
    setSelected(option)
    setIsOpen(false)
    onChange?.(option)
  }

  return (
    <div ref={dropdownRef} className="relative w-full sm:w-auto  max-w-xs">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#18181A80] border border-border-primary rounded px-2 py-2 text-sm flex justify-between items-center"
      >
        {selected}
        <ChevronDown className='ml-1' size={18} />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-[#18181A] border border-neutral-600 rounded text-white text-sm shadow-lg">
          {options.map((option, idx) => (
            <div
              key={idx}
              className="px-2 py-2 hover:bg-neutral-700 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
