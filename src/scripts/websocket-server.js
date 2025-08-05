
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

console.log('WebSocket server started on ws://localhost:8080')

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (message) => {
    console.log('Received message from client:', message.toString())
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })

  ws.on('error', (error) => {
    console.error('WebSocket error:', error)
  })
})
