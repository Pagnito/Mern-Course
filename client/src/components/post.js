import React, { Component } from 'react';
import PostComments from './post-comments';
import moment from 'moment';
import { postComment } from '../actions/post-actions';
import { connect } from 'react-redux';
class Post extends Component {
	// eslint-disable-line react/prefer-stateless-function
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			commentsShown: false
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleComment = (id) => {
		const newComment = {
			text: this.state.comment,
			userName: this.props.userName,
			avatar: this.props.avatar
		};
		this.props.postComment(newComment, id);
		this.setState({ comment: '' });
	};
	showComments = () => {
		if (this.props.postProp.comments.length > 0) {
			if (this.state.commentsShown === false) {
				document.getElementById(`comment${this.props.index}`).classList.remove('hideComments');
				document.getElementById(`comment${this.props.index}`).classList.add('showComments');
				this.setState({ commentsShown: true });
			} else {
				document.getElementById(`comment${this.props.index}`).classList.remove('showComments');
				document.getElementById(`comment${this.props.index}`).classList.add('hideComments');
				this.setState({ commentsShown: false });
			}
		}
	};
	render() {
		const post = this.props.postProp;
		const commentsComp =
			!post.comments.length === 0 ? (
				''
			) : (
				<PostComments commentsProp={post.comments} auth={this.props.auth} />
			);
		return (
			<div className="post">
				<div className="aboutPoster">
					<div className="postAvatarWrap">
						<img className="postAvatar" src={post.avatar} />
					</div>
					<div className="postNameDate">
						<div className="posterName">{post.userName}</div>
						<div className="postDate">Posted on {moment(post.date).format('MMM Do YY, h:mm')}</div>
					</div>
				</div>
				<div className="postInfo">
					<div className="postText">{post.text}</div>
				</div>
				<div>
					<div className="commentAreaWrap">
						<textarea
							name="comment"
							value={this.state.comment}
							type="text"
							onChange={this.onChange}
							placeholder="Write a comment..."
							className="commentArea"
						/>
					</div>
					<div className="likesSubmit">
						<div className="likeComment">
							<i className="margin fas fa-thumbs-up" />
							<div className="margin">0 likes</div>
							<div onClick={this.showComments} className="showCommentsBtn margin">
								{post.comments.length} Comments
							</div>
						</div>
						<div className="postCommentWrap">
							<button
								onClick={this.handleComment.bind(this, post._id)}
								className="postComment"
								type="button"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
				<div id={`comment${this.props.index}`} className="commentsWrap">
					{commentsComp}
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		post: state.posts.post
	};
}
export default connect(
	mapStateToProps,
	{ postComment }
)(Post);
