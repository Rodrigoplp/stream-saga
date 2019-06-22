import { ADD_ARTICLE } from '../constants/action-types'
import { SET_CANDIDATE } from '../constants/action-types'
import { DATA_LOADED } from '../constants/action-types'
import { DATA_LOADED_TO_ADD } from '../constants/action-types'

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

	else if (action.type === DATA_LOADED) {
		console.log('Payload: ' + action.payload)
    return Object.assign({}, state, {
      remoteArticles: action.payload.message.statuses
    })
	}

	else if (action.type === DATA_LOADED_TO_ADD) {
		console.log('Payload: ' + action.payload)
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload)
    })
  }

	else if (action.type === "DATA_LOADED_TO_ADD_2") {
    return Object.assign({}, state, {
      remoteArticles: state.remoteArticles.concat(action.payload.message.statuses)
    })
  }

  return state
}

export default rootReducer
