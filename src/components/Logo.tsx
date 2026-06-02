import * as React from "react"

type LogoProps = {
  /** Tamaño del círculo (Tailwind). Por defecto h-10 w-10 */
  size?: string
  /** Variante de color del texto. `dark` para fondos claros, `light` para fondos oscuros (footer) */
  variant?: "dark" | "light"
  /** Tamaño del texto (Tailwind). Por defecto text-2xl */
  textSize?: string
  className?: string
}

export function Logo({
  size = "h-10 w-10",
  variant = "dark",
  textSize = "text-2xl",
  className = "",
}: LogoProps) {
  const neatColor = variant === "dark" ? "text-slate-800" : "text-white"
  const coColor = variant === "dark" ? "text-slate-400" : "text-gray-400"

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className={size}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Neat & Co logo"
      >
        <defs>
          <linearGradient
            id="neatBubbleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="50%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <radialGradient id="neatShine" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Burbuja principal */}
        <circle cx="50" cy="50" r="48" fill="url(#neatBubbleGradient)" />

        {/* Brillo superior */}
        <circle cx="50" cy="50" r="48" fill="url(#neatShine)" />

        {/* Burbuja interna grande */}
        <circle
          cx="38"
          cy="42"
          r="11"
          fill="rgba(255,255,255,0.35)"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1"
        />

        {/* Burbuja pequeña inferior */}
        <circle
          cx="55"
          cy="58"
          r="5"
          fill="rgba(255,255,255,0.4)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="0.8"
        />

        {/* Burbuja pequeña superior derecha */}
        <circle
          cx="65"
          cy="40"
          r="3.5"
          fill="rgba(255,255,255,0.45)"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="0.6"
        />

        {/* Punto de brillo */}
        <circle cx="34" cy="38" r="2" fill="rgba(255,255,255,0.9)" />
      </svg>

      <div className="flex items-baseline gap-1.5">
        <span className={`${textSize} font-bold tracking-tight ${neatColor}`}>
          Neat
        </span>
        <span className={`text-sm font-medium tracking-wide ${coColor}`}>
          &amp; Co
        </span>
      </div>
    </div>
  )
}
