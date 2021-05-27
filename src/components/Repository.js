/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/repo.scss';
import { daysDiff } from '../Logic/utils';

function Repository({ repo }) {
  const {
    owner, name, description, stargazers_count, open_issues_count, created_at,
  } = repo;
  return (
    <article className="Repo">
      <div className="Repo__avatar">
        <img src={owner.avatar_url} alt="repo-owner-avatar" className="" />
      </div>
      <div className="Repo__details">
        <h4 className="name">{name}</h4>
        <p className="desc">{description}</p>
        <p className="meta">
          <span className="meta__stars">{`Stars: ${stargazers_count}`}</span>
          <span className="meta__issues">{`Issues: ${open_issues_count}`}</span>
          <span className="meta__days">
            {`Submitted ${daysDiff(new Date(created_at))} days ago by ${owner.login}`}
          </span>
        </p>
      </div>
    </article>
  );
}

Repository.defaultProps = {
  repo: {
    owner: {
      avatar_url: '',
      login: '',
    },
    name: '',
    description: '',
    stargazers_count: '',
    open_issues_count: '',
    created_at: '',
  },
};

Repository.propTypes = {
  repo: PropTypes.shape({
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
      login: PropTypes.string,
    }),
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    stargazers_count: PropTypes.number,
    open_issues_count: PropTypes.number,
    created_at: PropTypes.string,
  }),
};

export default Repository;
