import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'

const MAX_ROWS = 9
const MAX_COLUMNS = 9

const SizeSelector = () => {

  const [ global, controller ] = useContext( GlobalContext )

  const handleSubmit = e => {
    e.preventDefault()
    if(global.rows == 1 && global.columns == 1) return
    controller.startGame()
    //controller.fetchLeaderBoard()
  } 
  const handleRowChange = e => {
    controller.setRows(e.target.value)
  }
  const handleColumnChange = e => {
    controller.setColumns(e.target.value)
  }

  return(
    <form id='startMenu' onSubmit={handleSubmit}>
      <div className="menu-up" style={{height:150,justifyContent:'space-around'}}>
        <div className="row-label-container" style={{display:'flex',marginLeft:'auto'}}>
          <h4 style={{margin:'auto'}}>{global.rows} Filas</h4>
        </div>
        <input 
          type='range' 
          value={global.rows} 
          onChange={handleRowChange} 
          style={{width:100,height:20,transform:'rotate(270deg) translate(-50%,-50%)',}} 
          min='1' 
          max={MAX_ROWS} 
          step='1'
        />
        <div className="size-center-container" style={{display:'flex',flexDirection:'column',transform:'translate(-50%,0)'}}>
        <div className="false-square" style={{width:75,height:75,margin: 'auto'}}>
          <h3 style={{marginBottom:'auto'}}>{Math.floor(global.rows*global.columns/2)}</h3>
        </div>
        <div className="columns-input" style={{display:'flex',flexDirection:'column'}}>
          <input 
            type='range' 
            value={global.columns} 
            onChange={handleColumnChange} 
            style={{width:100,height:20,}} 
            min='1' 
            max={MAX_COLUMNS} 
            step='1'
          />
          <h4 style={{margin:'auto'}}>{global.columns} Columnas</h4>
        </div>
        </div>
        <div className="row-label-container" style={{display:'flex',marginRight:'auto'}}>
          <h3 style={{margin:'auto', transform:'translateY(-9px)'}}>Pares</h3>
        </div>
      </div>
      <div className="menu-down">
        <div className="oak-spacer"></div>
        <div className="btn-container">
          <button className="btn-yel">Comenzar !</button>
        </div>
      </div>
    </form>
  )
}

export default SizeSelector