import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [ notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const addPerson = (e) => {
    e.preventDefault()
    if (newName === '' || newNumber === '') return
    const foundPerson = persons.find((x) => x.name === newName)
    if (!foundPerson) {
      let personObject = { 
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          clearForm()
          notify(`Added ${personObject.name}`, 4000)
        })
        .catch(error => alert('fail'))

    } else {
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        changeNumber(foundPerson.id)
        clearForm()
      }
    }
  }

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.destroy(person.id)
      .then(response => setPersons(persons.filter((p) => p.id !== person.id)))
      .catch(error => {
        alert(`The person ${person.name} was already deleted from server`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const changeNumber = id =>  {
    const person = persons.find(p => p.id === id)
    const changedPerson = {...person, number: newNumber}
    personService.update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : changedPerson))
        notify(`Updated ${changedPerson.name}`, 4000)
      })
      .catch(error => {
        alert(`The person ${changedPerson.name} was already deleted from server`)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const notify = (message, duration) => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, duration)
  }

  const personFilter = () => persons.filter((x) => x.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={ notificationMessage }/>
      <Filter filter={ filter}  onChange={ handleFilterChange } />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personFilter={personFilter} onDelete={handleDelete} />
    </div>
  );
}

export default App;
