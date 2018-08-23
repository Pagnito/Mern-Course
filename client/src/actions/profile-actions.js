import axios from 'axios';

import {
	GET_PROFILE,
	PROFILE_LOADING,
	GET_ERRORS,
	SET_CURRENT,
	CLEAR_CURRENT_PROFILE,
	GET_PROFILES
} from './types';

export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_PROFILE,
				payload: {}
			});
		});
};
export const addEducation = (eduData, hideEduForm) => (dispatch) => {
	axios
		.post('api/profile/education', eduData)
		.then((res) => {
			hideEduForm();
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
export const addExperience = (expData, hideExpForm) => (dispatch) => {
	axios
		.post('api/profile/experience', expData)
		.then((res) => {
			hideExpForm();
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
export const deleteEducation = (id) => (dispatch) => {
	axios
		.delete(`api/profile/education/${id}`)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
export const deleteExperience = (id) => (dispatch) => {
	axios
		.delete(`api/profile/experience/${id}`)
		.then((res) => {
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};
export const createProfile = (userData, history) => (dispatch) => {
	axios
		.post('/api/profile', userData)
		.then((res) => history.push('/dashboard'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const deleteAccount = (history) => (dispatch) => {
	if (window.confirm('Are you sure you want to delete your account?')) {
		axios
			.delete('/api/profile/')
			.then((res) => {
				dispatch({
					type: SET_CURRENT,
					payload: {}
				});
				localStorage.removeItem('jwtToken');
				clearProfile();
				history.push('/');
			})
			.catch((err) => {
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				});
			});
	}
};
export const getProfiles = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then((res) => {
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_PROFILES,
				payload: null
			});
		});
};
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};
export const clearProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
