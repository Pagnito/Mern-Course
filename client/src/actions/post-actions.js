import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, PROFILE_LOADING, UPDATE_POSTS } from './types';

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

const articleURL =
	'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=hacker+news?&api-key=d7b017f7b6e544e4be073c19eea0e88e';
export const getLandingPage = () => (dispatch) => {
	dispatch(setProfileLoading());

	axios.get(articleURL).then((articles) => {
		axios.get('/api/posts').then((posts) => {
			dispatch({
				type: GET_POSTS,
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
