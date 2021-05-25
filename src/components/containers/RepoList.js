import React from 'react'
import Repository from '../Repository'
import Loading from '../Loading'
import {axios } from '../../Logic/utils'

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageUrl: "&page=120",
      RepoList: [],
      error: "",
      loading: false,
    };
  }

  componentDidMount() {
    try {
    this.setState({ loading: true })
    const fetchRepos = () => {
      axios
        .get(this.state.pageUrl)
        .then((response) =>
          this.setState({
            RepoList: response.data.items,
            loading: false,
          })
        )
        .catch((error) =>
          this.setState({
            error: error.message,
            loading: false,
          })
        );
    };
    fetchRepos();
    } catch (error) {
      this.setState({ error: error, loading: false });
    }
  }

  render() {
  const renderRepos =
    this.state.RepoList &&
    this.state.RepoList.map((repo) => <Repository repo={repo} key={repo.id} />);

  const renderLoading = this.state.loading && (<Loading />)

  const renderError =
    this.state.error === ""
      ? ("")
      : (<div className="error">{this.state.error}</div>);

    return (
      <>
        {renderRepos}
        {renderError}
        {renderLoading}
      </>
    );
  }
}

export default RepoList
