import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/actions';
import '../../styles/register.css';

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
	}
	componentDidMount() {
		window.scroll(0, 0);
	}
	componentDidUpdate(prevProps) {
		if (this.props.errors !== prevProps.errors) {
			this.setState({ errors: this.props.errors });
			this.setState({
				userName: !this.props.errors.userName ? this.state.userName : '',
				email: !this.props.errors.email ? this.state.email : '',
				password: !this.props.errors.password ? this.state.password : '',
				password2: !this.props.errors.password2 ? this.state.password2 : ''
			});
		}
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			userName: this.state.userName,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		this.props.registerUser(newUser, this.props.history);
	};
	render() {
		return (
			<div className="register">
				<div id="loginBoxWrapper">
					<form onSubmit={this.onSubmit} autoComplete="off" className="form-group">
						<label>Email</label>
						<input
							onChange={this.onChange}
							placeholder={this.state.errors.email}
							value={this.state.email}
							name="email"
							className="form-input"
						/>
						<label>User Name</label>
						<input
							onChange={this.onChange}
							placeholder={this.state.errors.userName}
							name="userName"
							value={this.state.userName}
							className="form-input"
						/>
						<label>Password</label>
						<input
							onChange={this.onChange}
							placeholder={this.state.errors.password}
							name="password"
							value={this.state.password}
							className="form-input"
						/>
						<label>Confirm Password</label>
						<input
							onChange={this.onChange}
							placeholder={this.state.errors.password2}
							name="password2"
							value={this.state.password2}
							className="form-input"
						/>
						<div className="form-group-hor">
							<button className="form-btn" type="submit">
								Submit
							</button>
						</div>
						<a className="form-btn googleBtn" href="/login/auth/google">
							Sign Up With Google
						</a>
					</form>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired
};
function mapStateToProps(state) {
	return {
		auth: state.auth,
		errors: state.errors
	};
}
export default connect(
	mapStateToProps,
	{ registerUser }
)(withRouter(Register));
