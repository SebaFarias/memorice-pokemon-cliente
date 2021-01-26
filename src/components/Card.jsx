import React, { useState, useContext, useEffect } from 'react'
import imgController from '../../data/controllers/img'
import {GlobalContext} from './GlobalContext'
import pokeballImg from '../../public/icon.svg'

const Card = ({ pokemon, status, position, vertical }) => {
  const [ global, controller ] = useContext(GlobalContext)
  const [ reversed, setReversed ] = useState( status )
  const [ cardStyle, setCardStyle ] = useState({
    cursor: `${reversed === 'solved'? 'not-allowed':'pointer'}`,
    transform: `translate(${needCorrection(global,position)?50:0}%,0%)`,
  })

  useEffect(()=>{
    setReversed( status )
  },[status])

  useEffect(()=>{
    const updateCard = () => {
      setCardStyle( prevState => {
        console.log('status:',status,'reversed',reversed)
        return({
          ...prevState,
          cursor: `${reversed === 'solved'? 'not-allowed':'pointer'}`,
          transform: `translate(${needCorrection(global,position)?50:0}%,0%)`,
        })
      })  
    }
    updateCard()
  },[reversed])

  const flip = flipTime => {
  setCardStyle( prevState => {
    return({
        ...prevState,
        transform: `translate(${needCorrection(global,position)?50:0}%,0%) rotate3d(0,1,0,90deg)`,
        transition: `transform ${flipTime}ms`,
      })
    })
    setTimeout(()=>{
      setCardStyle( prevState => {
        return({
          ...prevState,
          transform: `translate(${needCorrection(global,position)?50:0}%,0%)`,
          transition: `transform ${flipTime}ms`,
          })
        })
    },flipTime)
  }

  const handleClick = () => {
    if( reversed === 'hidden' ) controller.clickedCard( position, flip )
  }
  
  return (
    <section 
      className='card' 
      style={cardStyle}
      onClick={handleClick}
      id={`card${position[0]}-${position[1]}`}  
    >
      <img 
        className='pokemon-img'
        src={ reversed === 'hidden'? pokeballImg : imgController.getImg(pokemon) }
        style={{
          width:  `${ vertical ? '100%': 'auto' }`,
          height: `${ vertical ? 'auto': '100%' }`,
        }}
      />
    </section>
  )
}

export default Card

const needCorrection = ({rows,columns},position) => {
  return (rows*columns)%2 != 0 && rows == position[0]+1
}