import React from 'react'
import Repository from '../Repository'
import Loading from '../Loading'
import axios from '../../Logic/API'

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageUrl: "/",
      RepoList: [],
      error: "",
      loading: false,
    };
    this.renderError = this.renderError.bind(this);
  }

  componentDidMount() {
    try {
    const fetchRepos = async () => {
      const response = await axios.get(this.state.pageUrl);
      this.setState({
        RepoList: response.data.items,
      });
      return true;
    };
    fetchRepos();
    } catch (error) { this.setError({ error: error.message }); }
  }

  renderError = () => {
    if (!this.state.error === "") {
      this.setState({ loading: false})
      return <div className="error">{this.state.error}</div>;
    }
  }

  render() {
  const renderRepos =
    this.state.RepoList &&
    this.state.RepoList.map((repo) => <Repository repo={repo} key={repo.id} />);

  const renderLoading =
    this.state.loading ||
    this.state.RepoList.length === 0 ? (<Loading />) : ('')

    return (
      <div>
        {renderRepos}
        {this.renderError()}
        {renderLoading}
      </div>
    );
  }
}

export default RepoList
