import React, {useState , createContext} from 'react'
import Timer from '../model/Timer'
import PokeMatrix from'../model/PokeMatrix'
//import courier from '../../data/leaderboardApi'

export const GlobalContext = createContext()

const FLIP_TIME = 300 //this is only half the turn

export const GlobalStateProvider = (props) => {
  const [ global, setGlobal] = useState({
    data: new PokeMatrix( 3 , 4 ),
    rows: 3,
    columns: 4,
    blocked: false,
    started: false,
    menu:-1,
    showMenu:true,
    timer: new Timer(),
    errors: 0,
    clicked: [],
    leaderBoard: [],
  })
  const controller = {
    showMenu: selectedMenu => {
      setGlobal( prevState => {
        prevState.timer.stop()
        return ({
          ...prevState,
          showMenu: true,
          menu: typeof selectedMenu === 'undefined'? prevState.menu : selectedMenu,
        })
      })
    },
    hideMenu: () => {
      setGlobal( prevState => {
        if(prevState.timer.toMiliseconds() !== 0 )prevState.timer.start()
        return ({
          ...prevState,
          showMenu: false,
        })
      })
    },
    setMenu: menu => {
      setGlobal( prevState => {
        return ({
          ...prevState,
          menu: menu,
        })
      })
    },
    addError: () => {
      setGlobal( prevState => {
        return ({
          ...prevState,
          errors: prevState.errors + 1,
        })
      })
    },
    disableBoard: () => {
      setGlobal( prevState => {
        return({
          ...prevState,
          blocked: true,
        })
      })
    },
    allowBoard: () => {
      setGlobal( prevState => {
        return({
          ...prevState,
          blocked: false,
        })
      })
    },
    delay: ( callback, delay ) => {
      setTimeout(callback,delay)
    },
    setRows: newValue => {
      setGlobal( prevState => {
        return({
          ...prevState,
          rows: newValue,
          started: false,
          data: new PokeMatrix( newValue, prevState.columns ),
        })
      })
    },
    setColumns: newValue => {
      setGlobal( prevState => {
        return({
          ...prevState,
          columns: newValue,
          started: false,
          data: new PokeMatrix( prevState.rows, newValue ),
        })
      })
    },
    getNewBoard: () => {
      setGlobal( prevState => {
        return({
          ...prevState,
          data: new PokeMatrix( prevState.rows, prevState.columns ),
        })
      })
    },
    startGame: () => {
      setGlobal( prevState => {
        prevState.timer.stop()
        prevState.timer.reset()
        return({
          ...prevState,
          data: new PokeMatrix( prevState.rows , prevState.columns ),
          errors: 0,
          menu: 0,
          showMenu: false,
          started: true,
          clicked: [],
        })
      })
    },
    setClicked: newClicked => {
      setGlobal( prevState => {
        return({
          ...prevState,
          clicked: newClicked,
        })
      })
    },
    getGlobal: () =>{
      let global
      setGlobal( prevState => {
        global = prevState
        return prevState
      })
      return global
    },
    clickedCard: ( indexes, flip ) => {
      const prevState = controller.getGlobal()
      if(!prevState.timer.running)prevState.timer.start()
      if(indexes===prevState.clicked[0]) return
      const isSecond = prevState.clicked.length > 0
      let lastOne
      if(isSecond) lastOne = prevState.clicked    
      controller.disableBoard()
      setTimeout(()=>{
        controller.allowBoard()
      },FLIP_TIME)
      controller.flipCard( indexes, flip )
      controller.setClicked(isSecond? [] : [ indexes, flip ])
      if(!isSecond) return
      const success = prevState.data.compare(lastOne[0],indexes)
      setTimeout(()=>{
        controller.checkWin()    
      },3 * FLIP_TIME)
      if(success) return
      setTimeout( ()=>{
        controller.addError()
        controller.animateError()
        controller.flipCard( indexes, flip )
        controller.flipCard( lastOne[0] , lastOne[1])  
      },3*FLIP_TIME)
    },
    animateError: () => {
      console.log('Haz esta animación Seba flojo!!!')
    },
    checkWin: () => {
      setGlobal( prevState => {
        const finished = prevState.data.isSolved()
        if(!finished) return prevState
        prevState.timer.stop()
        return({
          ...prevState,
          menu:3,
          showMenu:true,
          started:false,
        })
      })
    },
    handleSubmit: name => {
      setGlobal( prevState => {
        const scoreData = {
          user: name,
          size: Math.floor( ( prevState.rows * prevState.columns ) / 2 ),
          time: prevState.timer.toMiliseconds(),
          fails: prevState.errors 
        }
        console.log(scoreData)
        return({
          ...prevState
        })
      })
    },
    fetchLeaderBoard: async () => {
      const leaderBoard = await courier.fetchLeaderBoard()
      .then( res => {
        console.log(res)
      }
      )
    },
    flipCard: (indexes,flip) => {
      flip(FLIP_TIME)
      setTimeout(()=>{
        setGlobal( prevState => {
          return({
            ...prevState,
            data: prevState.data.flip(indexes),
          })
        })
      },FLIP_TIME)
    },
  }
  
  return (
    <GlobalContext.Provider value={ [ global, controller ] }>
      {props.children}
    </GlobalContext.Provider>
  )
}
