import React, { Component } from 'react';
import { getLandingPage } from '../actions/post-actions';
import moment from 'moment';
import { connect } from 'react-redux';
import Posts from './posts';
import '../styles/landing.css';

class Landing extends Component {
	componentDidMount() {
		this.props.getLandingPage();

		window.scrollTo(0, 0);
	}

	renderArticles() {
		const response = this.props.articles.articles;
		return response.map((article, ind) => {
			const snippet = document.getElementsByClassName('snippet');

			const imgUrl = !article.urlToImage
				? 'https://scontent.fbed1-1.fna.fbcdn.net/v/t1.0-9/39887089_1334760716655415_9198910557426548736_n.jpg?_nc_cat=0&oh=c80194b96da4132225b9e3590d35c5ac&oe=5BEF3FE3'
				: article.urlToImage;
			return (
				<div key={ind} className="article gridItemLanding">
					<div
						className="artImg"
						style={{
							backgroundImage: `url(${imgUrl})`
						}}
					/>

					<div className="articleInfo">
						<div className="author">By {article.author}</div>
						<div className="articleDate">{moment(article.publishedAt).format('MMM Do YY')}</div>
						<a target="_blank" href={article.url}>
							<div className="headLine">{article.title}</div>
						</a>
						<a target="_blank" href={article.url}>
							<div className="snippet">{article.description}</div>
						</a>
					</div>
				</div>
			);
		});
	}
	renderPosts = () => {};
	render() {
		if (!this.props.articles || this.props.loading || this.props.articles.length === 0) {
			return (
				<div id="landing-loadingContainer">
					<div className="landing-spinner">
						<div className="rect1" />
						<div className="rect2" />
						<div className="rect3" />
						<div className="rect4" />
						<div className="rect5" />
					</div>
				</div>
			);
		}
		if (this.props.articles || this.props.posts.loading == false) {
			return (
				<div className="landing">
					<div id="postsContainer">
						<Posts />
					</div>
					<div id="articleContainer">{this.renderArticles()}</div>
				</div>
			);
		}
	}
}
function mapStateToProps(state) {
	return {
		articles: state.posts.articles,
		auth: state.auth,
		posts: state.posts.posts
	};
}
export default connect(
	mapStateToProps,
	{ getLandingPage }
)(Landing);
