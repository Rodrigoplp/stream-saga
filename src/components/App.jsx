import React from 'react'
import Form from './Form'
import Post from './Posts'

export default function App() {
	return (
		<div className = 'row mt-5'>

			<div className = 'col-md-4 offset-md-1'>
				<h2>Choose a candidate</h2>
				<Form />
			</div>

			<div className="col-md-4 offset-md-1">
				<h2>Latest tweets</h2>
				<Post />
			</div>

		</div>
	)
}
