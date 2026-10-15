'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, Bot, Calendar, Scissors, MapPin, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome_1',
    sender: 'bot',
    text: `Hello beautiful! ✨ Welcome to **The Braid Bar NJ**. I'm your **Crown Concierge**.\n\nHow can I help you with your protective styling journey today?`,
    timestamp: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  '✨ What are the hair prep rules?',
  '💰 How much are Knotless Braids?',
  '📍 Where is the salon located?',
  '💳 How do deposits work?',
  '📅 How do I book an appointment?',
];

export default function ClientConciergeWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Don't show the client widget inside the admin portal
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'client',
          messages: [{ role: 'user', content: text }],
        }),
      });

      const data = await response.json();
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Thank you for reaching out! Please feel free to call our salon directly at (551) 339-3637.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: 'bot',
          text: 'I had a brief connection delay, but you can book anytime online or give us a call at (551) 339-3637!',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 bg-espresso/90 text-cream text-xs font-medium px-4 py-2 rounded-full border border-gold/30 shadow-xl backdrop-blur-md cursor-pointer hover:bg-espresso transition-all"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Questions? Ask Crown Concierge</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-espresso via-[#4a2e1b] to-terracotta text-cream shadow-2xl flex items-center justify-center border-2 border-gold/40 hover:border-gold transition-all"
          aria-label="Toggle Salon Concierge"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-cream" />
          ) : (
            <>
              <Sparkles className="w-6 h-6 text-gold" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-espresso animate-ping" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-espresso" />
            </>
          )}
        </motion.button>
      </div>

      {/* Expandable Chat Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] max-h-[80vh] bg-cream rounded-3xl shadow-2xl border border-espresso/15 flex flex-col overflow-hidden z-50 font-[family-name:var(--font-body)]"
          >
            {/* Header */}
            <div className="bg-espresso text-cream p-4 border-b border-gold/30 flex items-center justify-between relative select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracotta/30 border border-gold/40 flex items-center justify-center text-gold shadow-inner">
                  <Scissors className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-cream">
                      Crown Concierge
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[10px] text-cream/70 uppercase tracking-widest font-light">
                    The Braid Bar NJ • Virtual Stylist
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-cream/70 hover:text-cream hover:bg-white/10 transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Banner Action */}
            <div className="bg-cream-dark px-4 py-2 border-b border-espresso/10 flex items-center justify-between text-xs">
              <span className="text-[11px] text-espresso/70 font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-terracotta" /> 560 Valley Rd, West Orange, NJ
              </span>
              <Link
                href="/book"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-1 bg-terracotta hover:bg-espresso text-cream text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-all"
              >
                <Calendar className="w-3 h-3" /> Book Now
              </Link>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]/80 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-espresso text-cream rounded-tr-none'
                        : 'bg-white text-espresso border border-espresso/10 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line prose-sm prose-p:my-1 prose-headings:my-1 prose-headings:font-bold prose-headings:text-espresso">
                      {msg.text}
                    </div>
                    <div
                      className={`text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-cream/50' : 'text-espresso/40'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-espresso/10 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1.5 text-espresso/60 text-xs">
                    <Bot className="w-3.5 h-3.5 text-terracotta animate-spin" />
                    <span>Stylist is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 bg-cream-dark/50 border-t border-espresso/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  disabled={isTyping}
                  className="shrink-0 text-[10px] bg-white hover:bg-terracotta hover:text-cream text-espresso px-2.5 py-1.5 rounded-full border border-espresso/10 transition-colors shadow-2xs font-medium"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Text Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-espresso/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about hair prep, styles, pricing..."
                className="flex-1 bg-cream-light text-espresso text-xs rounded-full px-4 py-2.5 border border-espresso/15 focus:outline-none focus:border-terracotta placeholder:text-espresso/40"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-espresso hover:bg-terracotta disabled:opacity-40 text-cream flex items-center justify-center transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
