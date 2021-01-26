const pokemonController = {
  getNewArray: ( rows = 5, columns = 5 ) => {
    const newPokemonsArray = []
    const newPokemonsDictionary = {}
    
    for(let i = 0; i < rows; i++){
      newPokemonsArray[i]= []
        for(let j = 0; j < columns; j++){
          const newId = randomId(newPokemonsDictionary)
          newPokemonsArray[i][j] = newId
          newPokemonsDictionary[newId] = true
        }    
    }

    return newPokemonsArray
  },
}

const randomId = dictionary => {
  const newId = Math.floor((Math.random() * 649) + 1);
  if(dictionary[newId]) return randomId(dictionary)
  return newId
}

export default pokemonController