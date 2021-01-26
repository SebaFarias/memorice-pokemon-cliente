import React, { useContext, useState } from 'react'
import { GlobalContext } from './GlobalContext'

const TimerShower = () => {

  const global = useContext(GlobalContext)[0]
  const [ time, setTime ] = useState(global.timer.toString())
  const [ interv, setInterv] = useState(setInterval(()=>{
    setTime(global.timer.toString())
  },10))
  return (
    <div className="timer-shower">
      {time}
    </div>
  )
}

export default TimerShower