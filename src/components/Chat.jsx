import React, {useState, useRef} from 'react';
import './Chat.css';
import socket from '../socket.js';

const Chat = ({users, messages, userName, roomId, onAddMessage}) => {

    const [messagesValue, setMessagesValue] = useState('');
    const messagesRef = useRef(null);

    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            text: messagesValue,
            userName,
            roomId
        });
        onAddMessage({userName, text: messagesValue});
        setMessagesValue('');
    };

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 999999);
    }, [messages]);

    return (
        <div className="chat-wrapper">
            <div className="chat">
                <div className="chat-box">
                    <h1>Room: {roomId}</h1>
                    <div className="chat-content">
                        <div className="chat-users users">
                            <div className="users-title">Online({users.length})</div>
                            <div className="users-view user">
                                {users.map((name, index) => <div key={index} className="user-view">{name}</div>)}
                            </div>

                        </div>
                        <div className="chat-messages messages">
                            <div className="messages-box" ref={messagesRef}>
                                {messages.map((message) => (
                                        <div className="messages-view">
                                            <p className="messages-text">{message.text}</p>
                                            <span className="messages-name">{message.userName}</span>
                                        </div>
                                    )
                                )
                                }
                            </div>
                            <div className="messages-inputs">
                                    <textarea
                                        className="messages-textarea"
                                        placeholder="Write message..."
                                        value={messagesValue}
                                        onChange={(e) => setMessagesValue(e.target.value)}
                                    ></textarea>
                                <button
                                    className="messages-button"
                                    onClick={onSendMessage}
                                >Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chat;
