const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const Profile = require('../../models/profile-model');
const User = require('../../models/user-model');
const jwt = require('jsonwebtoken');

const validateProfileInput = require('../../validation/profile-validation');
const validateExperienceInput = require('../../validation/experience-validation');
const validateEducationInput = require('../../validation/education-validation');
///get current users Profile

//get all profiles//public
router.get('/all', (req, res) => {
	Profile.find()
		.then((profiles) => {
			if (!profiles) {
				return res.status(404).json({ error: 'No profiles' });
			}
			res.json(profiles);
		})
		.catch((err) => res.status(404).json({ error: 'No Profiles' }));
});

///get profile by id//public route
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({ userId: req.params.user_id })
		//.populate("userId", [("avatar", "userName")])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json({ error: 'There is no profile for this user' }));
});
//get profile by handle//public route

router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		//.populate("userId", [("avatar", "userName")])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};

	Profile.findOne({ userId: req.user.id })
		//.populate("userId", ["avatar", "userName"])
		.then((profile) => {
			if (!profile) {
				errors.noProfile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});
///edit or create profile

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const profileFields = {};
	profileFields.userId = req.user.id;
	profileFields.avatar = req.user.avatar;
	profileFields.userName = req.user.userName;

	if (req.body.handle) {
		profileFields.handle = req.body.handle;
	}

	if (req.body.name) profileFields.name = req.body.name;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;
	////skills split into an array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}
	////social
	profileFields.social = {};

	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.tumblr) profileFields.social.tumblr = req.body.tumblr;
	if (req.body.linkedIn) profileFields.social.linkedIn = req.body.linkedIn;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile.findOne({ userId: req.user.id }).then((profile) => {
		if (profile) {
			Profile.findOneAndUpdate(
				{ userId: req.user.id },
				{ $set: profileFields },
				{ new: true }
			).then((profile) => {
				res.json(profile);
			});
		} else {
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'That Handle already exists';
					res.status(400).json(errors);
				}
				new Profile(profileFields).save().then((profile) => {
					res.json(profile);
				});
			});
		}
	});
});
////delete experience route///private route
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const profile = await Profile.findOne({ userId: req.user.id });
			const removeIndex = profile.experience.map((item) => {
				return item.id.indexOf(req.params.exp_id);
			});
			profile.experience.splice(removeIndex, 1);

			await profile.save();

			res.json(profile);
		} catch (err) {
			res.json({ error: 'u dummy' });
		}
	}
);

//add experience to profile//private router

router.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const { isValid, errors } = validateExperienceInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	try {
		const profile = await Profile.findOne({ userId: req.user.id });
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			location: req.body.location,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};
		profile.experience.unshift(newExp);

		await profile.save();

		res.json(profile);
	} catch (err) {
		res.json({ error: 'u dummy' });
	}
});

///add profile education///private route
router.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const { isValid, errors } = validateEducationInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	try {
		const profile = await Profile.findOne({ userId: req.user.id });
		const newEdu = {
			school: req.body.school,
			fieldOfStudy: req.body.fieldOfStudy,
			degree: req.body.degree,
			from: req.body.from,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};
		profile.education.unshift(newEdu);

		await profile.save();

		res.json(profile);
	} catch (err) {
		res.json({ error: 'u dummy' });
	}
});

//delete profile education //private router
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const profile = await Profile.findOne({ userId: req.user.id });
			const removeIndex = profile.education
				.map((item) => {
					return item.id;
				})
				.indexOf(req.params.edu_id);

			profile.education.splice(removeIndex, 1);
			await profile.save();

			res.json(profile);
		} catch (err) {
			res.json({ error: 'u dummy' });
		}
	}
);

///account--user and profile--private route

router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const profile = await Profile.findOneAndRemove({ userId: req.user.id });
		const user = await User.findOneAndRemove({ _id: req.user.id });
		res.json('Your Account is never really gone >:)');
	} catch (err) {
		res.json({ error: 'cant do it son son' });
	}
});
module.exports = router;
