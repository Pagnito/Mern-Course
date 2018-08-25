import React, { Component } from 'react';
import '../../styles/view-profile.css';
import { connect } from 'react-redux';
import { getProfileByHandle } from '../../actions/profile-actions';
import GithubRepos from './profile-github';
import NotFound from '../not-found';
export class ViewProfile extends Component {
	// eslint-disable-line react/prefer-stateless-function
	componentDidMount() {
		window.scroll(0, 0);
		if (this.props.match.params.handle)
			this.props.getProfileByHandle(this.props.match.params.handle);
	}
	renderSkills = () => {
		if (this.props.profile.profile.social) {
			return this.props.profile.profile.skills.map((skill, key) => {
				return (
					<div key={key} className="dashSkillField">
						{skill}
					</div>
				);
			});
		}
	};
	renderExperience = () => {
		if (this.props.profile.profile.experience) {
			return this.props.profile.profile.experience.map((exp, ind) => {
				let current = exp.current == false ? `To ${exp.to}` : 'Currently Working';
				return (
					<div key={ind} className="eduThumb viewExpThumb">
						<div className="schoolInfoWrap">
							<div className="schoolInfo">
								<span className="schoolField schoolName">{exp.title}</span>
								<span className="studyField schoolField">At {exp.company}</span>
							</div>
							<div className="schoolToFrom">
								<span className="schoolField">From {exp.from}</span>
								<span className="schoolField">{current}</span>
								<span className="schoolField">{exp.degree}</span>
							</div>
						</div>
						<div className="schoolDescript">{exp.description}</div>
					</div>
				);
			});
		}
	};
	renderEducation = () => {
		if (this.props.profile.profile.education) {
			return this.props.profile.profile.education.map((edu, ind) => {
				let current = edu.current == false ? `To ${edu.to}` : 'Currently Attending';
				return (
					<div key={ind} className="eduThumb viewEduThumb">
						<div className="schoolInfoWrap">
							<div className="schoolInfo">
								<span className="schoolField schoolName">{edu.school}</span>
								<span className="studyField schoolField">Studied {edu.fieldOfStudy}</span>
							</div>
							<div className="schoolToFrom">
								<span className="schoolField">From {edu.from}</span>
								<span className="schoolField">{current}</span>
								<span className="schoolField">{edu.degree}</span>
							</div>
						</div>
						<div className="schoolDescript">{edu.description}</div>
					</div>
				);
			});
		}
	};
	renderSocialLinks = () => {
		if (this.props.profile.profile.social) {
			return Object.keys(this.props.profile.profile.social).map((skill, ind) => {
				if (skill === 'facebook') {
					return (
						<div key={ind + 1}>
							<a target="_blank" href={this.props.profile.profile.social.facebook}>
								<i className="fab viewSocialIcon fa-facebook-f" />
							</a>
						</div>
					);
				}
				if (skill === 'tumblr') {
					return (
						<div key={ind + 1}>
							<a target="_blank" href={this.props.profile.profile.social.tumblr}>
								<i className="fab viewSocialIcon fa-tumblr" />
							</a>
						</div>
					);
				}
				if (skill === 'instagram') {
					return (
						<div key={ind + 1}>
							<a target="_blank" href={this.props.profile.profile.social.instagram}>
								<i className="fab viewSocialIcon fa-instagram " />
							</a>
						</div>
					);
				}
				if (skill === 'youtube') {
					return (
						<div key={ind + 1}>
							<a target="_blank" href={this.props.profile.profile.social.youtube}>
								<i className="fab viewSocialIcon fa-youtube " />
							</a>
						</div>
					);
				}
				if (skill === 'twitter') {
					return (
						<div key={ind + 1}>
							<a target="_blank" href={this.props.profile.profile.social.twitter}>
								<i className="fab viewSocialIcon fa-twitter " />
							</a>
						</div>
					);
				}
				if (skill === 'linkedIn') {
					return (
						<div key={ind + 1}>
							<a target="_blank" href={this.props.profile.profile.social.linkedIn}>
								<i className="fab viewSocialIcon fa-linkedin-in " />
							</a>
						</div>
					);
				}
			});
		}
	};
	render() {
		const profile = this.props.profile.profile;
		if (this.props.profile.loading) {
			return (
				<div id="landing-loadingContainer">
					<div className="landing-spinner">
						<div className="rect1" />
						<div className="rect2" />
						<div className="rect3" />
						<div className="rect4" />
						<div className="rect5" />
					</div>
				</div>
			);
		}
		if (
			Object.keys(this.props.profile.profile).length === 0 &&
			this.props.profile.loading == false
		) {
			console.log('wtf');
			return <NotFound />;
		} else if (this.props.profile.profile) {
			return (
				<div className="viewProfile">
					<div className="profileView">
						<div className="proHeader">
							<div className="spaceForWebsite">
								<div className="basicInfoView">
									<div className="avatarWrap">
										<img className="viewProAvatar" src={profile.avatar} />
									</div>
									<div className="basicInfoWrap">
										<div className="viewInfoF viewProName">{profile.name}</div>
										<div className="viewInfoF viewProLocation">{profile.location}</div>
									</div>
								</div>
								<div className="viewInfoF viewProWebsite">{profile.website}</div>
							</div>
							<div className="basicInfoView2">
								<div className="viewProStatus">{profile.status}</div>
								<div className="basicInfoView2Flex">
									<div className="viewInfoF">At {profile.company}</div>
								</div>
								<div className="viewProSocial">{this.renderSocialLinks()}</div>
							</div>
						</div>
						<div className="viewProSocialM">{this.renderSocialLinks()}</div>
						<div className="grid">
							<div className="gridItem viewBio">{profile.bio}</div>
							<div className="gridItem viewSkills">
								<div className="viewSkillsTitle">Skills</div>
								{this.renderSkills()}
							</div>
							<div className="gridItem viewGitHub">
								<GithubRepos userName={profile.githubUserName} />
							</div>
							<div className="gridItem  viewEdu">
								<div className="viewEducationTitle">Education</div>
								{this.renderEducation()}
							</div>
							<div className="gridItem viewExp">
								<div className="viewExperienceTitle">Experience</div>
								{this.renderExperience()}
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
function mapStateToProps(state, ownProps) {
	return {
		profile: state.profile
	};
}
export default connect(
	mapStateToProps,
	{ getProfileByHandle }
)(ViewProfile);
