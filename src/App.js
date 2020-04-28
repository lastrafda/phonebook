import React, { useState } from 'react';
import shortid from 'shortid';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

function App() {
  const [ persons, setPersons ] = useState([
    { name: 'José Lastra', phone: '981570911' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const [ filter, setFilter] = useState('')
  const handleNameChange = (e) => setNewName(e.target.value)
  const handlePhoneChange = (e) => setNewPhone(e.target.value)
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }
  const addPerson = (e) => {
    e.preventDefault()
    if (newName === '' || newPhone === '') return
    const nameIsAlreadyAdded = persons.find((x) => x.name === newName)
    if (!nameIsAlreadyAdded) {
      let person = { 
        name: newName,
        phone: newPhone
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewPhone('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  const personFilter = () => persons.filter((x) => x.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={ filter}  onChange={ handleFilterChange } />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newPhone={newPhone} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange}/>
      <h2>Numbers</h2>
      <ul>
        {personFilter().map((x) => <li key={shortid.generate()}>{x.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
