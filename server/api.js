'use strict'
// MARK: Definitions
const express			= require('express')
const router			= express.Router()
const config			= require('../config/config.json')
var Twitter				= require('twitter')

let client = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	bearer_token: config.bearer_token
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

// MARK: - /
router.all('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: 'Welcome'
	})
})

// MARK: Export
module.exports = router

