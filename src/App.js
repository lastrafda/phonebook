import React, { useState } from 'react';

function App() {
  const [ persons, setPersons ] = useState([
    { name: 'José Lastra'}
  ])
  const [ newName, setNewName] = useState('')
  const nameIsAlreadyAdded = persons.filter((x) => x.name === newName)
  const handleNameChange = (event) => {
    return setNewName(event.target.value);
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (!nameIsAlreadyAdded.length) {
        setPersons(persons.concat({ name: newName }))
        setNewName('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={ addPerson }>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
    </div>
  );
}

export default App;
