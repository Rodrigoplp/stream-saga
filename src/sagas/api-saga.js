import { takeEvery, call, put, all, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import openSocket from 'socket.io-client'

export default function* watcherSaga() {
	yield all([
		workerHillaryStream(),
		workerTrumpStream()
	])
}

const socketServerURL = 'http://localhost:3030'
let socket

// Create channel
const createSocketChannel = (socket, tweet)=> eventChannel((emit) => {
	const handler = (data) => {
		emit(data)
	}
	socket.on('tweet', handler);
	return () => {
		socket.off('tweet', handler)
	}
})


// ----------- Hillary ------------

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

// ----------- Trump ------------

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
