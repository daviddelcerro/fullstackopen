const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('dist'))



const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.phone === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
  }

const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(requestLogger)

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
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))

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

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res) => {
  const {name, number}= req.body


  Person.findByIdAndUpdate(req.params.id, {name, number}, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)