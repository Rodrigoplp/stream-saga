import { ADD_ARTICLE } from '../constants/action-types'
import { SET_CANDIDATE } from '../constants/action-types'

const initialState = {
	articles: [],
	remoteArticles: [],
	candidate: ''
}

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
		return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    })
	}

	else if (action.type === SET_CANDIDATE) {
		return Object.assign({}, state, {
      candidate: action.payload
    })
	}

	else if (action.type === "DATA_LOADED") {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload.message.statuses)
    })
  }

  return state
}

export default rootReducer
