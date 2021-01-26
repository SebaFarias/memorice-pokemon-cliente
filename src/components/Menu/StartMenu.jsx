import React from 'react'
import SizeSelector from '../SizeSelector'
import BackButton from './BackButton'

const StartMenu = ({starting}) => {
  return(
    <div className="start menu">
      {starting?
      <h3>Bienvenido</h3>
      :
      <BackButton title='Nuevo Juego'/>
      }
        <h4>Escoge la cantidad de pares para jugar</h4>
        <SizeSelector/>
    </div>
  )
}

export default StartMenu