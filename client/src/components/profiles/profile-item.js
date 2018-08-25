import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import '../../styles/profile-item.css';
class ProfileItem extends Component {
	renderSocialLinks = () => {
		if (this.props.profile.social) {
			return Object.keys(this.props.profile.social).map((skill, ind) => {
				if (skill === 'facebook') {
					return (
						<div key={ind + 2}>
							<a target="_blank" href={this.props.profile.social.facebook}>
								<i className="fab proItemSocialIcon fa-facebook-f " />
							</a>
						</div>
					);
				}
				if (skill === 'tumblr') {
					return (
						<div key={ind + 2}>
							<a target="_blank" href={this.props.profile.social.tumblr}>
								<i className="fab proItemSocialIcon fa-tumblr " />
							</a>
						</div>
					);
				}
				if (skill === 'instagram') {
					return (
						<div key={ind + 2}>
							<a target="_blank" href={this.props.profile.social.instagram}>
								<i className="fab proItemSocialIcon fa-instagram " />
							</a>
						</div>
					);
				}
				if (skill === 'youtube') {
					return (
						<div key={ind + 2}>
							<a target="_blank" href={this.props.profile.social.youtube}>
								<i className="fab proItemSocialIcon fa-youtube" />
							</a>
						</div>
					);
				}
				if (skill === 'twitter') {
					return (
						<div key={ind + 2}>
							<a target="_blank" href={this.props.profile.social.twitter}>
								<i className="fab proItemSocialIcon fa-twitter" />
							</a>
						</div>
					);
				}
				if (skill === 'linkedIn') {
					return (
						<div key={ind + 2}>
							<a target="_blank" href={this.props.profile.social.linkedIn}>
								<i className="fab proItemSocialIcon fa-linkedin-in" />
							</a>
						</div>
					);
				}
			});
		}
	};
	render() {
		const { profile } = this.props;
		return (
			<div className="profileItem">
				<div className="proItemAvatarWrap">
					<div className="proItemField proItemAvatar">
						<img className="proItemAvatarImg" src={profile.avatar} />
					</div>
					<div className="proItemField proItemName">{profile.name}</div>
				</div>
				<div className="proItemInfoWrap flex">
					<div className="flexForStatus">
						<div className="proItemStatus">{profile.status}</div>
						<div className="proItemInfo1">
							<div className="proItemCompany">At {profile.company}</div>
							<div className="proItemField proItemLocation">{profile.location}</div>
							<div className="proItemField proItemWebsite">{profile.website}</div>
						</div>
					</div>

					<div className="proItemInfo2">
						<div className=" proItemBio"> {profile.bio}</div>
						<div className="proItemField proItemSocial">{this.renderSocialLinks()}</div>
					</div>
				</div>
				<Link to={`/profile/${profile.handle}`}>
					<i className="far fa-eye" />
				</Link>
			</div>
		);
	}
}

export default ProfileItem;
