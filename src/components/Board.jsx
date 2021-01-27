import React, { useState, useContext, useEffect } from 'react'
import {GlobalContext} from './GlobalContext'
import Card from './Card'

const GRID_GAP = 10

const Board = () => {
  
  const [ global, controller ] = useContext(GlobalContext)
  const [ cardSize, setCardSize ] = useState(
    [calculateCardSize(global.rows,GRID_GAP,'y'),calculateCardSize(global.columns,GRID_GAP,'x')]
    )
  const [boardStyle,setBoardStyle] = useState({
    gridTemplateRows: `repeat(${global.rows},${90/global.rows}%)`,
    gridTemplateColumns: `repeat(${global.columns},${85/global.columns}%)`,
  })  
  useEffect( () => {
    const handleResize = () => {
      setCardSize(
        [calculateCardSize(global.rows,GRID_GAP,'y'),calculateCardSize(global.columns,GRID_GAP,'x')]
        )
    }
    const recalculateCardSize = () => {
      setBoardStyle({
        gridTemplateRows: `repeat(${global.rows},${90/global.rows}%)`,
        gridTemplateColumns: `repeat(${global.columns},${85/global.columns}%)`,
      })  
    }
    window.addEventListener( 'resize', handleResize)
    handleResize()
    recalculateCardSize()
    return () => window.removeEventListener( 'resize', handleResize)
  } , [global.data, global.rows, global.columns]  )

  useEffect( () => {
    setBoardStyle( prevState => {
      return({
        ...prevState,
        pointerEvents: `${global.blocked?'none':'auto'}`
      })
    })
  },[global.blocked])

  return (
    <main id='board' className='board' style = {boardStyle}>
      {global.data.getPokeMatrix().map( ( row, i ) => {
        return row.map( ( pokemon, j ) => {
          return (
          <Card 
            key={`card-${i}-${j}`} 
            pokemon={pokemon.id} 
            status={pokemon.state} 
            position={[i,j]}
            vertical={cardSize[0] > cardSize[1]}
          />)
        })
      })}
    </main>
  )
}

const calculateCardSize = ( quantity , gap , axis ) => {
  const space = axis === 'x' ? window.innerWidth : window.innerHeight
  return (0.8*space - (gap * (quantity-1))) / quantity
}

export default Board