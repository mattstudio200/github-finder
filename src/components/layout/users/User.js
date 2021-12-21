import React, { useEffect, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';

import GithubContext from '../../../context/github/githubContext';

const User = () => {
    let { username } = useParams();
    const githubContext = useContext(GithubContext);
    const { user, loading, getUser, getUserRepos, repos } = githubContext;

    useEffect(() => {
        getUser(username);
        getUserRepos(username);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        company,
    } = user;
    if (loading) {
        return <Spinner />;
    } else {
        return (
            <Fragment>
                <Link to="/" className="btn btn-light">
                    Back
                </Link>
                Hireable: {''}
                {hireable ? (
                    <i className="fas fa-check text-success" />
                ) : (
                    <i className="fas fa-times-circle text-danger" />
                )}
                <div className="card grid-2">
                    <div className="all-center">
                        <img
                            src={avatar_url}
                            alt={name}
                            className="round-img"
                            style={{ width: '150px' }}
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className="btn btn-dark my-1">
                            Visit Github Profile
                        </a>
                        <ul>
                            <li>
                                {login && (
                                    <Fragment>
                                        <strong>Username:</strong> {login}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {company && (
                                    <Fragment>
                                        <strong>Company:</strong> {company}
                                    </Fragment>
                                )}
                            </li>
                            <li>
                                {blog && (
                                    <Fragment>
                                        <strong>Blog: </strong>{' '}
                                        <a href={blog}>{blog}</a>
                                    </Fragment>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">
                        followers: {followers}
                    </div>
                    <div className="badge badge-success">
                        following: {following}
                    </div>
                    <div className="badge badge-light">
                        public repos: {public_repos}
                    </div>
                    <div className="badge badge-dark">
                        public gist: {public_gists}
                    </div>
                </div>
                <Repos repos={repos}></Repos>
            </Fragment>
        );
    }
};

export default User;
