import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config/urlConfig';
import './DairyChatAI.css';

const DairyChatAI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "How can I improve milk production in my dairy farm?",
    "What are the best practices for feeding dairy cows?",
    "How do I prevent mastitis in dairy cows?",
    "What are the signs of heat in dairy cows?",
    "How often should I clean my milking equipment?",
    "What's the optimal temperature for storing milk?",
    "How can I improve feed efficiency in my dairy herd?",
    "What vaccinations do dairy cows need?",
    "How do I maintain proper udder health?",
    "What are the signs of a healthy dairy cow?"
  ];

  const categories = [
    { emoji: '🥛', name: 'Milk production and quality' },
    { emoji: '🌾', name: 'Feed management and nutrition' },
    { emoji: '🏥', name: 'Animal health and welfare' },
    { emoji: '🔄', name: 'Breeding and reproduction' },
    { emoji: '🏗️', name: 'Farm operations and equipment' },
    { emoji: '📋', name: 'Best practices and regulations' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    try {
      setLoading(true);
      
      // Add user message immediately
      const userMessage = {
        id: messages.length,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');

      // Get AI response
      const response = await axios.post(
        `${BASE_URL}/dairy-chat/question`,
        { question: newMessage }
      );

      if (response.data && response.data.messages) {
        setMessages(response.data.messages);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to chat
      setMessages(prev => [...prev, {
        id: prev.length,
        text: "I apologize, but I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestion = (question) => {
    setNewMessage(question);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 style={{ color: 'rgb(255, 255, 255)' }}>Dairy Farm AI Assistant</h2>
      </div>
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>Welcome to the Dairy Farm AI Assistant! 🐄</h3>
            <p>I'm here to help you with any questions about dairy farming. You can ask me about:</p>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  {category.emoji} {category.name}
                </li>
              ))}
            </ul>
            <p>Try asking one of these questions:</p>
            <div className="suggested-questions">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="question-button"
                  type="button"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user' : 'ai'}`}
          >
            <div className="message-content">
              {message.text}
              {message.sender === 'ai' && message.text.includes('loading') && (
                <span className="loading-dots"></span>
              )}
            </div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask me anything about dairy farming..."
          disabled={loading}
        />
        <button type="submit" disabled={!newMessage.trim() || loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default DairyChatAI; 