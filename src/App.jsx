import { useEffect, useState } from 'react'
import './App.css'

function FollowMouse () {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log(clientX, clientY)
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // Cleanup
    // Se ejecuta cuando se desmonta el componente
    // cuando cambian las dependencias antes de ejecutar un evento nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  const handleClick = () => {
    setEnabled(!enabled)
  }
  return (
    <main>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#09f',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <button
        type='button'
        onClick={handleClick}
      >
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
  )
}

function App () {
  const [mounted, setMounted] = useState(true)
  return (
    <>
      {mounted && <FollowMouse />}
      <button
        type='button'
        onClick={() => setMounted(!mounted)}
      >
        Mount component
      </button>
    </>
  )
}

export default App
