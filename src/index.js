import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GithubState from './context/github/GithubState';

ReactDOM.render(
    <>
        <GithubState>
            <App />
        </GithubState>
    </>,
    document.getElementById('root')
);
