const express = require('express')
const todoRoute = express.Router()
const db = require('../utils/db')

// get all todos
todoRoute.get('/todos', async (req, res) => {
  const todos = await db.todo.findMany()
  res.json({ data: todos })
})

// create a todo
todoRoute.post('/todos', async (req, res) => {
  const { text } = req.body
  const todo = await db.todo.create({
    data: {
      text: text,
    },
  })

  res.json({ data: todo })
})

// update a todo
todoRoute.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { text, completed } = req.body

  const todo = await db.todo.findUnique({
    where: { id: parseInt(id) },
  })

  const newTodo = await db.todo.update({
    where: { id: parseInt(id) },
    data: {
      text: text ? text : todo.text,
      completed: completed != undefined ? completed : todo.completed,
    },
  })

  res.json({ data: newTodo })
})

// delete a todo
todoRoute.delete('/todos/:id', async (req, res) => {
  const { id } = req.params

  const todo = await db.todo.findUnique({ where: { id: id * 1 } })

  if (!todo) {
    return res.json({ message: 'Given id is not found' })
  }

  await db.todo.delete({ where: { id: parseInt(id) } })

  res.json({ message: 'Deleted' })
})

module.exports = todoRoute
