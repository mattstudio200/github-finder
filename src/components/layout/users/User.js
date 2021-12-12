import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner'
import PropTypes from 'prop-types';

const User = ({ user, loading, getUser }) => {
    let { username } = useParams();

    useEffect(() => {
        getUser(username);
    }, []);

    const { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable } = user;
    if (loading) {
        return <Spinner/>
    }
    return <div>{name}</div>;
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired
};

export default User;
