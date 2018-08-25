import { GET_POSTS, UPDATE_POSTS, DELETE_POST, GET_LANDING } from '../actions/types';

const initialState = {
	posts: [],
	articles: [],
	loading: false
};
export default function(state = initialState, action) {
	switch (action.type) {
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload)
			};
		case UPDATE_POSTS:
			return {
				...state,
				posts: action.payload
			};
		case GET_LANDING:
			return {
				...state,
				posts: action.payload.posts,
				articles: action.payload.articles,
				loading: false
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				articles: []
			};

		default:
			return state;
	}
}
