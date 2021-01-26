import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'
import BackButton from './BackButton'

const SubmitScoreMenu = () => {

  const [ global, controller ] = useContext(GlobalContext)

const handleSubmit = event => {
  event.preventDefault()
  const name = document.getElementById('submitName').value
  if(name === '') return
  controller.handleSubmit(name)
}

  return(
    <div className="submit menu">
      <BackButton title='Felicitaciones'/>
      <div className="score">
        <div className="score-stats">
          <h4>Tiempo: {global.timer.toString()}</h4>
        </div>
        <div className="score-stats">
          <h4>Errores: {global.errors}</h4>
        </div>
      </div>
      <form className='submit-form' onSubmit={handleSubmit}>
        <h4>Ingresa tu nombre para registrar tu puntaje</h4>
        <label htmlFor="submitName">Nombre:
          <input id='submitName' className='btn-yel input' type="text"/>
        </label>
        <div className="menu-down">
          <div className="oak-spacer"></div>
          <div className="btn-container">
            <button className="btn-yel">Enviar !</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SubmitScoreMenu