const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user-model');

const ProfileSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name: String,
	avatar: String,
	userName: String,
	handle: {
		type: String,
		required: true,
		max: 40
	},
	company: {
		type: String
	},
	website: {
		type: String
	},
	location: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	skills: {
		type: [String],
		required: true
	},
	bio: {
		type: String
	},
	githubUserName: {
		type: String
	},
	experience: [
		{
			title: {
				type: String
			},
			company: {
				type: String
			},
			location: {
				type: String
			},
			from: {
				type: String
			},
			to: {
				type: String
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	education: [
		{
			school: {
				type: String,
				required: true
			},
			fieldOfStudy: {
				type: String,
				required: true
			},
			degree: {
				type: String
			},
			from: {
				type: String,
				required: true
			},
			to: {
				type: String
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	social: {
		youtube: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedIn: {
			type: String
		},
		tumblr: {
			type: String
		},
		instagram: {
			type: String
		},
		twitter: {
			type: String
		}
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
