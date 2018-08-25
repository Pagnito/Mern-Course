import { GET_ERRORS, SET_CURRENT } from './types';
import axios from 'axios';
import setAuthToken from '../utils/set-token';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => {
	return function(dispatch) {
		axios
			.post('/api/users/register', userData)
			.then((res) => {
				history.push('/login');
			})
			.catch((err) => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				});
			});
	};
};

export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/users/login', userData)
		.then((res) => {
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			setAuthToken(token);
			const decoded = jwt_decode(token);

			dispatch({
				type: SET_CURRENT,
				payload: decoded
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
export const logoutUser = (dispatch) => {
	localStorage.removeItem('jwtToken');
	setAuthToken(false);
	dispatch({
		type: SET_CURRENT,
		payload: {}
	});
};
