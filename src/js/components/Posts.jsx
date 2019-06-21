import React, { Component } from "react"
import { connect } from "react-redux"
import { getHillaryData } from "../actions/index"
import { getTrumpData } from "../actions/index"

export class Post extends Component {
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.candidate !== this.props.candidate) {
			if (nextProps.candidate === 'Hillary Clinton') {
				this.props.getHillaryData()
			}
			else if (nextProps.candidate === 'Donald Trump'){
				this.props.getTrumpData()
			}
		}
	}

	render() {
		let cand = this.props.candidate === undefined ? 'Not set' : this.props.candidate

		return (
			<div>
				<p>@{cand}</p>
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
	{ getHillaryData, getTrumpData }
)(Post)
