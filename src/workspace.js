const hola = [[{state:'solved'},{state:'hidden'}],[{state:'solved'},{state:'solved'}],]

const solved = hola.every( row => {
  return row.every( pokemon => {
    return pokemon.state === 'solved' 
  })
})

console.log(solved)