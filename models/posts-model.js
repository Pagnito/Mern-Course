const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	reactionTo: {
		type: String
	},
	text: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	userName: {
		type: String
	},
	likes: [
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	comments: [
		{
			userId: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			},
			text: {
				type: String,
				required: true
			},
			userName: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});
module.exports = Post = mongoose.model('posts', PostsSchema);
