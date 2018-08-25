import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/actions';
import { clearProfile } from '../../actions/profile-actions';
import renderMatrixPattern from '../../funStuff/matrix';
import '../../styles/header.css';
import '../../styles/logged-in-header.css';
class Header extends Component {
	logout = () => {
		this.props.logoutUser();
		this.props.clearProfile();
	};

	render() {
		if (this.props.auth.isAuthenticated) {
			return (
				<div className="logged-header">
					<div id="matrixPattern">{renderMatrixPattern()}</div>
					<div className="logo-stns bg-stretch-5 hor-left vert-center logo-wrapper">
						<div className="logged-logo">
							<Link to="/">
								{'<'}WeDevs{'/>'}
							</Link>
						</div>
					</div>
					<div className="align-vert nav-btn-stns hor-center bg-stretch-5">
						<div className="userInfoo hor-right">
							<div className="userName">{this.props.auth.user.userName}</div>
							<img alt="avatar" className="proPic" src={this.props.auth.user.avatar} />
						</div>
						<div className="logged-nav nav-btns hor-right">
							<ul>
								<li>
									<Link to="/profiles">Devs</Link>
								</li>
								<li>
									<Link to="/dashboard">Dashboard</Link>
								</li>
								<li>
									<Link to="/mobileFeed">Posts</Link>
								</li>
								<li>
									<Link onClick={this.logout} to="/">
										Log Out
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div className="header">
				<div id="matrixPattern">{renderMatrixPattern()}</div>
				<div className="logo-stns bg-stretch-5 hor-left vert-center logo-wrapper">
					<div className="logged-logo">
						<Link id="logoLink" to="/">
							{'<'}WeDevs{'/>'}
						</Link>
					</div>
				</div>
				<div className="nav-btn-stns  hor-right bg-stretch-5">
					<div className="nav-btns non-log-btns vert-bot">
						<ul>
							<li>
								<Link to="/profiles">Developers</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
							<li>
								<Link to="/register">Sign Up</Link>
							</li>
						</ul>
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
export default connect(
	mapStateToProps,
	{ logoutUser, clearProfile }
)(Header);
