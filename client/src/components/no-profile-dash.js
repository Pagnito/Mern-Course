import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/no-profile-dash.css';
class NoProfileDash extends Component {
	render() {
		return (
			<div className="noProfileDash">
				<div className="noProfileUserInfo">
					<div className="noProfileAvatar">
						<img alt="fook u" className="avatarImg" src={this.props.auth.user.avatar} />
						<div className="dashUserName">{this.props.auth.user.userName}</div>
						<button className="createProBtn">
							<Link to="/createProfile">Create Profile</Link>
						</button>
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}
export default connect(mapStateToProps)(NoProfileDash);
