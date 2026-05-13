import * as React from "react"
import { useState } from "react"
import { useTranslation } from "../i18n/LanguageContext"

export function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) {
  const [position, setPosition] = useState(50)
  const t = useTranslation()

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden group select-none bg-gray-200">
      {/* Imagen Antes (Fondo) */}
      <div className="absolute inset-0 w-full h-full">
        <img src={beforeImage} alt="Antes" className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 bg-gray-900/70 text-white px-3 py-1 rounded-lg text-sm font-bold backdrop-blur-sm z-0">
          {t.results.before}
        </div>
      </div>

      {/* Imagen Después (Frente recortado) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
      >
        <img src={afterImage} alt="Después" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
          {t.results.after}
        </div>
      </div>

      {/* Línea divisoria y manija */}
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

      {/* Input Range invisible para controlar el slider */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={position} 
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        aria-label="Arrastra para comparar antes y después"
      />
    </div>
  )
}
