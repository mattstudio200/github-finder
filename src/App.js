import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/users/Users';
import User from './components/layout/users/User';

import Search from './components/layout/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';
import axios from 'axios';

const App = () => {
    
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [repos, setRepos] = useState([]);


    useEffect(() => {
        getUsers()
        // eslint-disable-next-line
    }, []);

    const getUsers = async () => {
        setLoading(true)
        const response = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setLoading(false)
        setUsers(response.data)
    }

    const searchUsers = async (text) => {
        if (text.length > 0) {
            setLoading(true)

            const response = await axios.get(
                `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            );
            setLoading(false)
            setUsers(response.data.items)
        }
    };

    const getUser = async (login) => {
        if (login.length > 0) {
            setLoading(true)

            const response = await axios.get(
                `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            );
            console.log(response);
            setLoading(false);
            setUser(response.data);
        }
    };

    const getUserRepos = async (login) => {
        setLoading(true)
        const response = await axios.get(
            `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        console.log(response);
        setLoading(false);
        setRepos(response.data)
    };

    const clearUsers = () => {
        setLoading(false);
        setUsers([]);
    };

    const showAlert = (message, type) => {
        const seconds = 1000 * 2;
        setAlert({ message, type  });
        setTimeout(() => setAlert(null), seconds);
    };

    

    return (
        <Router>
            <div className="App">
                <Navbar title="Github finder" icon="fab fa-github" />
                <div className="container">
                    <Alert alert={alert} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Fragment>
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        setAlert={showAlert}
                                    />

                                    <Users
                                        loading={loading}
                                        users={users}
                                    />
                                </Fragment>
                            }
                        ></Route>
                        <Route path="/about" element={<About />}></Route>
                        <Route
                            exact
                            path="/user/:username"
                            element={
                                <User
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    repos={repos}
                                    user={user}
                                    loading={loading}
                                />
                            }
                        ></Route>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
