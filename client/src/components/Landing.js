import React, { Component } from 'react';
import { fetchArticles } from '../actions/actions';
import { connect } from 'react-redux';
import '../styles/landing.css';

class Landing extends Component {
	componentDidMount() {
		if (Object.keys(this.props.articles).length == 0) {
			this.props.fetchArticles();
		}
		window.scrollTo(0, 0);
	}

	renderArticles() {
		const response = this.props.articles;

		const nytUrl = 'https://www.nytimes.com/';
		return Object.keys(response).map((article, ind) => {
			const snippet = document.getElementsByClassName('snippet');
			console.log(response[article].web_url);
			const imgUrl = !response[article].multimedia.length
				? 'https://scontent.fbed1-1.fna.fbcdn.net/v/t1.0-9/39887089_1334760716655415_9198910557426548736_n.jpg?_nc_cat=0&oh=c80194b96da4132225b9e3590d35c5ac&oe=5BEF3FE3'
				: nytUrl + response[article].multimedia[24].url;
			return (
				<div key={ind} className="article">
					<div
						className="artImg"
						style={{
							backgroundImage: `url(${imgUrl})`
						}}
					/>

					<div className="articleInfo">
						<a target="_blank" href={response[article].web_url}>
							<div className="headLine">{response[article].headline.main}</div>
						</a>
						<a target="_blank" href={response[article].web_url}>
							<div className="snippet">{response[article].snippet}</div>
						</a>
					</div>
				</div>
			);
		});
	}
	render() {
		if (Object.keys(this.props.articles).length === 0) {
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
		if (this.props.articles) {
			return (
				<div className="landing">
					<div id="articleContainer">{this.renderArticles()}</div>
				</div>
			);
		}
	}
}
function mapStateToProps(state) {
	return {
		articles: state.articles.articles,
		auth: state.auth
	};
}
export default connect(
	mapStateToProps,
	{ fetchArticles }
)(Landing);
