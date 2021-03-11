import React from 'react';
import Login from './components/Login';
import socket from './socket';

function App() {
    return (
        <div className="wrapper">
            <Login/>
        </div>
    );
}

export default App;
