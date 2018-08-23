import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getProfiles } from '../../actions/profile-actions';
import '../../styles/profiles.css';
import ProfileItem from './profile-item';
export class Developers extends Component {
	componentDidMount() {
		window.scroll(0, 0);
		this.props.getProfiles();
	}

	renderProfiles = () => {
		return this.props.profiles.map((profile) => {
			return <ProfileItem profile={profile} />;
		});
	};
	render() {
		if (
			this.props.profiles.length === 0 ||
			this.props.profiles.loading ||
			this.props.profiles == null
		) {
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
		} else if (this.props.profiles.length > 0) {
			return <div className="profiles">{this.renderProfiles()}</div>;
		}
	}
}
function mapStateToProps(state) {
	return {
		profiles: state.profile.profiles
	};
}
export default connect(
	mapStateToProps,
	{ getProfiles }
)(Developers);
