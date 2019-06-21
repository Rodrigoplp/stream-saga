import { ADD_ARTICLE } from "../constants/action-types"
import { SET_CANDIDATE } from "../constants/action-types"

export function setCandidate(payload) {
	return { type: SET_CANDIDATE, payload }
}

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
}

export function getData() {
  return { type: "DATA_REQUESTED" }
}
