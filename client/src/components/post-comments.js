import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/post-comments.css';
import moment from 'moment';
class PostComments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};
	}
	render() {
		const comments = this.props.commentsProp;
		const commentsMapped = comments.map((comment, ind) => {
			return (
				<div key={ind} className="commentPostForm">
					<div className="commentPostUserWrap">
						<div className="commentPostAvatarWrap">
							<img className="commentPostAvatar" src={comment.avatar} />
						</div>
						<div className="commentPostName">{comment.userName}</div>
					</div>

					<div name="commentText" className="commentPostText">
						{comment.text}
					</div>

					<div className="commentDate">{moment(comment.date).format('MMM Do YY, h:mm')}</div>
				</div>
			);
		});
		return <div>{commentsMapped}</div>;
	}
}

export default PostComments;
