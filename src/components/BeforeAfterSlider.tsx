import * as React from "react"
import { useState } from "react"

interface Props {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
}

export function BeforeAfterSlider({ beforeImage, afterImage, beforeLabel, afterLabel }: Props) {
  const [position, setPosition] = useState(50)

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden group select-none bg-gray-200">
      {/* Before image (background) */}
      <div className="absolute inset-0 w-full h-full">
        <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-gray-900/70 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm z-0">
          {beforeLabel}
        </div>
      </div>

      {/* After image (clipped) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
      >
        <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
          {afterLabel}
        </div>
      </div>

      {/* Divider line + handle */}
      <div
        className="absolute inset-y-0 w-1 bg-white pointer-events-none z-10 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `calc(${position}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-blue-600 transition-transform group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label={`Drag to compare ${beforeLabel} and ${afterLabel}`}
      />
    </div>
  )
}
