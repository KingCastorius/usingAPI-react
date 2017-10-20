import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
let key = 0;

class Request extends React.Component {
	state = {
		repoName: '',
		returnedRepos: []
	}

	getRepos(e) {
		e.preventDefault()
		axios.get('https://api.github.com/search/repositories?q=' + this.state.repoName).then((res) => {
			let repos = res.data.items.map(item => <li key={key++}>{item.git_url}</li>)
			this.setState({returnedRepos: repos})
		})
	}
	

	render() {
		return (
			<span>
				<form onSubmit={(e) => this.getRepos(e)}>
					<input 
						name="repoName"
						type="text" 
						placeholder="repo name" 
						value={this.state.repoName} 
						onChange={(e) => this.setState({[e.target.name]: e.target.value})} />
					<button type="submit">Submit</button>
				</form>

				<ul>
					{this.state.returnedRepos}
				</ul>
			</span>
		)
	}
}

ReactDOM.render(
	<Request />,
	document.getElementById('root')
)
