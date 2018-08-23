import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/actions';
import '../../styles/login.css';
export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}
	componentDidMount() {
		window.scroll(0, 0);
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.errors !== prevProps.errors) {
			this.setState({ errors: this.props.errors });
			this.setState({
				email: !this.props.errors.email ? this.state.email : '',
				password: !this.props.errors.password ? this.state.password : ''
			});
			console.log(this.props.auth);
		}
		if (this.props.auth.isAuthenticated === true) {
			this.props.history.push('/dashboard');
		}
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const newUser = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(newUser);
	};
	render() {
		return (
			<div className="login">
				<div id="loginBoxWrapper">
					<form onSubmit={this.onSubmit} className="form-group">
						<label>Email</label>
						<input
							onChange={this.onChange}
							placeholder={this.state.errors.email}
							name="email"
							value={this.state.email}
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
						<div className="form-group-hor">
							<button className="form-btn">
								<Link to="/register">Sign Up</Link>
							</button>
							<button className="form-btn" type="submit">
								Login
							</button>
						</div>
						<a className="form-btn googleBtn" href="/login/auth/google">
							Login With Google
						</a>
					</form>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	errors: propTypes.object
};
function mapStateToProps(state) {
	return {
		auth: state.auth,
		errors: state.errors
	};
}
export default connect(
	mapStateToProps,
	{ loginUser }
)(Login);
