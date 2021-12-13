import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/users/Users';
import User from './components/layout/users/User';

import Search from './components/layout/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null,
        repos: [],
    };

    async componentDidMount() {
        this.setState({
            loading: true,
        });
        const response = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({
            loading: false,
            users: response.data,
        });
    }

    searchUsers = async (text) => {
        if (text.length > 0) {
            this.setState({
                loading: true,
            });
            const response = await axios.get(
                `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            );
            console.log(response);
            this.setState({
                loading: false,
                users: response.data.items,
            });
        }
    };

    getUser = async (login) => {
        if (login.length > 0) {
            this.setState({
                loading: true,
            });
            const response = await axios.get(
                `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            );
            console.log(response);
            this.setState({
                loading: false,
                user: response.data,
            });
        }
    };

    getUserRepos = async (login) => {
        this.setState({
            loading: true,
        });
        const response = await axios.get(
            `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        console.log(response);
        this.setState({
            loading: false,
            repos: response.data,
        });
    };

    clearUsers = () => {
        this.setState({
            loading: false,
            users: [],
        });
    };

    setAlert = (message, type) => {
        const seconds = 1000 * 2;
        this.setState({ alert: { message, type } });
        setTimeout(() => this.setState({ alert: null }), seconds);
    };

    render() {
        const { users, user, loading, alert, repos } = this.state;

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
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            setAlert={this.setAlert}
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
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
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
}

export default App;
