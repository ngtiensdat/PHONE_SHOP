/**
 * MiniSocChatbox Component
 * A global floating AI chatbot widget located at the bottom-right of the viewport.
 * Simulates a friendly Sóc Mobile AI assistant with suggestion chips,
 * automatic scrolling, typing indicators, and backend API integration.
 *
 * Related: src/app/api/chat-ai/route.ts, src/app/layout.tsx, src/constants/labels.ts
 * Pattern: Floating Global Chatbot Panel
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, HelpCircle } from 'lucide-react';
import { LABELS } from '@/constants/labels';
import AiResponseRenderer from '@/components/features/ai/AiResponseRenderer';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

export default function MiniSocChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: LABELS.CHATBOT.WELCOME,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend.trim() }),
      });

      if (!response.ok) {
        throw new Error('Chat API failure');
      }

      const data = await response.json();
      const botMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: data.reply,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const botErrorMsg: Message = {
        id: Math.random().toString(),
        sender: 'bot',
        text: 'Rất tiếc, mình đang gặp sự cố kết nối. Hãy thử lại sau ít phút nhé!',
      };
      setMessages((prev) => [...prev, botErrorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSendMessage(inputText);
  };

  return (
    <div className="mini-soc-chatbox-wrapper">
      {/* Floating Trigger Button */}
      <button 
        type="button" 
        className="mini-soc-chat-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        title={LABELS.CHATBOT.TITLE}
      >
        {isOpen ? (
          <X size={26} color="#ffffff" />
        ) : (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '2px' }}>🐿️</span>
            <MessageSquare size={16} color="#ffffff" style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: 'var(--color-primary)', borderRadius: '50%', padding: '1px' }} />
          </div>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="mini-soc-chat-panel">
          {/* Header */}
          <div className="chat-panel-header">
            <span className="chat-panel-title">
              <span>🐿️</span> {LABELS.CHATBOT.TITLE} <Sparkles size={12} fill="#ffffff" />
            </span>
            <button 
              type="button" 
              className="chat-panel-close" 
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble ${msg.sender}`}
              >
                {msg.sender === 'bot' ? (
                  <AiResponseRenderer text={msg.text} compact />
                ) : (
                  <span style={{ whiteSpace: 'pre-line' }}>{msg.text}</span>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="chat-typing-indicator">
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
              </div>
            )}
            
            {/* Show Suggestion Chips if only welcome message exists */}
            {messages.length === 1 && !isTyping && (
              <div className="chat-suggestions-row">
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <HelpCircle size={12} /> {LABELS.CHATBOT.SUGGESTION_TITLE}
                </span>
                <button 
                  type="button" 
                  className="chat-suggestion-chip"
                  onClick={() => handleSendMessage(LABELS.CHATBOT.SUGGESTION_1)}
                >
                  {LABELS.CHATBOT.SUGGESTION_1}
                </button>
                <button 
                  type="button" 
                  className="chat-suggestion-chip"
                  onClick={() => handleSendMessage(LABELS.CHATBOT.SUGGESTION_2)}
                >
                  {LABELS.CHATBOT.SUGGESTION_2}
                </button>
                <button 
                  type="button" 
                  className="chat-suggestion-chip"
                  onClick={() => handleSendMessage(LABELS.CHATBOT.SUGGESTION_3)}
                >
                  {LABELS.CHATBOT.SUGGESTION_3}
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSubmit} className="chat-panel-footer">
            <input 
              type="text" 
              className="chat-panel-input"
              placeholder={LABELS.CHATBOT.INPUT_PLACEHOLDER}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="chat-send-btn"
              disabled={!inputText.trim() || isTyping}
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
