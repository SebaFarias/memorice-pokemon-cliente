const API_URL = 'http://localhost:8080/highscores'

const courier ={
  fetchLeaderBoard: async () => {
    const response = await fetch(`${API_URL}/getHighscores`)
    .catch( err => {
      console.log(err)
    })
    return response.json()
  },
}

module.exports = courier