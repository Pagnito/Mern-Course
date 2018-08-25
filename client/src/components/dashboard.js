import React, { Component } from 'react';
//import propTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getCurrentProfile,
	deleteAccount,
	deleteEducation,
	deleteExperience
} from '../actions/profile-actions';
import '../styles/dashboard.css';
import NoProfileDash from './no-profile-dash';
import AddEducation from './add-education';
import AddExperience from './add-experience';
export class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasProfile: ''
		};
	}
	showAddEduForm() {
		document.getElementById('addEdu').classList.remove('dissapear');
		document.getElementById('addEdu').classList.add('appear');
	}
	showAddExpForm() {
		document.getElementById('addExp').classList.remove('dissapear1');
		document.getElementById('addExp').classList.add('appear1');
	}
	deleteEdu = (id) => {
		this.props.deleteEducation(id);
	};
	deleteExp = (id) => {
		this.props.deleteExperience(id);
	};
	renderEducation = () => {
		return this.props.profile.profile.education.map((edu, ind) => {
			let current = edu.current == false ? `To ${edu.to}` : 'Currently Attending';
			return (
				<div key={ind} className="eduThumb">
					<div className="schoolInfoWrap">
						<div className="schoolInfo">
							<span className="schoolField school">{edu.school}</span>
							<span className="schoolField">{edu.fieldOfStudy}</span>
						</div>
						<div className="schoolToFrom">
							<span className="schoolField">From {edu.from}</span>
							<span className="schoolField">{current}</span>
						</div>
					</div>
					<div className="schoolDescript">{edu.description}</div>
					<span onClick={this.deleteEdu.bind(this, edu._id)}>
						<i className="fas fa-trash-alt" />
					</span>
				</div>
			);
		});
	};
	renderExperience = () => {
		return this.props.profile.profile.experience.map((exp, ind) => {
			let current = exp.current == false ? `To ${exp.to}` : 'Currently Working Here';
			return (
				<div key={ind} className="expThumb">
					<div className="titleInfoWrap">
						<div className="titleInfo">
							<span className="titleField title">{exp.title}</span>
							<span className="titleField">At{exp.company}</span>
						</div>
						<div className="titleToFrom">
							<span className="titleField">From {exp.from}</span>
							<span className="titleField">{current}</span>
						</div>
					</div>
					<div className="titleDescript">{exp.description}</div>
					<span onClick={this.deleteExp.bind(this, exp._id)}>
						<i className="fas fa-trash-alt" />
					</span>
				</div>
			);
		});
	};
	renderSkills = () => {
		return this.props.profile.profile.skills.map((skill, key) => {
			return (
				<div key={key} className="dashSkillField">
					{skill}
				</div>
			);
		});
	};
	renderSocialLinks = () => {
		if (this.props.profile.profile.social) {
			return Object.keys(this.props.profile.profile.social).map((skill, ind) => {
				if (skill === 'facebook') {
					return (
						<div key={ind}>
							<a href={this.props.profile.profile.social.facebook} target="_blank">
								<i className="fab dashSocialIcon fa-facebook-f socialIcon" />
							</a>
						</div>
					);
				}
				if (skill === 'tumblr') {
					return (
						<div key={ind}>
							<a href={this.props.profile.profile.social.tumblr} target="_blank">
								<i className="fab dashSocialIcon fa-tumblr socialIcon" />
							</a>
						</div>
					);
				}
				if (skill === 'instagram') {
					return (
						<div key={ind}>
							<a href={this.props.profile.profile.social.instagram} target="_blank">
								<i className="fab dashSocialIcon fa-instagram socialIcon" />
							</a>
						</div>
					);
				}
				if (skill === 'youtube') {
					return (
						<div key={ind}>
							<a href={this.props.profile.profile.social.youtube} target="_blank">
								<i className="fab dashSocialIcon fa-youtube socialIcon" />
							</a>
						</div>
					);
				}
				if (skill === 'twitter') {
					return (
						<div key={ind}>
							<a href={this.props.profile.profile.social.twitter} target="_blank">
								<i className="fab dashSocialIcon fa-twitter socialIcon" />
							</a>
						</div>
					);
				}
				if (skill === 'linkedIn') {
					return (
						<div key={ind}>
							<a href={this.props.profile.profile.social.linkedIn} target="_blank">
								<i className="fab dashSocialIcon fa-linkedin-in socialIcon" />
							</a>
						</div>
					);
				}
			});
		}
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
							<div className="gridItem avatar">
								<img alt="fook u" className="avatarImg" src={this.props.auth.user.avatar} />
								<div className="dashUserName">{this.props.profile.profile.userName}</div>
							</div>
							<div className="gridItem basicUserInfo">
								<div className="proStatus">{this.props.profile.profile.status}</div>
								<div className="basicInfoFlexBox">
									<div className="basicInfo1">
										<div className="dashInfoField">{this.props.profile.profile.name}</div>
										<div className="dashInfoField">
											I work at {this.props.profile.profile.company}
										</div>
										<div className="dashInfoField">{this.props.profile.profile.website}</div>
										<div className="dashInfoField">{this.props.profile.profile.location}</div>
									</div>
									<div className="basicInfo2">
										<div className="dashInfoField">{this.props.auth.user.email}</div>
										<div className="dashInfoField">
											weDev.com/{this.props.profile.profile.handle}
										</div>
										<div className="dashInfoField">{this.props.profile.profile.githubUserName}</div>
									</div>
								</div>
							</div>
							<div className="gridItem skills">
								<div className="dashSkillTitle">Skills</div>
								{this.renderSkills()}
							</div>

							<div className="gridItem bio">
								<div className="dashBioField">{this.props.profile.profile.bio}</div>
							</div>
						</div>

						<div className="profile">
							<div className="gridItem education">
								<button onClick={this.showAddEduForm} className="addEduBtn addBtn" type="button">
									Add Education
								</button>
								<AddEducation />
								<div className="eduWrap">{this.renderEducation()}</div>
							</div>
							<div className="gridItem experience">
								<button onClick={this.showAddExpForm} className="addExpBtn addBtn" type="button">
									Add Experience
								</button>
								<AddExperience />
								<div className="expWrap">{this.renderExperience()}</div>
							</div>
							<div className="gridItem social">{this.renderSocialLinks()}</div>
						</div>

						<div className="dashNavBtns">
							<button onClick={this.deleteAccount} className=" addBtn" type="button">
								Delete Account
							</button>

							<button className="editProfileBtn addBtn" type="button">
								<Link to="/editProfile">Edit Profile</Link>
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
		profile: state.profile
	};
}
export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount, deleteEducation, deleteExperience }
)(withRouter(Dashboard));
