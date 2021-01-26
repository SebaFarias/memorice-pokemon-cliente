//This is not working as expected, use Timer.js instead

class StopWatch{
  constructor(){
    this.hours = 0
    this.minutes = 0
    this.seconds = 0
    this.hundredths = 0
    this.interval = false
  }
  startNewGame(){
    this.stop()
    this.reset()
    this.start()
  }
  start(){
    this.interval = setInterval(()=>{this.step()},10)
  }
  stop(){
    if(this.interval)clearInterval(this.interval)
  }
  reset(){
    this.hours = 0
    this.minutes = 0
    this.seconds = 0
    this.hundredths = 0
  }
  toString(){
    let time = ''
    if(this.hours>0)time+=this.hours>=10?`${this.hours}:`:`0${this.hours}:`
    time+=this.minutes>=10?`${this.minutes}:`:`0${this.minutes}:`
    time+=this.seconds>=10?`${this.seconds}:`:`0${this.seconds}:`
    time+=this.hundredths>=10?`${this.hundredths}`:`0${this.hundredths}`
    return time
  }
  toMiliseconds(){
    const hoursToMs = this.hours * 60 * 60 * 1000
    const minutesToMS = this.minutes * 60 * 1000
    const secondsToMs = this.seconds * 1000
    const hundredthsToMs = this.hundredths * 10
    return hoursToMs + minutesToMS + secondsToMs + hundredthsToMs
  }
  step(){
    let newHours = this.hours
    let newMinutes = this.minutes
    let newSeconds = this.seconds
    let newHundredths = this.hundredths + 1
    if(newHundredths >= 100){
      newHundredths = 0
      newSeconds += 1
    } 
    if(newSeconds>= 60){
      newSeconds = 0
      newMinutes += 1
    } 
    if(newMinutes>=60){
      newMinutes = 0
      newHours += 1
    }
    this.hours = newHours
    this.minutes = newMinutes
    this.seconds = newSeconds
    this.hundredths = newHundredths
  }
}

module.exports = StopWatch