import React, { Component } from 'react';

export class GitHubRepos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: '9c4ea7f23bce8beb5bfc',
			clientSecret: '92beb602ac0ccbafe973e396e9856538e294ca2b',
			count: 5,
			sort: 'created: asc',
			repos: [],
			isMounted: false
		};
	}
	async componentDidMount() {
		const { userName } = this.props;
		const { clientId, clientSecret, count, sort } = this.state;
		this.setState({ isMounted: true }, () => {
			fetch(
				`http://api.github.com/users/${userName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
			)
				.then((res) => res.json())
				.then((data) => {
					if (this.state.isMounted) {
						this.setState({ repos: data });
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
	componentWillUnmount() {
		this.setState({ isMounted: false });
	}
	render() {
		if (this.props.userName && this.state.repos.message !== 'Not Found') {
			const repos = this.state.repos;
			const repoItems = repos.map((repo) => {
				const description = repo.description == null ? '' : repo.description;
				return (
					<a className="repo" key={repo.id} target="_blank" href={repo.svn_url}>
						<div className="repoFlex">
							<div className="repoAvatarWrap">
								<img className="repoAvatar" src={repo.owner.avatar_url} />
							</div>
							<div className="repoInfo">
								<div className="repoF repoName">{repo.name}</div>
								<div className="repoF repoStars">Stars: {repo.stargazers_count}</div>
								<div className="repoF repoWatchers">Watchers: {repo.watchers_count}</div>
							</div>
						</div>
						<div className="repoDesc">Description: {repo.description}</div>
					</a>
				);
			});
			return (
				<div>
					<div className="reposTitle">Latest Repos</div>
					{repoItems}
				</div>
			);
		} else {
			return <div>No Repos</div>;
		}
	}
}

export default GitHubRepos;
