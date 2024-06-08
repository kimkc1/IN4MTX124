import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [activeContact, setActiveContact] = useState('Peter'); 
    const [currentUser] = useState('fakeuser'); // hardcoded current user

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost:3000/chats?sender=${currentUser}&receiver=${activeContact}`);
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
    }, [activeContact, currentUser]);

    const handleSendMessage = async () => {
        if (input.trim()) {
            const newMessage = { sender: currentUser, receiver: activeContact, message: input };

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
                setMessages(prevMessages => [...prevMessages, data]);

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
                    {['Peter'].map((contact, index) => (
                        <div 
                            key={index} 
                            className={`contact-box ${activeContact === contact ? 'active' : ''}`} 
                            onClick={() => setActiveContact(contact)}
                        >
                            <img src="https://via.placeholder.com/30" alt={contact} />
                            <h5>{contact}</h5>
                        </div>
                    ))}
                </div>
                <div className="chat-container">
                    <div className="header">
                        <img src="https://via.placeholder.com/30" alt="contact" className="profile" />
                        <h3>{activeContact}</h3>
                    </div>
                    <div className="msg-container">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === currentUser ? 'sent' : 'received'}`}>
                                <img src={`https://via.placeholder.com/30`} alt={msg.sender} className="profile" />
                                <div className="message-text">{msg.message}</div>
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
