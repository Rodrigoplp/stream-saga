import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getHillaryData } from "../actions/index"
import { getTrumpData } from "../actions/index"

export function Post(props) {
	let { articlesTrump, articlesHillary, candidate, getHillaryData, getTrumpData } = props

	// Fetch tweets when user clicks on candidate's button
	useEffect(() => {
		if (candidate === 'Hillary Clinton') {
			getHillaryData()
		}
		else if (candidate === 'Donald Trump') {
			getTrumpData()
		}
	}, [candidate, getHillaryData, getTrumpData])

	let cand = candidate === undefined ? 'Not set' : candidate

	return (
		<div>
			<p>@{cand}</p>

			{cand === 'Hillary Clinton' && (
				<div>
					<ul className="list-group list-group-flush">
						{articlesHillary.map(el => (
							<li className="list-group-item" key={el.id_str}>
								<p>{el.created_at}</p>
								<p>{el.text}</p>
							</li>
						))}
					</ul>
				</div>
			)}

			{cand === 'Donald Trump' && (
				<div>
					<ul className="list-group list-group-flush">
						{articlesTrump.map(el => (
							<li className="list-group-item" key={el.id_str}>
								<p>{el.created_at}</p>
								<p>{el.text}</p>
							</li>
						))}
					</ul>
				</div>
			)}

		</div>
	)
}

function mapStateToProps(state) {
	return {
		articlesHillary: state.remoteArticlesHillary.slice(0, 10),
		articlesTrump: state.remoteArticlesTrump.slice(0, 10),
		candidate: state.candidate
	}
}

export default connect(
	mapStateToProps,
	{ getHillaryData, getTrumpData }
)(Post)
