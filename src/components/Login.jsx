import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';
import M from 'materialize-css';

const Login = ({onLogin}) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onEnter = useCallback(async () => {
        if (!/\S/.test(roomId) || !/\S/.test(userName)) {
            M.toast({html: 'Wrong Data'});
            return;
        }
        const obj = {
            roomId,
            userName
        };
        setLoading(true);
        await axios.post('/rooms', {
            roomId,
            userName
        });
        onLogin(obj);
    }, [roomId, userName, onLogin]);

    useEffect(() => {
        const onKeypress = (event) => {
            if (event.key === 'Enter') {
                onEnter();
            }
        }

        document.querySelector('#roomId').addEventListener('keypress', onKeypress);
        document.querySelector('#yourName').addEventListener('keypress', onKeypress);

        return () => {
            document.querySelector('#roomId').removeEventListener('keypress', onKeypress);
            document.querySelector('#yourName').removeEventListener('keypress', onKeypress);
        }
    }, [onEnter]);

    return (
        <div className="row login-container">
            <div className="center-block col s8 m4">
                <div className="login">
                    <h1>Sign In</h1>
                    <div className="container">
                        <div className="input-container input-field col s12">
                            <input
                                type="text"
                                id="roomId"
                                value={roomId}
                                onChange={e => setRoomId(e.target.value)}
                            />
                            <label htmlFor="roomId">Room ID</label>
                        </div>
                    </div>
                    <div className="container">
                        <div className="input-container input-field col s12">
                            <input
                                type="text"
                                id="yourName"
                                value={userName}
                                onChange={e => setUserName(e.target.value)}
                            />
                            <label htmlFor="yourName">User Name</label>
                        </div>
                    </div>
                    <button className={('btn waves-effect waves-light') + (isLoading ? ' disabled' : '')} disabled={isLoading}
                            onClick={onEnter}>{isLoading ? 'Connecting...' : 'Enter'}</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
