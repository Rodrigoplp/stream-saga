import React, { Component } from "react"
import { connect } from "react-redux"
import { getData } from "../actions/index"

export class Post extends Component {
  componentDidMount() {
    this.props.getData()
  }

  render() {
		let cand = this.props.candidate === undefined ? 'Not set' : this.props.candidate

		return (
			<div>
				<p>Candidate: {cand}</p>
				<ul className="list-group list-group-flush">
        {this.props.articles.map(el => (
          <li className="list-group-item" key={el.id}>
						<p>{el.title}</p>
          </li>
        ))}
			</ul>
		</div>
		)
  }
}

function mapStateToProps(state) {
  return {
		articles: state.remoteArticles.slice(0, 10),
		candidate: state.candidate
  }
}

export default connect(
  mapStateToProps,
  { getData }
)(Post)
