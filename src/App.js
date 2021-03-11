import React from 'react';
import axios from 'axios';
import reducer from './reducer.js';
import socket from './socket.js';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
    const [state, dispatch] = React.useReducer(reducer, {
        isAuth: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const onLogin = async (obj) => {
        dispatch({
            type: 'IS_AUTH',
            payload: obj
        });
        socket.emit('ROOM:AUTH', obj);
        const {data} = await axios.get(`/rooms/${obj.roomId}`);

        dispatch({
            type: 'SET_DATA',
            payload: data,
        });
    };

    const setUsers = (users) => {
        dispatch({
            type: 'SET_USERS',
            payload: users
        });
    };

    const addMessage = (message) => {
        dispatch({
            type: 'NEW_MESSAGE',
            payload: message
        });
    };

    React.useEffect(() => {
        socket.on('ROOM:SET_USERS', setUsers);
        socket.on('ROOM:NEW_MESSAGE', addMessage);
    }, []);

    return (
        <div className="app">
            {!state.isAuth ? <Login onLogin={onLogin}/> : <Chat  {...state} onAddMessage={addMessage}/>}
        </div>
    );
}

export default App;
