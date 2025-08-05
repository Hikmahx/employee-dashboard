
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 }) // Use WebSocketServer directly

console.log('WebSocket server started on ws://localhost:8080')

let employeeCounter = 100 // To generate unique IDs

wss.on('connection', (ws) => {
  console.log('Client connected')

  // Send a new employee every 5 seconds
  const interval = setInterval(() => {
    employeeCounter++
    const newEmployee = {
      id: `163-${employeeCounter}`,
      name: `New Employee ${employeeCounter}`,
      surname: `Surname ${employeeCounter}`,
      position: 'New Hire',
      experience: '0 years',
      team: Math.floor(Math.random() * 50) + 1,
      bday: 'Jan 01, 2000',
      email: `new.employee${employeeCounter}@example.com`,
      mobile: `+1(555)-123-${1000 + employeeCounter}`,
      address: 'New City, New Street, 1',
      status: 'Full-time',
      checked: false,
      expanded: false,
    }
    ws.send(JSON.stringify(newEmployee))
    console.log(`Sent new employee: ${newEmployee.name}`)
  }, 500000)

  ws.on('close', () => {
    console.log('Client disconnected')
    clearInterval(interval) // Clear interval when client disconnects
  })

  ws.on('error', (error) => {
    console.error('WebSocket error:', error)
  })
})
