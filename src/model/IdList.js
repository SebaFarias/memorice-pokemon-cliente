class IdList{
  constructor( size, [ min, max ] ){
    this.usedIds = { }
    this.size    = size
    this.min     = min
    this.max     = max
    this.list    = this.generateIds()
  }
  generateIds( size = 0 ){
    this.reset( size )
    const newList = this.list.map( () => {
      const newId = this.newRandomId()
      this.usedIds[newId] = true
      return newId
    })
    this.list = newList
    return this.list
  }
  reset( size = 0 ){
    if(size > 0) this.size = size
    this.list = this.newList()
    this.usedIds = {}
  }
  newList(){
    const newList = []
    for(let i = 0 ; i < this.size; i++){
      newList[i] = []
    }
    return newList
  }
  newRandomId(){
    const newID = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
    if(this.usedIds[newID]) return this.newRandomId()
    return newID
  }
  getList(){
    return this.list
  }
}

module.exports = IdList