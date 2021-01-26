import React, { useContext, useEffect, useState, useRef } from 'react'
import { GlobalContext } from '../GlobalContext'
import StartMenu from './StartMenu'
import MainMenu from './MainMenu'
import HighscoresMenu from './HighscoresMenu'
import SubmitScoreMenu from './SubmitScoreMenu'
import oak from '../../images/oak.png'


const MenuModal = () => {

  const [ global, controller ] = useContext( GlobalContext )
  const [ menu , setMenu ] = useState( global.menu )
  const [ scroll , setScroll ] = useState(document.documentElement.scrollTop)
  const ref = useRef()

  useEffect(()=>{
    const handleScroll = () => {
      setScroll(document.documentElement.scrollTop)
    }
    const handleClick = event => {
      if( global.showMenu && global.started && ref.current && !ref.current.contains(event.target)){
        controller.hideMenu()
      }
    }
    const checkMenu = () => {
      setMenu(global.menu)
    }
    document.addEventListener( 'click', handleClick)
    window.addEventListener( 'scroll', handleScroll )
    handleScroll()
    checkMenu()
    return () => {
      window.removeEventListener( 'scroll', handleScroll )
      document.removeEventListener( 'click', handleClick)
    }
  },[global.showMenu,global.menu,global.started])

  return(
    <div className={`modal-outside ${global.showMenu?'':'hidden'}`} style={{top: scroll,}}>
      <div className="menu-container" ref={ref} style={{
        background: ` url(${oak}) bottom left no-repeat , radial-gradient(50% 50% at 50% 50%, #3d3d3d 0%, #21252D 100%)`
      }}>
        {menu === -1 ? <StartMenu starting={true}/> :''}
        {menu === 0 ? <MainMenu/> :''}
        {menu === 1 ? <StartMenu starting={false}/> :''}
        {menu === 2 ? <HighscoresMenu/> :''}
        {menu === 3 ? <SubmitScoreMenu/> :''}
      </div>
    </div>
  )
}

export default MenuModal