import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../actions/post-actions';
import '../styles/post-comments.css';
import moment from 'moment';
class PostComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};
	}
	deleteComment = (postId, id) => {
		this.props.deleteComment(postId, id);
	};
	render() {
		const post = this.props.post;

		const commentsMapped = post.comments.map((comment, ind) => {
			const delComment =
				comment.userId === this.props.auth.user.id ? (
					<i
						onClick={this.deleteComment.bind(this, post._id, comment._id)}
						className="far fa-trash-alt"
					/>
				) : (
					''
				);
			return (
				<div key={ind} className="commentPostForm">
					<div className="commentPostUserWrap">
						<div className="commentPostAvatarWrap">
							<img className="commentPostAvatar" src={comment.avatar} />
						</div>
						<div className="commentPostName">{comment.userName}</div>
					</div>

					<div name="commentText" className="commentPostText">
						<div className="commentText">{comment.text}</div>
						<div className="commentDel">{delComment}</div>
					</div>

					<div className="commentDate">{moment(comment.date).format('MMM Do YY, h:mm')}</div>
				</div>
			);
		});
		return <div>{commentsMapped}</div>;
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth
	};
}
export default connect(
	mapStateToProps,
	{ deleteComment }
)(PostComments);
