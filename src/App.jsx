import { useState } from 'react'
import './App.css'
import TeamTable from './components/Role'
import Players from './components/Players'
import { DndContext } from '@dnd-kit/core';

function App() {
  const [count, setCount] = useState(4)

  function reduceSize() {
    if (count > 2) setCount(prevCount => prevCount - 1)
  }

  function increaseSize() {
    if (count < 8) setCount(prevCount => prevCount + 1)
  }

  const [isDropped, setIsDropped] = useState(false);

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  return (
    <div className="container">
      <h1>Volleyball Team Builder</h1>
      <h2>Number of teams: {count}</h2>
      <button onClick={increaseSize}>Increase Team Size</button>
      <br></br>
      <button onClick={reduceSize}>Reduce team size</button>
      <br></br>
      <DndContext onDragEnd={handleDragEnd}>
        <TeamTable teamSize = {count}/>
        <Players/>
      </DndContext>
    </div>
  )
}

export default App
