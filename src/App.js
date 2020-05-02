import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

function App() {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  },[])

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const addPerson = (e) => {
    e.preventDefault()
    if (newName === '' || newNumber === '') return
    const nameIsAlreadyAdded = persons.find((x) => x.name === newName)
    if (!nameIsAlreadyAdded) {
      let personObject = { 
        name: newName,
        number: newNumber
      }
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => alert('fail'))

    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleDelete = person => {
    personService.destroy(person.id)
      .then(response => setPersons(persons.filter((p) => p.id !== person.id)))
      .catch(error => alert('fail'))
    
  }
  const personFilter = () => persons.filter((x) => x.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={ filter}  onChange={ handleFilterChange } />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personFilter={personFilter} onDelete={handleDelete} />
    </div>
  );
}

export default App;
