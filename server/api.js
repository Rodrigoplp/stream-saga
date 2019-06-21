'use strict'
// MARK: Definitions
const express			= require('express')
const router			= express.Router()
const https				= require('https')
const config			= require('../config/config.json')
var Twitter				= require('twitter')

let client = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	bearer_token: config.bearer_token
})

let streamClient = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
})

// MARK: Routes
// MARK: - /twitter
router.get('/twitter', (req, res) => {
	client.get('search/tweets', {q: req.query.hashtag, count: 5}, function(error, tweets, response) {
		if (error === null) {
			res.status(200).json({
				success: true,
				message: tweets
			})
		}
		else {
			console.log('Error ' + JSON.stringify(error, 0, 2))
			res.status(400).json({
				success: false,
				message: error
			})
		}
	})
})

// MARK: - /stream
router.get('/stream', (req, res) => {
	streamClient.stream('statuses/filter', {track: req.query.hashtag},  function(stream) {
		stream.on('data', function(tweet) {
			res.status(200).json({
				success: true,
				message: tweets
			})
		})

		stream.on('error', function(error) {
			console.log('Error ' + JSON.stringify(error, 0, 2))
			res.status(400).json({
				success: false,
				message: error
			})
		})
	})
})

// MARK: - /
router.all('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Welcome'
	})
})

// MARK: Export
module.exports = router

