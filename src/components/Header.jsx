import React, { useContext } from 'react'
import { GlobalContext } from './GlobalContext'
import ErrorsShower from './ErrorsShower'
import TimerShower from './TimerShower'
import menuIcon from '../../public/menu.svg' 
import highscoresIcon from '../../public/highscores.svg'

const Header = () => {

  const [ global, controller ] = useContext( GlobalContext )

  const handleMenuBtn = () => {
    controller.showMenu(0)
  }
  return(
    <nav className='top bar'>
      <div className="controls">
        <button className='round-btn menu-btn' onClick={handleMenuBtn}
          style={{
            background: `url(${menuIcon}) no-repeat center, radial-gradient(50% 50% at 50% 50%,#34384b 0%,#1F212D 100% )`
          }}
        ></button>
        <button className='round-btn highscores-btn'
          style={{
            background: `url(${highscoresIcon}) no-repeat center, radial-gradient(50% 50% at 50% 50%,#34384b 0%,#1F212D 100% )`
          }}
        ></button>
      </div>
      <TimerShower/>
      <ErrorsShower/>
    </nav>
  )
}

export default Header