import React from 'react'
import shortid from 'shortid'


const Persons = ({personFilter}) => {
	return (

			<ul>
        {personFilter().map((x) => <li key={shortid.generate()}>{`${x.name} ${x.number}`}</li>)}
      </ul>
	)
}


export default Persons