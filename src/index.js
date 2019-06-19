import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import { Provider } from 'react-redux'
import store from './js/store/index'
import App from './js/components/App.jsx'
import * as serviceWorker from './serviceWorker'
import { addArticle } from "./js/actions/index"

window.store = store
window.addArticle = addArticle

ReactDOM.render(
	<Provider	store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

