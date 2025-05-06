"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

interface ConfettiEffectProps {
  active: boolean
  duration?: number
}

export function ConfettiEffect({ active, duration = 3000 }: ConfettiEffectProps) {
  const { width, height } = useWindowSize()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (active) {
      setIsActive(true)
      const timer = setTimeout(() => {
        setIsActive(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration])

  if (!isActive) return null

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      colors={["#c084fc", "#a855f7", "#7c3aed", "#6366f1", "#4f46e5", "#f472b6", "#ec4899"]}
    />
  )
}
