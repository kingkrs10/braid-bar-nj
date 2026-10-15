'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, RefreshCw, Key, HelpCircle, CheckCircle2, MessageSquare, Wrench, Shield } from 'lucide-react';

interface CopilotMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const INITIAL_COPILOT_MESSAGES: CopilotMessage[] = [
  {
    id: 'init_1',
    sender: 'ai',
    text: `### 👋 Welcome to your AI Salon Operations Copilot, Sharon!
I am your personal virtual assistant for **The Braid Bar NJ**. 

Here are some of the things you can ask me right now:
- **"How do I update prices or add a new protective style?"**
- **"How do I change the lookbook photos or hero banner?"**
- **"How do I switch the site from Coming Soon to Live mode?"**
- **"Draft a friendly reminder text for tomorrow's client"**
- **"How do I get my free Google Gemini API key?"**

Type your question below or click any of the quick prompt buttons!`,
    timestamp: 'Just now',
  },
];

const QUICK_PROMPTS = [
  { label: '✂️ Update Service Prices', query: 'How do I change prices or add a new hairstyle in the admin portal?' },
  { label: '📸 Replace Lookbook Photos', query: 'How do I replace photos or update headlines on the website?' },
  { label: '🚀 Coming Soon vs Live Mode', query: 'How do I toggle between Coming Soon mode and Live mode?' },
  { label: '📱 Draft Client Reminder Text', query: 'Draft a friendly hair prep appointment reminder message for a client.' },
  { label: '📩 Booking Email Diagnostics', query: 'How do automated booking confirmation emails work?' },
  { label: '🔑 Free Gemini API Setup', query: 'Where do I get a free Google Gemini API key to power this bot?' },
];

export default function AdminAiCopilot() {
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: 'admin',
          messages: [{ role: 'user', content: text }],
        }),
      });

      const data = await res.json();
      const aiMsg: CopilotMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Here are the details for your request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: 'Encountered a momentary connection delay. Please review the Owner Manual tab for immediate guides.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_COPILOT_MESSAGES);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-espresso/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-terracotta text-[10px] font-bold uppercase tracking-widest bg-terracotta/10 px-2.5 py-1 rounded-full mb-1">
            <Sparkles className="w-3 h-3 text-gold" /> 100% Free AI Assistant
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-espresso">
            AI Salon Operations &amp; Tech Copilot
          </h3>
          <p className="text-xs text-espresso/60 font-light mt-0.5">
            Instant help for Sharon French to manage appointments, update pricing, swap site photos, and troubleshoot salon technical tools.
          </p>
        </div>

        <button
          onClick={handleClearChat}
          className="inline-flex items-center gap-1.5 text-xs text-espresso/70 hover:text-terracotta transition-colors px-3 py-1.5 rounded-full border border-espresso/10 bg-cream/50"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Chat
        </button>
      </div>

      {/* Free Tier Notice & Info Pill */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center shrink-0">
            <Key className="w-4 h-4 text-amber-900" />
          </div>
          <div>
            <span className="font-bold">100% Free AI Engine Active</span>
            <p className="text-[11px] text-amber-900/80 font-light">
              Running locally with Braid Bar NJ Knowledge Base. You can also plug in your free Google Gemini API key for 1,500 daily generative queries at $0.00.
            </p>
          </div>
        </div>
        <a
          href="https://aistudio.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-amber-900 text-cream px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider hover:bg-espresso transition-all shadow-2xs"
        >
          Get Free Gemini Key ↗
        </a>
      </div>

      {/* Quick Action Prompt Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-espresso/60 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-terracotta" /> Quick Salon Copilot Inquiries:
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt.query)}
              disabled={isLoading}
              className="text-xs bg-white hover:bg-terracotta hover:text-cream text-espresso px-3.5 py-2 rounded-xl border border-espresso/10 transition-all shadow-2xs font-medium flex items-center gap-1.5"
            >
              <span>{prompt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface Container */}
      <div className="bg-white rounded-2xl border border-espresso/10 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FAF8F5]/60 text-xs font-[family-name:var(--font-body)]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-espresso text-cream rounded-tr-none'
                    : 'bg-white text-espresso border border-espresso/10 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line prose-sm prose-p:my-1.5 prose-headings:my-1 prose-headings:font-bold prose-headings:text-espresso prose-ul:my-1 prose-li:my-0.5">
                  {msg.text}
                </div>
                <div
                  className={`text-[9px] mt-2 text-right ${
                    msg.sender === 'user' ? 'text-cream/50' : 'text-espresso/40'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-espresso/10 rounded-2xl rounded-tl-none p-3.5 shadow-xs flex items-center gap-2 text-espresso/60 text-xs">
                <Bot className="w-4 h-4 text-terracotta animate-spin" />
                <span>Copilot is searching salon guide &amp; generating instructions...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Query Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 bg-white border-t border-espresso/10 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about updating prices, site photos, launch mode, or client texts..."
            className="flex-1 bg-cream-light text-espresso text-xs rounded-full px-5 py-3 border border-espresso/15 focus:outline-none focus:border-terracotta placeholder:text-espresso/40 shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="inline-flex items-center gap-2 bg-espresso hover:bg-terracotta disabled:opacity-40 text-cream px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shrink-0 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask Copilot</span>
          </button>
        </form>
      </div>
    </div>
  );
}
