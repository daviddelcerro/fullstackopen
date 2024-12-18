/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import { ListOfPersons } from './components/ListOfPersons.jsx'
import services from './services/spersons.js'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}


function App() {
  const addPerson = (event) => {
    event.preventDefault()
    let person = [...persons]
    if(person.some(person => person.name === event.target[0].value)) {
      if(person.some(person => person.number === event.target[1].value)) {
        alert(`${event.target[0].value} is already added to phonebook with the same number`)
      }else{
        if(window.confirm(`${event.target[0].value} is already added to phonebook,
           replace the old number with the new one?`)) {
            services.update(person.find(person => person.name === event.target[0].value).id,{name : event.target[0].value,number : event.target[1].value})
            .then(updatedPerson => setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson)))
            setNotificationMessage(`Updated ${event.target[0].value}`)
            setNewName('')
            setNewPhone('')
            setTimeout(() => {
              setNotificationMessage(null)
            },5000)
          }
      }
      return
    }else {
      services.create({name : event.target[0].value,number : event.target[1].value})
      .then(newPerson => setPersons(persons.concat(newPerson)))

      setNotificationMessage(`Added ${event.target[0].value}`)
      setNewName('')
      setNewPhone('')
      setTimeout(() => {
        setNotificationMessage(null)
      },5000)
    }

    
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      services.remove(id).then(setPersons(persons.filter(person => person.id !== id)))
    }

    
    
  }

  const [persons, setPersons] = useState([]) 
  const hook = () => {
    console.log('effect')
    services.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })

  }
  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className="notification" message={notificationMessage} />
      <form id="form" onSubmit={addPerson}>
        Name : <input name='name' onChange={(event) => setNewName(event.target.value)} value={newName} />
        Number : <input name='number' onChange={(event) => setNewPhone(event.target.value)} value={newPhone} />
        <button type='submit'> Add </button>
      </form>
      <h2>Numbers</h2>
      <div>
        <ListOfPersons persons={persons} onHandleClick={deletePerson} />
      </div>
      
      
    </div>
  )
}

export default App
