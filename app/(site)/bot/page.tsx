// pages/chatbot.js
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Chatbot() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [userUUID, setUserUUID] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [userMessage, setUserMessage] = useState('');

    // Initialize user UUID and load chat history
    useEffect(() => {
        const uuid = getOrCreateUserUUID();
        setUserUUID(uuid);
        loadChatHistory();
    }, []);

    // Get or create the user UUID in localStorage
    function getOrCreateUserUUID() {
        let uuid = localStorage.getItem('userUUID');
        if (!uuid) {
            uuid = crypto.randomUUID();
            localStorage.setItem('userUUID', uuid);
        }
        return uuid;
    }

    // Load chat history from localStorage
    function loadChatHistory() {
        const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        setChatHistory(history);
    }

    // Save chat history to localStorage
    function saveChatHistory(updatedHistory) {
        localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
        setChatHistory(updatedHistory);
    }

    // Toggle the chat window visibility
    function toggleChat() {
        setIsChatOpen((prev) => !prev);
    }

    // Handle the user message input change
    function handleInputChange(e) {
        setUserMessage(e.target.value);
    }

    // Send user message and get the bot's response
    async function sendMessage() {
        if (!userMessage.trim()) return;

        const updatedHistory = [
            ...chatHistory,
            {
                type: 'user',
                text: userMessage,
                timestamp: new Date().toISOString(),
            },
        ];
        saveChatHistory(updatedHistory);

        try {
            const res = await axios.post(
                'https://aristotle.app.n8n.cloud/webhook/433a2fa1-465e-4160-bdd9-9b9c654d34b4',
                { uuid: userUUID, user_input: userMessage }
            );
            const data = res.data.n8n_response;
            let botResponse = 'No response received.';
            if (Array.isArray(data) && data[0]?.output?.[0]) {
                botResponse = data[0].output[0];
            }

            const newHistory = [
                ...updatedHistory,
                {
                    type: 'bot',
                    text: botResponse,
                    timestamp: new Date().toISOString(),
                },
            ];
            saveChatHistory(newHistory);
        } catch (error) {
            const newHistory = [
                ...updatedHistory,
                {
                    type: 'bot',
                    text: 'Error connecting to server.',
                    timestamp: new Date().toISOString(),
                },
            ];
            saveChatHistory(newHistory);
        }
        setUserMessage(''); // Clear input field after sending
    }

    return (
        <div>
            {/* Toggle button */}
            <button
                className="chat-toggle"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    background: '#007bff',
                    color: 'white',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                }}
                onClick={toggleChat}
            >
                💬
            </button>

            {/* Chat container */}
            <div
                className={`chat-container ${isChatOpen ? 'visible' : ''}`}
                style={{
                    position: 'fixed',
                    bottom: '90px',
                    right: '20px',
                    width: '300px',
                    height: '400px',
                    border: '1px solid #ccc',
                    background: 'white',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                    display: isChatOpen ? 'flex' : 'none',
                    flexDirection: 'column',
                }}
            >
                {/* Messages area */}
                <div
                    className="messages"
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '10px',
                    }}
                >
                    {chatHistory.map((entry, index) => (
                        <div
                            key={index}
                            className={`message ${entry.type}-message`}
                            style={{
                                marginBottom: '10px',
                                padding: '5px',
                                borderRadius: '4px',
                                backgroundColor:
                                    entry.type === 'user'
                                        ? '#e3f2fd'
                                        : '#f5f5f5',
                                textAlign:
                                    entry.type === 'user' ? 'right' : 'left',
                            }}
                        >
                            <strong>
                                {entry.type === 'user' ? 'You' : 'Bot'}:
                            </strong>{' '}
                            {entry.text}
                        </div>
                    ))}
                </div>

                {/* Input area */}
                <div
                    className="input-container"
                    style={{
                        display: 'flex',
                        padding: '10px',
                        borderTop: '1px solid #ccc',
                    }}
                >
                    <input
                        type="text"
                        id="userInput"
                        value={userMessage}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        style={{
                            flex: 1,
                            padding: '8px',
                            marginRight: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                    <button
                        onClick={sendMessage}
                        style={{
                            padding: '8px 15px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
