import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Repository from '../Repository';
import Loading from '../Loading';
import { fetchPage } from '../../Logic/utils';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Repos: [],
      error: '',
      currentPage: 1,
      hasMore: true,
    };
  }

  componentDidMount() {
    try {
      const fetchRepos = async () => {
        await fetchPage()
          .then((response) => this.setState({ Repos: response.items }))
          .catch((error) => this.setState({ error: `${error.message}: Try again.` }));
      };
      fetchRepos();
    } catch (error) {
      this.setState({ error: `Something went wrong: ${error}` });
    }
  }

  setNextPage = () => {
    const { currentPage } = this.state;
    const setNew = parseInt(currentPage, 10) + 1;
    const next = `&page=${setNew}`;
    this.setState({ currentPage: setNew });
    return next;
  }

  updateState = (res) => {
    const { Repos, error } = this.state;
    if (Array.isArray(res)) {
      const repos = [...Repos, ...res];
      this.setState({ Repos: repos });
    } else if (error === '') {
      this.setState({ hasMore: false });
    }
    return Repos;
  }

  fetchNextRepos = async () => {
    const page = this.setNextPage();
    const result = await fetchPage(page)
      .then((response) => response.items)
      .catch((error) => `Something went wrong: ${error.message}`);
    return this.updateState(result);
  }

  render() {
    const { Repos, error, hasMore } = this.state;
    const renderError = error === '' ? ('') : (<div className="error">{error}</div>);
    return (
      <>
        {renderError}
        <div>
          <InfiniteScroll
            dataLength={Repos.length}
            next={this.fetchNextRepos}
            hasMore={hasMore}
            loader={<Loading />}
            endMessage={(
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            )}
          >
            {Repos.map((repo) => (
              <Repository repo={repo} key={repo.id} />
            ))}
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default RepoList;
