import { useState } from 'react';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const rawResponse = await res.text();
      console.log('Raw Response:', rawResponse);

      if (!rawResponse) {
        throw new Error('Empty response from API');
      }

      const data = JSON.parse(rawResponse);
      setMessages([...messages, userMessage, { role: 'bot', content: data.text }]);
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      setMessages([...messages, userMessage, { role: 'bot', content: 'Failed to get a response from the bot.' }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient flex items-center justify-center p-8">
      <div className="card w-full max-w-2xl">
        {/* Header */}
        <div className="bg-blue-600 p-4 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">Customer Service Bot</h2>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-green-100 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field flex-1"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="btn-primary"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}