import { GET_POSTS, UPDATE_POSTS } from '../actions/types';

const initialState = {
	posts: [],
	post: {},
	articles: [],
	loading: false
};
export default function(state = initialState, action) {
	switch (action.type) {
		case UPDATE_POSTS:
			return {
				...state,
				posts: action.payload
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload.posts,
				articles: action.payload.articles,
				loading: false
			};

		default:
			return state;
	}
}
