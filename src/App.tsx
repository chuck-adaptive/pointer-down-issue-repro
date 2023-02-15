import { useState } from 'react'
import './App.css'

function App() {
  const [pointerDown, setPointerDown] = useState(false)

  return (
    <div className="App">
      <div className='repro-div'
        onPointerDown={() => setPointerDown(true)}
        onPointerUp={() => setPointerDown(false)} 
        >
        TO CLICK {`${pointerDown}`}
      </div>
      <div className='resultthing'>{`${pointerDown}`}</div>
    </div>
  )
}

export default App
