import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import Profiles from './components/profiles/profiles';
import { SET_CURRENT } from './actions/types';
import setAuthToken from './utils/set-token';
import store from './store';
import Landing from './components/Landing';
import Header from './components/header/header';
import Footer from './components/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard';
import CreateProfile from './components/create-profile';
import EditProfile from './components/editProfile';
import './App.css';
import './styles/noMaze.css';
if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch({
		type: SET_CURRENT,
		payload: decoded
	});
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		localStorage.removeItem('jwtToken');
		setAuthToken(false);
		store.dispatch({
			type: SET_CURRENT,
			payload: {}
		});
	}
}
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className="App">
						<Header />

						<Route exact path="/" component={Landing} />
						<Route exact path="/profiles" component={Profiles} />
						<Route exact path="/createProfile" component={CreateProfile} />
						<Route exact path="/editProfile" component={EditProfile} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Footer />
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
