import React, { useState } from 'react';

function App() {
  const [ persons, setPersons ] = useState([
    { 
      name: 'José Lastra',
      phone: '981570911'
    }
  ])
  const [ newName, setNewName] = useState('')
  const [ newPhone, setNewPhone] = useState('')
  const nameIsAlreadyAdded = persons.filter((x) => x.name === newName)
  const handleNameChange = (event) => {
    return setNewName(event.target.value);
  }
  const handlePhoneChange = (event) => {
    return setNewPhone(event.target.value);
  }
  const addPerson = (event) => {
    event.preventDefault()
    if (!nameIsAlreadyAdded.length) {
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


  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={ addPerson }>
        <div>
          name: <input value={ newName } onChange={ handleNameChange }/>
        </div>
        <div>
          phone: <input value={ newPhone } onChange={ handlePhoneChange }/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((x) => <div>{`${x.name} ${x.phone}`}</div>)}
      </ul>
    </div>
  );
}

export default App;
