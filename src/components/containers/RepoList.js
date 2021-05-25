import React from 'react'
import Repository from '../Repository'
import Loading from '../Loading'
import axios from '../../Logic/API'
import { useState, useEffect } from "react";


const RepoList = () => {

  const [pageUrl, setPageUrl] = useState("/");
  const [RepoList, setRepoList] = useState([]);
  const [error, setError] = useState("")

  useEffect(() => {
    try {
    const fetchRepos = async (pageUrl) => {
      const response = await axios.get(pageUrl);
      setRepoList(response.data.items);
      return true;
    };
    fetchRepos();
    } catch (error) { setError(error.message) }
  }, [pageUrl])

  const renderRepos = RepoList.length === 0
    ? ( <Loading /> )
    : ( RepoList.map( repo => <Repository repo={repo} key={repo.id} /> )
  );

  const renderError = () => {
    if (!error === "") {
      return <div className="error">{error}</div>;
    }
  }

  return (
    <div>
      { renderError() }
      { renderRepos }
    </div>
  );
}

export default RepoList
