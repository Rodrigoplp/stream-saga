import { takeEvery, call, put, all } from 'redux-saga/effects'

export default function* watcherSaga() {
	yield all([
		worker(),
		workerHillary(),
		workerTrump()
	])
}

function* worker() {
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

function* workerHillary() {
	yield takeEvery("DATA_TRUMP_REQUESTED", workerTrumpSaga)
}

function* workerHillarySaga() {
	try {
		const payload = yield call(getHillaryData)
		yield put({ type: "DATA_LOADED", payload })
	} catch (e) {
		yield put({ type: "API_ERRORED", payload: e })
	}
}

function* workerTrump() {
	yield takeEvery("DATA_HILLARY_REQUESTED", workerHillarySaga)
}

function* workerTrumpSaga() {
	try {
		const payload = yield call(getTrumpData)
		yield put({ type: "DATA_LOADED", payload })
	} catch (e) {
		yield put({ type: "API_ERRORED", payload: e })
	}
}

function getData() {
	return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
		response.json()
	)
}

function getHillaryData() {
	return fetch("http://localhost:3030/api/twitter?hashtag=Hillary%20Clinton").then(res1 =>
		res1.json()
	)
}

function getTrumpData() {
	return fetch("http://localhost:3030/api/twitter?hashtag=Donald%20Trump").then(res1 =>
		res1.json()
	)
}
