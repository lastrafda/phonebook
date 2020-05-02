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
  const [ notification, setNotification] = useState({message: null, type: null})

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
          notify(`Added ${personObject.name}`, 'success', 3000)
        })
        .catch(error => {
          notify(`The person ${personObject.name} was already deleted from server`, 'error', 3000 )
          setPersons(persons.filter(p => p.id !== personObject.id))
        })

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
      .then(response => {
        notify(`Deleted ${person.name}`, 'error', 3000)
        setPersons(persons.filter(p => p.id !== person.id))
        return setPersons(persons.filter((p) => p.id !== person.id));
      })
      .catch(error => {
        notify(`The person ${person.name} was already deleted from server`, 'error', 3000 )
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
        notify(`Updated ${changedPerson.name}`, 'success', 3000)
      })
      .catch(error => {
        notify(`The person ${changedPerson.name} was already deleted from server`, 'error', 3000 )
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const notify = (message, type, duration) => {
    setNotification({...notification, message: message, type: type})
    setTimeout(() => {
      setNotification({...notification, message: null, type: null})
    }, duration)
  }

  const personFilter = () => persons.filter((x) => x.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={ notification.message } type={ notification.type }/>
      <Filter filter={ filter}  onChange={ handleFilterChange } />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personFilter={personFilter} onDelete={handleDelete} />
    </div>
  );
}

export default App;
