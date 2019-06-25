import { takeEvery, call, put, all, take, actionChannel } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import openSocket from 'socket.io-client'

export default function* watcherSaga() {
	yield all([
		workerHillaryStream(),
		workerTrumpStream()
	])
}

// Hillary worker
function* workerHillary() {
	yield takeEvery('DATA_HILLARY_REQUESTED', workerHillarySaga)
}

function* workerHillarySaga() {
	try {
		const payload = yield call(getHillaryData)
		yield put({ type: 'DATA_LOADED', payload })
	} catch (e) {
		yield put({ type: 'API_ERRORED', payload: e })
	}
}

function getHillaryData() {
	return fetch('http://localhost:3030/api/twitter?hashtag=Hillary%20Clinton')
		.then(response => response.json())
}

// Trump worker
function* workerTrump() {
	yield takeEvery('DATA_TRUMP_REQUESTED', workerTrumpSaga) // listenServerSaga
}

function* workerTrumpSaga() {
	try {
		const payload = yield call(getTrumpData)
		yield put({ type: 'DATA_LOADED', payload })
	} catch (e) {
		yield put({ type: 'API_ERRORED', payload: e })
	}
}

function getTrumpData() {
	socket.disconnect()
	return fetch('http://localhost:3030/api/twitter?hashtag=Donald%20Trump')
		.then(response => response.json())
}



// ---------- Stream ----------------
const socketServerURL = 'http://localhost:3030'
let socket

// Hillary
function* workerHillaryStream() {
	yield takeEvery('DATA_HILLARY_REQUESTED', listenHillarySaga)
}

// wrapping function for socket.on
const connectHillary = () => {
	if (typeof socket !== 'undefined') {
		socket.disconnect()
	}
	socket = openSocket(socketServerURL + '/hillary')
	return new Promise((resolve) => {
		socket.on('connect', () => {
			resolve(socket)
		})
	})
}

// This is how a channel is created
const createSocketChannel = (socket, tweet)=> eventChannel((emit) => {
	const handler = (data) => {
		emit(data)
	};
	socket.on('tweet', handler);
	return () => {
		socket.off('tweet', handler)
	};
});

// saga that listens to the socket and puts the new data into the reducer
const listenHillarySaga = function* () {
	// connect to the server
	const socket = yield call(connectHillary)

	// then create a socket channel
	const socketChannel = yield call(createSocketChannel, socket)

	// then put the new data into the reducer
	while (true) {
		const payload = yield take(socketChannel)
		yield put({type: 'DATA_LOADED_TO_HILLARY', payload})
	}
}

// Trump
function* workerTrumpStream() {
	yield takeEvery('DATA_TRUMP_REQUESTED', listenTrumpSaga)
}

// wrapping function for socket.on
const connectTrump = () => {
	if (typeof socket !== 'undefined') {
		socket.disconnect()
	}
	socket = openSocket(socketServerURL + '/trump')
	return new Promise((resolve) => {
		socket.on('connect', () => {
			resolve(socket)
		})
	})
}

// saga that listens to the socket and puts the new data into the reducer
const listenTrumpSaga = function* () {
	// connect to the server
	const socket = yield call(connectTrump)

	// then create a socket channel
	const socketChannel = yield call(createSocketChannel, socket)

	// then put the new data into the reducer
	while (true) {
		const payload = yield take(socketChannel)
		yield put({type: 'DATA_LOADED_TO_TRUMP', payload})
	}
}
