import React, { useReducer } from 'react';

import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
    const initalState = null;

    const [state, dispatch] = useReducer(AlertReducer, initalState);

    const setAlert = (message, type) => {
        const seconds = 1000 * 2;
        // setAlert();
        dispatch({ type: SET_ALERT, payload: { message, type } });
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), seconds);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                setAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
