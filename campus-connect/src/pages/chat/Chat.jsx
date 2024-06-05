import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:3000/chats');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        if (input.trim()) {
            const newMessage = { sender: 'user', message: input };

            try {
                const response = await fetch('http://localhost:3000/chats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMessage)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMessages([...messages, data]);

            } catch (error) {
                console.error('Error saving message:', error);
            }

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
                            <div key={index} className={msg.sender === 'user' ? 'sent' : 'received'}>
                                <img src={`https://via.placeholder.com/30`} alt={msg.sender} className="profile" /> 
                                {msg.message}
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
