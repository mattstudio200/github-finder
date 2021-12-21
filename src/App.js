import React, { Fragment, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/layout/users/Users';
import User from './components/layout/users/User';

import Search from './components/layout/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

import GithubContext from './context/github/githubContext';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
    const githubContext = useContext(GithubContext);
    const { getUsers } = githubContext;

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, []);

    return (
        <AlertState>
            <Router>
                <div className="App">
                    <Navbar title="Github finder" icon="fab fa-github" />
                    <div className="container">
                        <Alert />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Fragment>
                                        <Search />
                                        <Users />
                                    </Fragment>
                                }
                            ></Route>
                            <Route path="/about" element={<About />}></Route>
                            <Route
                                exact
                                path="/user/:username"
                                element={<User />}
                            ></Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </AlertState>
    );
};

export default App;
