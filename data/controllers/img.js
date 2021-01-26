const imgController = {
  getImg: idPokemon => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idPokemon}.svg`
  },
  getName: idPokemon => {
    return `Pokemon N°${idPokemon}´s Name`
  },
}

export default imgController