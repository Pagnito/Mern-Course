import { FETCH_ARTICLES } from "../actions/types";

const initialState = {
	articles: {}
};
export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_ARTICLES:
			return {
				...state,
				articles: action.payload
			};

		default:
			return state;
	}
}
