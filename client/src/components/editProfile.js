import React, { Component } from 'react';
//import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount, createProfile } from '../actions/profile-actions';
import '../styles/dashboard.css';
import '../styles/editProfile.css';
import NoProfileDash from './no-profile-dash';
import { isEmpty } from '../utils/isEmpty';

export class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			userName: '',
			name: '',
			status: '',
			handle: '',
			company: '',
			bio: '',
			location: '',
			website: '',
			skills: '',
			githubUserName: '',
			twitter: '',
			facebook: '',
			tumblr: '',
			linkedIn: '',
			youtube: '',
			instagram: '',
			errors: {}
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onChangeSkill = (e) => {
		const skills = this.state.skills;
		skills.splice(e.target.id, 1, e.target.value);
		this.setState({ skills: skills });
	};
	componentDidUpdate(prevProps) {
		const profile = this.props.profile.profile;
		profile.social = !isEmpty(profile.social) ? profile.social : {};
		profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
		profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
		profile.social.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
		profile.social.tumblr = !isEmpty(profile.social.tumblr) ? profile.social.tumblr : '';
		profile.social.linkedIn = !isEmpty(profile.social.linkedIn) ? profile.social.linkedIn : '';
		profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
		//renders before social key is filled so it is undefined, thus this if statement
		if (prevProps.errors !== this.props.errors) {
			this.setState({ errors: this.props.errors });
			alert('Fill in the required fields');
		}
		if (this.props.profile.profile !== prevProps.profile.profile) {
			this.setState({
				email: this.props.auth.user.email,
				userName: profile.userName,
				name: profile.name,
				status: profile.status,
				handle: profile.handle,
				company: profile.company,
				bio: profile.bio,
				location: profile.location,
				website: profile.website,
				skills: profile.skills,
				githubUserName: profile.githubUserName,
				facebook: profile.social.facebook,
				twitter: profile.social.twitter,
				tumblr: profile.social.tumblr,
				linkedIn: profile.social.linkedIn,
				youtube: profile.social.youtube,
				instagram: profile.social.instagram
			});
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const editedProfile = {
			email: this.state.email,
			userName: this.state.userName,
			name: this.state.name,
			status: this.state.status,
			handle: this.state.handle,
			company: this.state.company,
			bio: this.state.bio,
			location: this.state.location,
			website: this.state.website,
			skills: this.state.skills.join(','),
			githubUserName: this.state.githubUserName,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			tumblr: this.state.tumblr,
			linkedIn: this.state.linkedIn,
			youtube: this.state.youtube,
			instagram: this.state.instagram,
			errors: {}
		};
		this.props.createProfile(editedProfile, this.props.history);
	};

	renderSkills = () => {
		const skillFields = new Array(10).fill('');
		return this.props.profile.profile.skills.map((skill, ind) => {
			skillFields.splice(ind, 1, skill);
		});
		return skillFields.map((skill, key) => {
			return (
				<input
					id={key}
					name="skills"
					onChange={this.onChangeSkill}
					value={skill}
					key={key}
					className="editInput editSkillField requiredField"
					placeholder={!isEmpty(this.state.errors) ? this.state.errors.skills : ''}
				/>
			);
		});
	};

	deleteAccount = () => {
		this.props.deleteAccount(this.props.history);
	};
	componentDidMount() {
		window.scrollTo(0, 0);
		this.props.getCurrentProfile();
	}
	// eslint-disable-line react/prefer-stateless-function
	render() {
		if (this.props.profile.loading) {
			return (
				<div id="loadingContainer">
					<div className="spinner">
						<div className="rect1" />
						<div className="rect2" />
						<div className="rect3" />
						<div className="rect4" />
						<div className="rect5" />
					</div>
				</div>
			);
		}
		if (this.props.auth.isAuthenticated) {
			if (Object.keys(this.props.profile.profile).length === 0) {
				return (
					<div>
						<NoProfileDash />
					</div>
				);
			}
			if (Object.keys(this.props.profile.profile).length > 0) {
				return (
					<div className="dashboard">
						<div className="userInfo">
							<div className="avatar editAvatarPart">
								<img alt="fook u" className="avatarImg" src={this.props.auth.user.avatar} />
								<input
									name="userName"
									onChange={this.onChange}
									value={this.state.userName}
									placeholder="User Name"
									className="editUserName"
								/>
							</div>
							<div className="basicUserInfo">
								<div className="statusAligner">
									<input
										name="status"
										onChange={this.onChange}
										value={this.state.status}
										className="proStatus editStatus requiredField"
										placeholder={
											!isEmpty(this.state.errors)
												? this.state.errors.status
												: 'Status ex: Front-End Developer'
										}
									/>
								</div>
								<div className="basicInfoFlexBox">
									<div className="editBasicInfo1">
										<input
											name="name"
											onChange={this.onChange}
											value={this.state.name}
											className="editInfoField editInput"
											placeholder="Name"
										/>

										<input
											className="editInfoField editInput"
											name="company"
											onChange={this.onChange}
											value={this.state.company}
											placeholder="Company"
										/>

										<input
											name="website"
											onChange={this.onChange}
											value={this.state.website}
											className="editInfoField editInput"
											placeholder="Website"
										/>
										<input
											name="location"
											onChange={this.onChange}
											value={this.state.location}
											className="editInfoField editInput"
											placeholder="Location"
										/>
									</div>
									<div className="editBasicInfo2">
										<input
											name="handle"
											onChange={this.onChange}
											value={this.state.handle}
											className="editInfoField editInput requiredField"
											placeholder={
												!isEmpty(this.state.errors)
													? this.state.errors.handle
													: 'http://www.wedevs.com/Handle'
											}
										/>
										<input
											name="githubUserName"
											onChange={this.onChange}
											value={this.state.githubUserName}
											className="editInfoField editInput"
											placeholder="GitHub User Name"
										/>
									</div>
								</div>
							</div>
							<div className="skills">
								<div className="editSkillTitle">Skills</div>
								{this.renderSkills()}
							</div>

							<div className="bio">
								<textarea
									name="bio"
									onChange={this.onChange}
									value={this.state.bio}
									placeholder="Name"
									className="editBioField"
								/>
							</div>
						</div>

						<div className="profile">
							<div className="education">
								<button className="addEduBtn addBtn" type="button">
									Add Education
								</button>
							</div>
							<div className="experience">
								<button className="addExpBtn addBtn" type="button">
									Add Experience
								</button>
							</div>
							<div className="social">
								<div className="socialEditInpWrap">
									<i className="fab editSocialIcon fa-facebook-f editSocialIcon" />
									<input
										name="facebook"
										onChange={this.onChange}
										value={this.state.facebook}
										className="editInfoField editSocialInput"
										placeholder="Facebook"
									/>
								</div>
								<div className="socialEditInpWrap">
									<i className="fab editSocialIcon fa-tumblr editSocialIcon" />
									<input
										name="tumblr"
										onChange={this.onChange}
										value={this.state.tumblr}
										className="editInfoField editSocialInput"
										placeholder="Tumblr"
									/>
								</div>
								<div className="socialEditInpWrap">
									<i className="fab editSocialIcon fa-instagram editSocialIcon" />
									<input
										name="instagram"
										onChange={this.onChange}
										value={this.state.instagram}
										className="editInfoField editSocialInput"
										placeholder="Instagram"
									/>
								</div>
								<div className="socialEditInpWrap">
									<i className="fab editSocialIcon fa-youtube editSocialIcon" />
									<input
										name="youtube"
										onChange={this.onChange}
										value={this.state.youtube}
										className="editInfoField editSocialInput"
										placeholder="Youtube"
									/>
								</div>
								<div className="socialEditInpWrap">
									<i className="fab editSocialIcon fa-linkedin-in editSocialIcon" />
									<input
										name="linkedIn"
										onChange={this.onChange}
										value={this.state.linkedIn}
										className="editInfoField editSocialInput"
										placeholder="linkedIn"
									/>
								</div>
								<div className="socialEditInpWrap">
									<i className="fab editSocialIcon fa-twitter editSocialIcon" />
									<input
										name="twitter"
										onChange={this.onChange}
										value={this.state.twitter}
										className="editInfoField editSocialInput"
										placeholder="Twitter"
									/>
								</div>
							</div>
						</div>
						<div className="githubRepos">
							<button className="addRepoBtn addBtn" type="button">
								Add GitHub Repos
							</button>
						</div>
						<div className="dashNavBtns">
							<div className="dashDeleteBtns">
								<button className="addBtn" type="button">
									Delete Profile
								</button>
								<button onClick={this.deleteAccount} className=" addBtn" type="button">
									Delete Account
								</button>
							</div>
							<button onClick={this.handleSubmit} className="addBtn" type="submit">
								Done
							</button>
						</div>
					</div>
				);
			}
		} else {
			return <div id="notLoggedInMsg">You are not logged in</div>;
		}
	}
}

/*Dashboard.propTypes = {
	getCurrentProfile: propTypes.func.isRquired,
	auth: propTypes.object.isRquired,
	profile: propTypes.object.isRequired
};*/
function mapStateToProps(state) {
	return {
		auth: state.auth,
		profile: state.profile,
		errors: state.errors
	};
}
export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount, createProfile }
)(withRouter(EditProfile));
