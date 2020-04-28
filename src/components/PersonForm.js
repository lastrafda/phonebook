import React from 'react'


const PersonForm = ({ addPerson, newName, newNumber, handleNumberChange, handleNameChange}) => {
	return (
		<div>
			<form onSubmit={ addPerson }>
        <div>
          Name: <input value={ newName } onChange={ handleNameChange }/>
        </div>
        <div>
          Number: <input value={ newNumber } onChange={ handleNumberChange }/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
		</div>
	)
}


export default PersonForm