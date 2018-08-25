import React, { Component } from 'react';
import '../styles/not-found.css';

class NotFound extends Component {
	componentDidMount() {
		window.scroll(0, 0);
	}
	render() {
		return (
			<div className="notFound">
				<h1>This page doesn't exist foo?</h1>
			</div>
		);
	}
}
export default NotFound;
