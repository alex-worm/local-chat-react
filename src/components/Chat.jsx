import React, {useState, useRef} from 'react';
import './Chat.css';
import socket from '../socket.js';

const Chat = ({users, messages, userName, roomId, onAddMessage, onLeave}) => {

    const [messagesValue, setMessagesValue] = useState('');
    const messagesRef = useRef(null);

    const onSendMessage = () => {
        if (!/\S/.test(messagesValue)) return;
        socket.emit('ROOM:NEW_MESSAGE', {
            text: messagesValue,
            userName,
            roomId
        });
        onAddMessage({userName, text: messagesValue});
        setMessagesValue('');
    };

    const onTextareaChange = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSendMessage();
        }
    }

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 999999);
    }, [messages]);

    return (
        <div className="row chat-container">
            <div className="center-block col s11 m6">
                <div className="chat">
                    <h1>Room: {roomId}</h1>
                    <div className="row chat-content">
                        <div className="chat-users users col s12">
                            <div className="users-title">Online({users.length})</div>
                            <div className="users-view user">
                                {users.map((name, index) => <div key={index} className="user-view">{name}</div>)}
                            </div>

                        </div>
                        <div className="chat-messages messages col s12">
                            <div className="messages-box" ref={messagesRef}>
                                {messages.map((message, index) => (
                                        <div className="messages-view" key={index}>
                                            <p className="messages-text">{message.text}</p>
                                            <span className="messages-name">{message.userName}</span>
                                        </div>
                                    )
                                )
                                }
                            </div>
                            <div className="input-field input-container">
                        <textarea
                            className="materialize-textarea"
                            placeholder="Write message..."
                            value={messagesValue}
                            onChange={(e) => setMessagesValue(e.target.value)}
                            onKeyPress={(e) => onTextareaChange(e)}
                        />
                            </div>
                            <div className="buttons">
                                <button className="btn waves-button-input waves-light red darken-1" onClick={onLeave}>Leave</button>
                                <button className="btn waves-effect waves-light" onClick={onSendMessage}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chat;
