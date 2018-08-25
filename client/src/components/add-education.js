import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/add-education.css';
import TextFieldGroup from './common/TextFieldGroup';
import { addEducation } from '../actions/profile-actions';
import '../styles/create-profile.css';
import { isEmpty } from '../utils/isEmpty';
class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			fieldOfStudy: '',
			degree: '',
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
	hideAddEduForm = () => {
		document.getElementById('addEdu').classList.remove('appear');
		document.getElementById('addEdu').classList.add('dissapear');
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
		const newEducation = {
			school: this.state.school,
			fieldOfStudy: this.state.fieldOfStudy,
			degree: this.state.degree,
			from: this.state.from,
			to: this.state.to,
			current: this.state.current,
			description: this.state.description
		};
		this.props.addEducation(newEducation, this.hideAddEduForm);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {
		if (this.props.auth.isAuthenticated) {
			return (
				<div id="addEdu" className="addEducationWrapper">
					<form onSubmit={this.handleSubmit} className="addEducation">
						<div className="addEduFields">
							<TextFieldGroup
								name="school"
								placeholder={!isEmpty(this.state.errors) ? this.state.errors.school : 'School Name'}
								type="text"
								value={this.state.school}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="fieldOfStudy"
								placeholder={
									!isEmpty(this.state.errors) ? this.state.errors.fieldOfStudy : 'Field Of Study'
								}
								type="text"
								value={this.state.fieldOfStudy}
								onChange={this.onChange}
							/>
							<TextFieldGroup
								name="degree"
								placeholder={
									!isEmpty(this.state.errors)
										? this.state.errors.degree
										: 'Degree Ex: Associates or No degree'
								}
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
							<div className="currentSchoolQ">
								Are you currently attending this school
								<select onChange={this.onSlct} id="slct" name="current">
									<option value="true">?</option>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							</div>
							<textarea
								className="eduDescript"
								name="description"
								placeholder="Description"
								type="text"
								value={this.state.description}
								onChange={this.onChange}
							/>
						</div>
						<div className="addEduBtnsWrap">
							<button
								onClick={this.handleSubmit}
								className="addEduBtns"
								type="submit"
								id="submitEducation"
							>
								Submit
							</button>
							<button
								className="addEduBtns"
								onClick={this.hideAddEduForm}
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
	{ addEducation }
)(AddEducation);
