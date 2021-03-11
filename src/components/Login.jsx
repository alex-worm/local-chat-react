import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({onLogin}) => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [title, setTitle] = useState('Sign In');

    const onEnter = async () => {
        if (!roomId || !userName) {
            setTitle('Wrong Data');
            setTimeout(() => {
                setTitle('Sign In');
            }, 3000);
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
    };

    return (
        <div className="login">
            <h1>{title}</h1>
            <div className="login-inputs">
                <input
                    type="text"
                    placeholder="Room Id"
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
            </div>
            <button className="login-button" disabled={isLoading}
                    onClick={onEnter}>{isLoading ? 'Connecting...' : 'Enter'}</button>
        </div>
    );
};

export default Login;
