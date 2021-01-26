import React, { useContext, useEffect } from 'react'
import { GlobalContext } from './GlobalContext'

const ErrorsShower = () => {

  const errors = useContext(GlobalContext)[0].errors

  useEffect(()=>{
  },[errors])

  return(
    <div className="player-errors">
      Errores: {errors}
    </div>
  )
}

export default ErrorsShower