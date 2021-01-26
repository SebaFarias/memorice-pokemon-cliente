const IdList = require("./IdList")

class IdMatrix {
  constructor( rows, columns, idRange){
    this.idRange = idRange
    this.rows = rows
    this.columns = columns
    this.neededIds = this.howManyIds()
    this.idList = new IdList( this.neededIds, this.idRange)
    this.availablePositions = this.getAllPositions()
    this.idMatrix = this.generateIdMatrix()
  }
  reset( rows = 0, columns = 0){
    if( rows > 0 ) this.rows = rows
    if( columns > 0 ) this.columns = columns
    this.neededIds = this.howManyIds()
    this.idList = new IdList( this.neededIds, this.idRange )
    this.availablePositions = this.getAllPositions()
    this.newMatrix()
  }
  howManyIds(){
    return Math.floor( this.rows * this.columns / 2 )
  }
  getAllPositions(){
    const positions = []
    const quantity = this.rows * this.columns - (this.rows * this.columns % 2 == 0 ? 0 : 1)
    let rowIndex = 0
    let columnIndex = 0
    for(let i = 0; i < quantity; i++){
      positions[i]= [ rowIndex, columnIndex ]
      columnIndex++
      if(columnIndex >= this.columns){
        rowIndex++
        columnIndex = 0
      }    
    }
    return positions
  }
  getRandomPosition(){
    const randomIndex = Math.floor(Math.random() * this.availablePositions.length)
    const position = this.availablePositions[randomIndex]
    this.availablePositions.splice(randomIndex,1)
    return position
  }
  newMatrix(){
    const newMatrix = []
    for(let i = 0; i < this.rows; i++){
      newMatrix[i]=[]
    }
    this.idMatrix = newMatrix
  }
  generateIdMatrix( rows = 0, columns = 0){
    this.reset(rows, columns)
    this.idList.getList().map( id => {
      const [ row1, column1 ] = this.getRandomPosition()
      this.idMatrix[row1][column1] = id
      const [ row2, column2 ] = this.getRandomPosition()
      this.idMatrix[row2][column2] = id
    })
    return this.idMatrix
  }
  getMatrix(){
    return this.idMatrix
  }
}

module.exports = IdMatrix