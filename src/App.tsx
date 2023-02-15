import React, { useCallback, useState } from 'react'
import './App.css'
import { fin } from './openfinGlobal';

type Top = number;
type Left = number;
type ClickedPosition = [Top, Left];

const moveWindowWithMouse = async (eventLeft: number, eventTop: number, clickedPosition: ClickedPosition) => {
  const mainWindow = fin.Window.getCurrentSync();
  const { left, top } = await mainWindow.getBounds();
  mainWindow.moveTo(left + eventLeft - clickedPosition[1], top + eventTop - clickedPosition[0])
}

function App() {
  const [pointerDown, setPointerDown] = useState(false)
  const [clickedPosition, setClickedPosition] = useState<ClickedPosition>([0,0]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setClickedPosition([event.pageX, event.pageY]);
      setPointerDown(true)
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [setClickedPosition, setPointerDown]
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (pointerDown) {
        moveWindowWithMouse(event.pageX, event.pageY, clickedPosition);
      }
    },
    [clickedPosition, pointerDown]
  )

  return (
    <div className="App">
      <div className={pointerDown ? 'repro-div-down' : 'repro-div-up'}
        onPointerDown={onPointerDown}
        onPointerUp={() => setPointerDown(false)} 
        onPointerMove={onPointerMove}
        >
      </div>
      <div className='resultthing'>{`${pointerDown}`}</div>
    </div>
  )
}

export default App
