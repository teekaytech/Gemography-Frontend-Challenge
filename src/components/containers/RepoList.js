import React from 'react'
import Repository from '../Repository'
import Loading from '../Loading'
import { axios, fetchNextPage } from "../../Logic/utils";
import InfiniteScroll from 'react-infinite-scroll-component';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      Repos: [],
      error: "",
      loading: false,
      currentPage: 1,
      hasMore: true
    };
  }

  componentDidMount() {
    try {
      this.fetchRepos(this.state.page);
    } catch (error) {
      this.setState({
        error: `Something went wrong: ${error}`,
        loading: false,
      });
    }
  }

  fetchRepos = (page) => {
    this.setState({ loading: true });
    axios
      .get(page)
      .then((response) =>
        this.setState({
          Repos: response.data.items,
          loading: false,
        }))
      .catch((error) =>
        this.setState({
          error: `${error.message}: Try again.`,
          loading: false,
        }));
  };

  setNextPage = () => {
    const setNew = parseInt(this.state.currentPage) + 1
    const next = "&page=" + setNew;
    this.setState({ currentPage: setNew, page: next })
  }

  updateState = (res) => {
    const { Repos, error } = this.state;
    if (Array.isArray(res)) {
      const repos = [...Repos, ...res];
      this.setState({ Repos: repos });
    } else if (error === "") {
      this.setState({ hasMore: false });
    }
    return Repos;
  }

  fetchNextRepos = async () => {
    this.setNextPage();
    const result = await fetchNextPage(this.state.page)
      .then((response) => response.items)
      .catch((error) => `Something went wrong: ${error.message}`);
    return this.updateState(result);
  }

  render() {
    const { Repos, loading, error, hasMore } = this.state;
    const renderLoading = loading && <Loading />;
    const renderError = error === "" ? ("") : (<div className="error">{error}</div>);

    return (
      <>
        {renderError}
        {renderLoading}
        <div>
          <InfiniteScroll
            dataLength={Repos.length}
            next={this.fetchNextRepos}
            hasMore={hasMore}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {Repos.map((repo, key) => (
              <Repository repo={repo} key={key} />
            ))}
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default RepoList
