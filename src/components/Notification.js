import React from 'react'


const Notification = ({ message, type }) => {
	if (message === null || type === null) {
		return null
	}
	const styleFactory = (type) => {
		let baseStyle = {
			backgroundColor: '#FFF',
			padding: '5px 10px',
			color: 'black',
			border: 'solid 1px black',
			fontStyle: 'italic',
			fontSize: '16px',
			borderRadius: '15px'
		}
		console.log(type, 'type')
		if (type === 'success') {
			return {...baseStyle, color: 'green', border: 'solid 1px green'}
		}
		return {...baseStyle, color: 'red', border: 'solid 1px red'}
	}
	return (
		<div style={ styleFactory(type) }>
			<p>{ message }</p>
		</div>
	)
}


export default Notification