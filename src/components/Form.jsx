// MARK: Definitions
import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { addArticle } from "../actions/index"
import { setCandidate } from "../actions/index"
import './Form.css'

export function ConnectedForm(props) {
	// MARK: State
	let [selected, setSelected] = useState('')
	let { candidate, setCandidate } = props

	// MARK: Effects
	// MARK: - Set Clinton as initial candidate
	useEffect(() => {
		setCandidate('Hillary Clinton')
		setSelected('Hillary Clinton')
	}, [setCandidate])

	// MARK: - Set candidate when user clicks on button
	useEffect(() => {
		setCandidate(selected)
	})

	// MARK: Actions
	let clickTrump = () => {
		setSelected('Donald Trump')
	}

	let clickHillary = () => {
		setSelected('Hillary Clinton')
	}

	// MARK: Return
	return (
		<div className='form'>
			<button className={selected === 'Donald Trump' ? 'clicked' : null} onClick={clickTrump}>Donald Trump</button>
			<button className={selected === 'Hillary Clinton' ? 'clicked' : null} onClick={clickHillary}>Hillary Clinton</button>

			<p>{candidate}</p>
		</div>
	)
}

// MARK: Redux
function mapDispatchToProps(dispatch) {
  return {
		addArticle: article => dispatch(addArticle(article)),
		setCandidate: candidate => dispatch(setCandidate(candidate))
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form
