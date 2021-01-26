import React from 'react'
import { GlobalStateProvider } from './components/GlobalContext'
import MenuModal from './components/Menu/MenuModal'
import Header from './components/Header'
import Board from './components/Board'
import Footer from './components/Footer'
import './styles.css'

const App = () => {
  return (
    <GlobalStateProvider>
      <MenuModal/>
      <Header/>
      <Board/>
      <Footer/>
    </GlobalStateProvider>
  )
}

export default App