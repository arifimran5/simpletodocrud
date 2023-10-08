// 1. Import express
const express = require('express')
const dotenv = require('dotenv')
// import routes
const todoRoute = require('./routes/todo.route')

// 2. initialise application
const app = express()

dotenv.config()

// 5. setup middlewares
app.use(express.json()) // to get json from the client through request.body

// 4. register our routes
app.use(todoRoute)

console.log('db url: ' + process.env.DATABASE_URL)

// 3. give our application an address to run on (listen to it)
app.listen(8000, () => {
  console.log(`Server is running on http://localhost:8000`)
})
