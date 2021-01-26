import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'

const BackButton = ({ title }) => {

  const controller = useContext(GlobalContext)[1]

  const handleMenuBtn = () => {
    controller.showMenu(0)
  }

  return(
    <div className="title-container" style={{position:'relative'}}>
      <h3>{title}</h3>
      <button 
      onClick={handleMenuBtn}
      className="btn-yel" 
      style={{
        position: 'absolute',
        top: 35,
        left: 0,
        padding:0,
        width: '2rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}
      >
        &#60;
      </button>
    </div>
  )
}

export default BackButton