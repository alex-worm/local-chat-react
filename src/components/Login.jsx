import React from 'react';
import socket from '../socket';

const Login = () => {
    return (
        <div className="join-block">
            <input type="text" placeholder="Room ID"/>
            <input type="text" placeholder="Your name"/>
            <button className="btn btn-success">Enter</button>
        </div>
    );
};

export default Login;
