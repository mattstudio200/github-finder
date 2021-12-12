import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner'
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = ({ user, loading, getUser, getUserRepos, repos }) => {
    let { username } = useParams();

    useEffect(() => {
        getUser(username);
        getUserRepos(username);
    }, []);

    const { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable, company } = user;
    if (loading) {
        return <Spinner/>
    }
    else{
        return (<Fragment>
            <Link to='/' className='btn btn-light'>Back</Link>
            Hireable: {''}
            {hireable ? <i className='fas fa-check text-success'/> : <i className='fas fa-times-circle text-danger'/> }
        
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} alt={name} className='round-img' style={{width: '150px'}} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (<Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                        </Fragment>)}
                        <a href={html_url} target="_blank" className='btn btn-dark my-1'>Visit Github Profile</a>
                        <ul>
                            <li>
                                {login && <Fragment><strong>Username:</strong> {login}</Fragment>}
                            </li>
                            <li>
                                {company && <Fragment><strong>Company:</strong> {company}</Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment><strong>Blog: </strong> <a href={blog} target="_blank" >{blog}</a></Fragment>} 
                            </li>
                        </ul>
                </div>
            </div>

            <div className='card text-center'>
                <div className='badge badge-primary'>followers: {followers}</div>
                <div className='badge badge-success'>following: {following}</div>
                <div className='badge badge-light'>public repos: {public_repos}</div>
                <div className='badge badge-dark'>public gist: {public_gists}</div>
            </div>

            <Repos repos={repos}></Repos>
        </Fragment>);
    }

    
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired, 
    repos: PropTypes.array.isRequired
};

export default User;
