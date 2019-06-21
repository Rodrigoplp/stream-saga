'use strict'

const express				= require('express')
const app						= express()
const port					= 3030
const env						= process.env.NODE_ENV || 'dev'
const bodyparser		= require('body-parser')
const path					= require('path')
const	apiRoutes			= require('./server/api.js')

// Bodyparser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Cors
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

// Routing
app.use('/api', apiRoutes)

app.listen(port, () => console.log(`Server listening on port ${port}`))

