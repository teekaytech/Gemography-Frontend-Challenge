import React from 'react'
import PropTypes from 'prop-types'
import '../stylesheets/repo.scss'
import { daysDiff } from "../Logic/utils";

function Repository({ repo }) {
  return (
    <article className="Repo">
      <div className="Repo__avatar">
        <img src={repo.owner.avatar_url} alt="repo-owner-avatar" className="" />
      </div>
      <div className="Repo__details">
        <h4 className="name">{repo.name}</h4>
        <p className="desc">{repo.description}</p>
        <p className="meta">
          <span className="meta__stars">Stars: { repo.stargazers_count }</span>
          <span className="meta__issues">Issues: {repo.open_issues_count }</span>
          <span className="meta__days">
            {`Submitted ${daysDiff(new Date(repo.created_at))} days ago by ${repo.owner.login}`}
            </span>
        </p>
      </div>
      {console.log(repo)}
    </article>
  );
}

Repository.propTypes = {
  
}

export default Repository
