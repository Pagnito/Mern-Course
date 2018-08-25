import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, getPosts, getLandingPage } from '../actions/post-actions';
import { Link } from 'react-router-dom';

import Post from './post';
import moment from 'moment';
import '../styles/posts.css';
import '../styles/posts-page.css';
class MobileFeed extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postText: '',
			userName: this.props.user.userName,
			avatar: this.props.user.avatar
		};
	}
	componentDidMount() {
		this.props.getPosts();
	}
	showPostForm = () => {
		document.getElementById('showForm').classList.remove('hidePostForm');
		document.getElementById('showForm').classList.add('showPostForm');
	};
	hidePostForm = () => {
		document.getElementById('showForm').classList.remove('showPostForm');
		document.getElementById('showForm').classList.add('hidePostForm');
	};
	handleSubmit = () => {
		const newPost = {
			text: this.state.postText,
			userName: this.state.userName,
			avatar: this.state.avatar
		};

		this.props.addPost(newPost, this.hidePostForm);
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	renderPosts() {
		if (this.props.posts) {
			return this.props.posts.map((post, ind) => {
				return (
					<Post
						key={ind}
						index={ind}
						postProp={post}
						avatar={this.state.avatar}
						userName={this.state.userName}
					/>
				);
			});
		}
	}
	render() {
		return (
			<div className="feed-page">
				<div className="feed postsList">
					<div onClick={this.showPostForm} className="createPostBtn">
						Create a Post
					</div>
					<div id="showForm" className="createPostFormWrap">
						<div className="createPostForm">
							<div className="addPostUserWrap">
								<div className="addPostAvatarWrap">
									<img className="addPostAvatar" src={this.state.avatar} />
								</div>
								<div className="addPostName">{this.state.userName}</div>
							</div>
							<div className="addPostTextWrap">
								<textarea name="postText" onChange={this.onChange} className="addPostText" />
								<div className="postBtnAligner">
									<button
										onClick={this.hidePostForm}
										className="cancelPost addPostBtn"
										type="button"
									>
										Cancel
									</button>
									<button onClick={this.handleSubmit} className=" addPostBtn">
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
					{this.renderPosts()}
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.auth.user,
		posts: state.posts.posts
	};
}
export default connect(
	mapStateToProps,
	{ addPost, getPosts, getLandingPage }
)(MobileFeed);
