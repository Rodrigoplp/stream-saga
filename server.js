'use strict'

const express				= require('express')
const app						= express()
const http					= require('http').createServer(app)
const io						= require('socket.io')(http)
const cors					= require('cors')
const port					= 3030
const env						= process.env.NODE_ENV || 'dev'
const bodyparser		= require('body-parser')
const path					= require('path')
const	apiRoutes			= require('./server/api.js')
const config				= require('./config/config.json')
var Twitter					= require('twitter')

let streamClient = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
})

// Bodyparser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Cors
app.use(cors())

// Routing
app.use('/api', apiRoutes)

// Socket
var hillary = io.of('hillary').on('connection', (socket) => {
	console.log('User connected to Hillary')

	let stream1 = streamClient.stream('statuses/filter', {track: 'Hillary%20Clinton'})

	stream1.on('data', function(tweet) {
		hillary.emit('tweet', tweet)
	})
	stream1.on('error', function(error) {
		console.log(error)
	})

	socket.on('disconnect', () => {
		stream1.destroy()
		console.log('User disconnected')
	})
})

var trump= io.of('trump').on('connection', (socket) => {
	console.log('User connected to Trump')

	let stream1 = streamClient.stream('statuses/filter', {track: 'Donald%20Trump'})

	stream1.on('data', function(tweet) {
		trump.emit('tweet', tweet)
	})
	stream1.on('error', function(error) {
		console.log(error)
	})

	socket.on('disconnect', () => {
		stream1.destroy()
		console.log('User disconnected')
	})
})

http.listen(port, () => console.log(`Server listening on port ${port}`))

