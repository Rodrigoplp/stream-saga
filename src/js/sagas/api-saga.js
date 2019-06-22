import { takeEvery, call, put, all/*, take*/ } from 'redux-saga/effects'
// import { io, eventChannel } from 'redux-saga'

export default function* watcherSaga() {
	yield all([
		workerHillary(),
		workerTrump()
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
	return fetch('http://localhost:3030/api/twitter?hashtag=Donald%20Trump')
		.then(response => response.json())
}





// ---------- Stream ----------------
	/*
const socketServerURL = 'http://localhost:3030/api/stream?hashtag=space'
let socket;

wrapping function for socket.on
const connect = () => {
	socket = io(socketServerURL);
	return new Promise((resolve) => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
};

// This is how a channel is created
const createSocketChannel = socket => eventChannel((emit) => {
	const handler = (data) => {
		emit(data);
	};
	socket.on('newTask', handler);
	return () => {
		socket.off('newTask', handler);
	};
});

// saga that listens to the socket and puts the new data into the reducer
const listenServerSaga = function* () {
	// connect to the server
	const socket = yield call(connect);

	// then create a socket channel
	const socketChannel = yield call(createSocketChannel, socket);

	// then put the new data into the reducer
	while (true) {
		const payload = yield take(socketChannel);
		yield put({type: 'DATA_LOADED', payload});
	}
}
*/
