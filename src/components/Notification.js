import React from 'react'


const Notification = ({ message }) => {
	if (message === null) {
		return null
	}
	const success = {
		backgroundColor: '#FFF',
		padding: '5px 10px',
		color: 'green',
		border: 'solid 1px green',
		fontStyle: 'italic',
		fontSize: '16px',
		borderRadius: '15px'
	}
	return (
		<div style={ success }>
			<p>{ message }</p>
		</div>
	)
}


export default Notification