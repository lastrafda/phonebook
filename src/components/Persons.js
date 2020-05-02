import React from 'react'
import shortid from 'shortid'


const Persons = ({personFilter}) => {
	const liStyle = {
		listSyle: 'none'
	}
	return (
			<ul>
        <li>{personFilter().map((x) => <li key={shortid.generate()} style={liStyle}>{`${x.name} ${x.number}`}</li>)}</li>
      </ul>
	)
}


export default Persons