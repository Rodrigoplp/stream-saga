import { takeEvery, call, put } from "redux-saga/effects"

export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga)
}

function* workerSaga() {
  try {
    const payload = yield call(getData)
    yield put({ type: "DATA_LOADED", payload })
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e })
  }
}

function getData() {
	// const token = 'token'

	// let myHeaders = new Headers({
	// 	'Content-Type': 'text/plain',
	// 	'Content-Length': content.length.toString(),
	// 	'X-Custom-Header': 'ProcessThisImmediately',
	// 	Authorization: `OAuth ${token}`
	// })

	// let heads = {
	// 	authorization: 'OAuth oauth_consumer_key="consumer-key-for-app"',
	// 	oauth_nonce="generated-nonce",
	// 	oauth_signature="generated-signature",
	// 	oauth_signature_method="HMAC-SHA1",
	// 	oauth_timestamp="generated-timestamp",
	// 	oauth_token="access-token-for-authed-user",
	// 	oauth_version="1.0"
	// }

	// let config = {
	// 	method: 'GET',
	// 	headers: myHeaders,
	// }

	// let url = 'https://api.twitter.com/1.1/search/tweets.json?q=from%3Atwitterdev&result_type=mixed&count=2'

	// return fetch(url, config).then(response => {
	// 	console.log(response)
	// 	response.json()
	// })

  return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
    response.json()
  )
}
