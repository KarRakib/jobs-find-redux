import { useState, useEffect } from 'react';

function TestChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userType, setUserType] = useState(''); // 'employer' or 'candidate'

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = response.json()
      setMessages(data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        await fetch('/api/messages', {
            method:'POST',
          headers:{
            'content-type':"application/json"
          },
          body: JSON.stringify({sender: userType, text: newMessage})

        });
        setNewMessage('');
        fetchMessages(); // Refresh messages after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Chat App</h1>
        <div>
          <button onClick={() => setUserType('employer')}>Employer</button>
          <button onClick={() => setUserType('candidate')}>Candidate</button>
        </div>
      </div>
      <div className="messages">
        <ul>
          {messages?.map((message, index) => (
            <li
              key={index}
              className={message.sender === userType ? 'sent' : 'received'}
            >
              {message.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default TestChat;
