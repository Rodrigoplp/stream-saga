import React, { Component } from "react"
import { connect } from "react-redux"
import uuidv1 from "uuid"
import { addArticle } from "../actions/index"
import { setCandidate } from "../actions/index"

function mapDispatchToProps(dispatch) {
  return {
		addArticle: article => dispatch(addArticle(article)),
		setCandidate: candidate => dispatch(setCandidate(candidate))
  }
}

class ConnectedForm extends Component {
  constructor() {
    super()

    this.state = {
			title: '',
			candidate: 'Hillary'
    }

    this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.clickTrump = this.clickTrump.bind(this)
		this.clickHilary = this.clickHilary.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { title } = this.state
    const id = uuidv1()

    this.props.addArticle({ title, id })
    this.setState({ title: "" })
	}

	clickTrump(event) {
		event.preventDefault()
		this.props.setCandidate('Donald Trump')
		this.setState({ candidate: 'Donald Trump' })
	}

	clickHilary(event) {
		event.preventDefault()
		this.props.setCandidate('Hillary Clinton')
		this.setState({ candidate: 'Hillary Clinton' })
	}

  render() {
    const { title } = this.state
    return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							className="form-control"
							id="title"
							value={title}
							onChange={this.handleChange}
						/>
					</div>
					<button type="submit" className="btn btn-success btn-lg">
						SAVE
					</button>
				</form>

				<button onClick={this.clickTrump}>Donald Trump</button>
				<button onClick={this.clickHilary}>Hillary Clinton</button>

				<p>{this.state.candidate}</p>
			</div>
		)
	}
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form
