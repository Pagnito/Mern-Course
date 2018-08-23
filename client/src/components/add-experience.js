import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/add-experience.css';
import TextFieldGroup from './common/TextFieldGroup';
import { addExperience } from '../actions/profile-actions';
import '../styles/create-profile.css';

import { isEmpty } from '../utils/isEmpty';
class AddExperience extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			company: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: '',
			errors: {}
		};
	}
	onSlct = (e) => {
		console.log(e.target.value);
		if (e.target.value === 'false') {
			this.setState({ current: false });
		} else {
			this.setState({ current: true });
		}
	};
	hideAddExpForm = () => {
		document.getElementById('addExp').classList.add('dissapear1');
		document.getElementById('addExp').classList.remove('appear1');
	};
	componentDidMount() {
		window.scrollTo(0, 0);
	}
	componentDidUpdate(prevProps) {
		if (this.props.errors !== prevProps.errors) {
			this.setState({ errors: this.props.errors });
		}
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const newExperience = {
			title: this.state.title,
			company: this.state.company,
			location: this.state.location,
			from: this.state.from,
			to: this.state.to,
			current: false,
			description: this.state.description
		};
		this.props.addExperience(newExperience, this.hideAddExpForm);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		if (this.props.auth.isAuthenticated) {
			return (
				<div id="addExp" className="addExperienceWrapper">
					<form onSubmit={this.handleSubmit} className="addExperience">
						<div className="addExpFields">
							<TextFieldGroup
								name="title"
								placeholder={!isEmpty(this.state.errors) ? this.state.errors.title : 'Title'}
								type="text"
								value={this.state.title}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="company"
								placeholder={
									!isEmpty(this.state.errors) ? this.state.errors.company : 'Company Name'
								}
								type="text"
								value={this.state.company}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="location"
								placeholder={!isEmpty(this.state.errors) ? this.state.errors.location : 'Location'}
								type="text"
								value={this.state.degree}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="from"
								placeholder={
									!isEmpty(this.state.errors) ? this.state.errors.from : 'From Date ex: 6/15'
								}
								type="text"
								value={this.state.from}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="to"
								placeholder="To"
								type="text"
								value={this.state.to}
								onChange={this.onChange}
							/>
							<div className="currentTitleQ">
								Are you currently working at this place?
								<select onChange={this.onSlct} id="slct" name="current">
									<option value="true">?</option>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							</div>
							<textarea
								className="expDescript"
								name="description"
								placeholder="Description"
								type="text"
								value={this.state.description}
								onChange={this.onChange}
							/>
						</div>
						<div className="addExpBtnsWrap">
							<button
								onClick={this.handleSubmit}
								className="addExpBtns"
								type="submit"
								id="submitExperience"
							>
								Submit
							</button>
							<button
								className="addExpBtns"
								onClick={this.hideAddExpForm}
								type="button"
								id="submitEducation"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		errors: state.errors,
		auth: state.auth
	};
}
export default connect(
	mapStateToProps,
	{ addExperience }
)(AddExperience);
