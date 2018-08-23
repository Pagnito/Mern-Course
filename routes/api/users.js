const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/user-model");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validation/register-validation");
const validateLoginInput = require("../../validation/login-validation");

router.post("/register", (req, res) => {
	const validation = validateRegisterInput(req.body);
	if (!validation.isValid) {
		return res.status(400).json(validation.errors);
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			return res.status(400).json({ email: "Email already exists" });
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: "200", //size
				r: "pg", //rating
				d: "mm" //Default
			});
			const newUser = new User({
				userName: req.body.userName,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) {
						console.log(err);
					}
					newUser.password = hash;
					newUser
						.save()
						.then((user) => res.json(user))
						.catch((err) => console.log(err));
				});
			});
		}
	});
});
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//login users==returning jwt token
router.post("/login", (req, res) => {
	const validation = validateLoginInput(req.body);
	if (!validation.isValid) {
		return res.status(400).json(validation.errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email }).then((user) => {
		if (!user) {
			return res.status(404).json({ email: "User not found" });
		}
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user.id,
					email: user.email,
					avatar: user.avatar,
					userName: user.userName
				};
				jwt.sign(payload, keys.jwtSecret, { expiresIn: "12h" }, (err, token) => {
					res.json({
						success: true,
						token: "Bearer " + token
					});
				});
			} else {
				return res.status(400).json({ password: "Password Incorrect" });
			}
		});
	});
});
//return current user
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
	res.json({
		email: req.user.email,
		userName: req.user.userName,
		avatar: req.user.avatar,
		id: req.user.id
	});
});
module.exports = router;
