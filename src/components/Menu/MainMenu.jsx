import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

const MainMenu = () => {

  const [ global, controller ] = useContext( GlobalContext )

  const btnContainer = {
    padding: '1rem 2rem',
    maxWidth: 300, 
  }
  const btnStyle = {
    margin: '0.5rem 0',
    width: '100%',
  }

  const newGameMenu = () => {
    controller.setMenu(1)
  }
  const handleContinue = () => {
    if(global.started) controller.hideMenu()
  }

  return(
    <div className="main menu">
      <h3>Menú Principal</h3>
      <div className="menu-btn-container" style={btnContainer}>
        <button className="btn-yel" style={btnStyle} onClick={handleContinue} disabled={!global.started}>Continuar</button>
        <button className="btn-yel" style={btnStyle} onClick={newGameMenu}>Nuevo Juego</button>
        <button className="btn-yel" style={btnStyle}>Mejores Puntajes</button>
      </div>
      <div className="oak-spacer"></div>
    </div>
  )
}

export default MainMenu