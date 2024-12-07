import { useCallback, useEffect, useState } from 'react'

interface KeyConfig {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  callback?: () => void
}

export const useKeyPress = (config: KeyConfig) => {
  const [keyPressed, setKeyPressed] = useState(false)
  const { key: targetKey, ctrl, alt, shift, callback } = config

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const { key, ctrlKey, altKey, shiftKey } = e
      if (
        (!ctrl && !alt && !shift && key === targetKey) ||
        (ctrl && key === targetKey && ctrlKey === ctrl) ||
        (alt && key === targetKey && altKey === alt) ||
        (shift && key === targetKey && shiftKey === shift)
      ) {
        setKeyPressed(true)
        callback?.()
      }
    },
    // we only want to know if callback is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback],
  )

  const handleKeyUp = (e: KeyboardEvent) => {
    const { key, ctrlKey, altKey, shiftKey } = e

    if (
      (!ctrl && !alt && !shift && key === targetKey) ||
      (ctrl && key === targetKey && ctrlKey === ctrl) ||
      (alt && key === targetKey && altKey === alt) ||
      (shift && key === targetKey && shiftKey === shift)
    ) {
      setKeyPressed(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
    // to make sure this hook only runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return keyPressed
}
