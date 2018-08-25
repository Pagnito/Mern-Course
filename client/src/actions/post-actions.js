import axios from 'axios';
import {
	DELETE_POST,
	ADD_POST,
	GET_ERRORS,
	GET_POSTS,
	PROFILE_LOADING,
	UPDATE_POSTS,
	GET_LANDING
} from './types';

export const getPosts = (dispatch) => {
	axios
		.get('/api/posts')
		.then((res) => {
			dispatch({
				type: GET_POSTS,
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

export const likePost = (id) => (dispatch) => {
	axios
		.post(`/api/posts/like/${id}`)
		.then((res) => {
			dispatch({
				type: UPDATE_POSTS,
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
export const unlikePost = (id) => (dispatch) => {
	axios
		.post(`/api/posts/unlike/${id}`)
		.then((res) => {
			dispatch({
				type: UPDATE_POSTS,
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
export const postComment = (comment, id) => (dispatch) => {
	axios
		.post(`/api/posts/comment/${id}`, comment)
		.then((res) => {
			dispatch({
				type: UPDATE_POSTS,
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
export const deleteComment = (postId, id) => (dispatch) => {
	axios
		.delete(`/api/posts/comment/${postId}/${id}`)
		.then((res) => {
			dispatch({
				type: UPDATE_POSTS,
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

export const addPost = (post, hideForm) => (dispatch) => {
	axios
		.post('/api/posts', post)
		.then((res) => {
			hideForm();
			dispatch({
				type: UPDATE_POSTS,
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

export const deletePost = (id) => (dispatch) => {
	axios
		.delete(`/api/posts/${id}`)
		.then((res) => {
			dispatch({
				type: DELETE_POST,
				payload: id
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
};

const articleURL =
	'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=hacker+news?&api-key=d7b017f7b6e544e4be073c19eea0e88e';
export const getLandingPage = () => (dispatch) => {
	dispatch(setProfileLoading());

	axios.get(articleURL).then((articles) => {
		axios.get('/api/posts').then((posts) => {
			dispatch({
				type: GET_LANDING,
				payload: {
					articles: articles.data.response.docs,
					posts: posts.data
				}
			});
		});
	});
};
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};
