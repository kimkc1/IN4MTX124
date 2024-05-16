
import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([
        { type: 'sent', text: "Hello, is this item availble?" },
        { type: 'received', text: "Yes when are you available to meet up?" }
    ]);

    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { type: 'sent', text: input }]);
            setInput('');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="contacts">
                    <div className="contact-box">
                        <img src="https://via.placeholder.com/30" alt="Contact 1" />
                        <h5>Contact 1</h5>
                    </div>
                    <div className="contact-box">
                        <img src="https://via.placeholder.com/30" alt="Contact 2" />
                        <h5>Contact 2</h5>
                    </div>
                    <div className="contact-box">
                        <img src="https://via.placeholder.com/30" alt="Contact 3" />
                        <h5>Contact 3</h5>
                    </div>
                </div>
                <div className="chat-container">
                    <div className="header">
                        <img src="https://via.placeholder.com/30" alt="contact" className="profile" />
                        <h3>Peter the Anteater</h3>
                    </div>
                    <div className="msg-container">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.type}>
                                <img src={`https://via.placeholder.com/30`} alt={msg.type} className="profile" /> 
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="input">
                        <input 
                            type="text" 
                            placeholder="Type message here..." 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
