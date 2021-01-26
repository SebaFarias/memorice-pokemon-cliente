const IdMatrix = require('./IdMatrix')

class PokeMatrix{
  constructor( rows, columns ){
    this.rows = rows
    this.columns = columns
    this.idMatrix = new IdMatrix( this.rows, this.columns, [ 1, 649 ])
    this.pokeMatrix = []
    this.generatePokeMatrix()
  }
  generatePokeMatrix(){
    this.newPokeMatrix()
    this.idMatrix.getAllPositions().map( position => {
      const [ row, column ] = position
      this.pokeMatrix[row][column] = {
        id: this.idMatrix.getMatrix()[row][column],
        state: 'hidden',
      }
    })
  }  
  compare( [ row1, column1 ] , [ row2, column2 ] ){
    const success = this.pokeMatrix[row1][column1].id === this.pokeMatrix[row2][column2].id
    if(success){
      setTimeout(()=>{
        this.pokeMatrix[row1][column1].state = 'solved'
        this.pokeMatrix[row2][column2].state = 'solved'
      },300)
    }
    return success
  }
  flip( [ row, column ] ){
    this.pokeMatrix[row][column].state = this.getNewState(this.pokeMatrix[row][column].state)
    return this
  }
  getNewState( prevCardState ){
    if( prevCardState === 'hidden' ) return 'shown'
    if( prevCardState === 'shown' ) return 'hidden'
    return prevCardState
  }
  newPokeMatrix(){
    this.pokeMatrix = []
    for( let i = 0; i < this.rows; i++ ){
      this.pokeMatrix[i] = []
    }
  }
  isSolved(){
    return this.pokeMatrix.every( row => {
      return row.every( pokemon => {
        return pokemon.state === 'solved' 
      })
    })
  }
  getPoke([ row, column ]){
    return this.pokeMatrix[row][column]
  }
  getPokeMatrix(){
    return this.pokeMatrix
  }
  getPositions(){
    return this.idMatrix.getAllPositions()
  }
}

module.exports = PokeMatrix