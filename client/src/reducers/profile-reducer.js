import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_PROFILES
} from '../actions/types';

const initialState = {
	profile: {},
	profiles: [],
	loading: false
};
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PROFILES:
			return {
				...state,
				profiles: action.payload,
				loading: false
			};
		case PROFILE_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_PROFILE:
			return {
				...state,
				profile: action.payload,
				loading: false
			};
		case CLEAR_CURRENT_PROFILE: {
			return {
				...state,
				profile: {}
			};
		}
		default:
			return state;
	}
}
