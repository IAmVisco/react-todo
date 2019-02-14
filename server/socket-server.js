const io = require('socket.io')()
const port = process.env.PORT || 8000
const data = require('./data.json')

io.on('connection', (client) => {
  client.on('getCards', (something) => {
    client.emit('cards', data)
  })

  client.on('postCard', (card) => {
      console.log(card)
      client.emit('cards', [data[0]])
  })
})

io.listen(port)
console.log(`Socket server is listening on port ${port}.`)