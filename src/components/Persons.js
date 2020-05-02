import React from 'react'
import shortid from 'shortid'


const Persons = ({personFilter, onDelete}) => {
	const liStyle = {
		listSyle: 'none'
	}
	return (
			<ul>
        {personFilter().map((x) => <li key={shortid.generate()} style={liStyle}>{`${x.name} ${x.number}`} <button onClick={() => onDelete(x)}>Delete</button></li>)}
      </ul>
	)
}


export default Persons