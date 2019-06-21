import React, { Component } from "react"
import { connect } from "react-redux"
import { getData } from "../actions/index"
import { getHillaryData } from "../actions/index"
import { getTrumpData } from "../actions/index"

export class Post extends Component {
  componentDidMount() {
    // this.props.getData()
		if (this.props.candidate === 'Hilary Clinton') {
			this.props.getHillaryData()
		}
		else {
			this.props.getTrumpData()
		}
  }

  render() {
		let cand = this.props.candidate === undefined ? 'Not set' : this.props.candidate

		return (
			<div>
				<p>Candidate: {cand}</p>
				<ul className="list-group list-group-flush">
        {this.props.articles.map(el => (
					<li className="list-group-item" key={el.id_str}>
						<p>{el.created_at}</p>
						<p>{el.text}</p>
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
  { getData, getHillaryData, getTrumpData }
)(Post)
