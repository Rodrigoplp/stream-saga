import { takeEvery, call, put, all } from 'redux-saga/effects'

export default function* watcherSaga() {
	yield all([
		worker(),
		workerHillary(),
		workerTrump()
	])
}

// Data worker
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

function getData() {
	return fetch("https://jsonplaceholder.typicode.com/posts").then(response =>
		response.json()
	)
}

// Hillary worker
function* workerHillary() {
	yield takeEvery("DATA_HILLARY_REQUESTED", workerHillarySaga)
}

function* workerHillarySaga() {
	try {
		const payload = yield call(getHillaryData)
		yield put({ type: "DATA_LOADED", payload })
	} catch (e) {
		yield put({ type: "API_ERRORED", payload: e })
	}
}

function getHillaryData() {
	return fetch("http://localhost:3030/api/twitter?hashtag=Hillary%20Clinton").then(response =>
		response.json()
	)
}

// Trump worker
function* workerTrump() {
	yield takeEvery("DATA_TRUMP_REQUESTED", workerTrumpSaga)
}

function* workerTrumpSaga() {
	try {
		const payload = yield call(getTrumpData)
		yield put({ type: "DATA_LOADED", payload })
	} catch (e) {
		yield put({ type: "API_ERRORED", payload: e })
	}
}

function getTrumpData() {
	return fetch("http://localhost:3030/api/twitter?hashtag=Donald%20Trump").then(response =>
		response.json()
	)
}
