import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Chat } from '@google/genai';
import { GlassCard } from './GlassCard';
import { Send, Bot } from 'lucide-react';
import type { ChatMessage } from '../types';

interface ChatWindowProps {
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I'm Sui, your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isTyping) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Initialize chat on first message
      if (!chatRef.current) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: "You are Sui, a friendly and helpful AI assistant for SuiSphere. Your goal is to guide users, answer questions about the Sui ecosystem, and provide information about the platform's features. Keep your responses concise and helpful.",
          },
        });
      }

      const chat = chatRef.current;
      const response = await chat.sendMessageStream({ message: currentInput });

      // Add a placeholder for the AI's streaming response
      setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

      let accumulatedText = '';
      for await (const chunk of response) {
        accumulatedText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { sender: 'ai', text: accumulatedText };
          return newMessages;
        });
      }

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-24 right-8 z-50 w-[350px] h-[500px]"
    >
      <GlassCard className="w-full h-full flex flex-col p-0 overflow-hidden">
        <header className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="text-[var(--primary-blue)]" />
            <h3 className="font-heading font-bold text-lg">Ask SuiSphere</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none" data-magnetic>&times;</button>
        </header>
        
        <div className="flex-grow p-4 overflow-y-auto hide-scrollbar">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm break-words ${
                    msg.sender === 'user'
                      ? 'bg-[var(--primary-blue)] text-white rounded-br-none'
                      : 'bg-white/10 text-text rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && messages[messages.length -1].sender === 'user' && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-3"
            >
                <div className="bg-white/10 text-text rounded-2xl p-3 text-sm rounded-bl-none">
                    <div className="flex items-center justify-center gap-1.5 h-[1.25rem]">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-white/10">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
              data-magnetic
            />
            <button type="submit" className="p-2 rounded-lg bg-[var(--primary-blue)] text-white hover:bg-[var(--primary-blue)]/80 transition-colors disabled:opacity-50" disabled={isTyping} data-magnetic>
              <Send size={18} />
            </button>
          </form>
        </div>
      </GlassCard>
    </motion.div>
  );
};