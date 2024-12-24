const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.use(express.json())

const cors = require('cors')
app.use(cors())

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}


let persons = []

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  Person.findById(id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const generatedId = () => {
  const id = Math.floor(Math.random() * 100000)
    return id
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name || !body.number) {
    return res.status(400).json({
        error: 'content missing'
    })
  }

  if(persons.some(person => person.name === body.name)) {
    return res.status(400).json({
        error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generatedId()
  }

  persons = persons.concat(person)
  res.json(person)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)