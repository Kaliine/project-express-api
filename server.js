import express from 'express'
import cors from 'cors'

import foreningsData from './data/foreningar.json'

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// First endpoint 
// The app.get method takes two arguments - the path and a call back function, which can be used by the frontend.
app.get('/', (req, res) => {
  res.send('This is an API handling data about foreningar.')
})

// Endpoint for all foreningar, with all data (from json file)
app.get('/foreningar', (req, res) => {
  res.json(foreningsData)
})

// A specific forening, using params
app.get('/foreningar/:id', (req, res) => {
  const { id } = req.params

  const forening = foreningsData.find(item => item.id === +id)

  if (!forening) {
    res.status(404).send('No forening found')
  } else {
    res.json(forening)
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
