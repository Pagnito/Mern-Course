import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from './common/TextFieldGroup';
import SocialLinkTextGroup from './common/SocialLinkTextGroup';
import { createProfile } from '../actions/profile-actions';
import '../styles/create-profile.css';
import { isEmpty } from '../utils/isEmpty';
class CreateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: this.props.auth.user.email,
			userName: this.props.auth.user.userName,
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
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	componentDidUpdate(prevProps) {
		if (this.props.errors !== prevProps.errors) {
			this.setState({ errors: this.props.errors });
		}
		window.scroll(0, 0);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const newProfile = {
			email: this.state.email,
			userName: this.state.userName,
			name: this.state.name,
			status: this.state.status,
			handle: this.state.handle,
			company: this.state.company,
			bio: this.state.bio,
			location: this.state.location,
			website: this.state.website,
			skills: this.state.skills,
			githubUserName: this.state.githubUserName,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			tumblr: this.state.tumblr,
			linkedIn: this.state.linkedIn,
			youtube: this.state.youtube,
			instagram: this.state.instagram,
			errors: {}
		};
		this.props.createProfile(newProfile, this.props.history);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		if (this.props.auth.isAuthenticated) {
			return (
				<div className="createProfileWrappper">
					<form onSubmit={this.handleSubmit} className=" createProfile">
						<div className="profileFields">
							<div id="CreateProTitle">Create Your Profile</div>
							<TextFieldGroup
								name="userName"
								placeholder="User Name"
								type="text"
								value={this.state.userName}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="email"
								placeholder="email"
								type="email"
								value={this.state.email}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="name"
								placeholder="Name"
								type="name"
								value={this.state.name}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="status"
								placeholder={
									!isEmpty(this.state.errors)
										? this.state.errors.status
										: 'Status ex: Front-End Developer'
								}
								type="text"
								value={this.state.value}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="handle"
								placeholder={
									!isEmpty(this.state.errors)
										? this.state.errors.handle
										: 'handle ex: jodi = wedevs.com/jodi'
								}
								type="text"
								value={this.state.handle}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="company"
								placeholder="Company"
								type="text"
								value={this.state.company}
								onChange={this.onChange}
							/>
							<textarea
								className="createBio"
								name="bio"
								placeholder="Bio"
								type="text"
								value={this.state.bio}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="location"
								placeholder="Location"
								type="text"
								value={this.state.location}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="website"
								placeholder="website"
								type="text"
								value={this.state.website}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="skills"
								placeholder={
									!isEmpty(this.state.errors)
										? this.state.errors.skills
										: 'Skills - make sure to seperate by commas'
								}
								type="text"
								value={this.state.skills}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="githubUserName"
								placeholder="Github User Name"
								type="text"
								value={this.state.githubUserName}
								onChange={this.onChange}
							/>
						</div>
						<div className="createProSocialLinks">
							<div id="CreateProSocialTitle">Connect you social network</div>
							<SocialLinkTextGroup
								socialImg={<i className="fab fa-facebook-f socialIcon" />}
								name="facebook"
								placeholder="Facebook Link"
								type="text"
								value={this.state.facebook}
								onChange={this.onChange}
							/>
							<SocialLinkTextGroup
								socialImg={<i className="fab fa-twitter socialIcon" />}
								name="twitter"
								placeholder="Twitter Link"
								type="text"
								value={this.state.twitter}
								onChange={this.onChange}
							/>
							<SocialLinkTextGroup
								socialImg={<i className="fab fa-tumblr socialIcon" />}
								name="tumblr"
								placeholder="Tumblr Link"
								type="text"
								value={this.state.tumblr}
								onChange={this.onChange}
							/>
							<SocialLinkTextGroup
								socialImg={<i className="fab fa-instagram socialIcon" />}
								name="instagram"
								placeholder="Instagram Link"
								type="text"
								value={this.state.instagram}
								onChange={this.onChange}
							/>
							<SocialLinkTextGroup
								socialImg={<i className="fab fa-linkedin-in socialIcon" />}
								name="linkedIn"
								placeholder="LinkedIn Link"
								type="text"
								value={this.state.linkedIn}
								onChange={this.onChange}
							/>
							<SocialLinkTextGroup
								socialImg={<i className="fab fa-youtube socialIcon" />}
								name="youtube"
								placeholder="Youtube Link"
								type="text"
								value={this.state.youtube}
								onChange={this.onChange}
							/>
						</div>
						<button type="submit" id="submitProfile">
							Submit
						</button>
					</form>
				</div>
			);
		} else {
			return <div id="notLoggedInMsg">You are not logged in</div>;
		}
	}
}
CreateProfile.propTypes = {
	profile: propTypes.object.isRequired
};
function mapStateToProps(state) {
	return {
		profile: state.profile,
		errors: state.errors,
		auth: state.auth
	};
}
export default connect(
	mapStateToProps,
	{ createProfile }
)(withRouter(CreateProfile));
