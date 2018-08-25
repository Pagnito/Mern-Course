import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import ErrorsReducer from './errors-reducer';
import ProfileReducer from './profile-reducer';
import PostsReducer from './posts-reducer';
export default combineReducers({
	auth: AuthReducer,
	errors: ErrorsReducer,
	profile: ProfileReducer,
	posts: PostsReducer
});
