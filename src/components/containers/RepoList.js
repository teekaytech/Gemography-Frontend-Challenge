import React from 'react'
import Repository from '../Repository'
import Loading from '../Loading'
import {axios } from '../../Logic/utils'

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      pageUrl: "&page=12",
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
            error: `${error.message}: Check your connection`,
            loading: false,
          })
        );
    };
    fetchRepos();
    } catch (error) {
      this.setState({ error: `Something went wrong: ${error}`, loading: false });
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
      <div>
        {renderRepos}
        {renderError}
        {renderLoading}
      </div>
    );
  }
}

export default RepoList
