import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Minimize2,
  Maximize2,
  ChevronRight,
  RefreshCw,
  Copy,
  Check,
  Compass,
  Briefcase,
  Users,
  Trophy,
  ShieldCheck,
  TrendingUp,
  Ticket,
  ArrowRight,
  HelpCircle,
  Zap,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actions?: Array<{
    label: string;
    page: any;
    itemId?: string;
    icon?: string;
  }>;
}

export const SidebarChatbot: React.FC = () => {
  const {
    currentPage,
    currentUser,
    gigs,
    mentors,
    competitions,
    navigateTo,
    addToast
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome_1',
      sender: 'bot',
      text: `👋 Hey **${currentUser.name.split(' ')[0]}**! I'm your **Campus AI Advisor**.\n\nI can help you:\n- 💼 Match with the highest paying campus gigs\n- ✍️ Draft winning client proposals & pitch templates\n- 🤝 Find verified mentors for your tech stack\n- 🏆 Strategy to win hackathons & earn XP points\n- 🛡️ Boost your Reputation Score to Platinum Tier (80+)`,
      timestamp: 'Just now',
      actions: [
        { label: 'Browse Top Gigs', page: 'gigs', icon: '💼' },
        { label: 'Find a Mentor', page: 'mentors', icon: '🤝' },
        { label: 'Trending Skills', page: 'trending', icon: '📈' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenAi = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-campus-ai', handleOpenAi);
    return () => window.removeEventListener('open-campus-ai', handleOpenAi);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Context-specific prompt suggestions based on active page
  const getContextPrompts = () => {
    switch (currentPage) {
      case 'gigs':
        return [
          'How do I write a winning proposal?',
          'What are the highest-paying gigs right now?',
          'How does Campus Escrow payment protection work?'
        ];
      case 'mentors':
        return [
          'Recommend a top mentor for Python & AI',
          'How do I earn more free Mentorship Coupons?',
          'What happens during a 45-min mentorship session?'
        ];
      case 'competitions':
        return [
          'What are the best ideas for the AI Hackathon?',
          'How do competition points boost my Leaderboard rank?',
          'How to submit a GitHub repo or Figma prototype?'
        ];
      case 'career':
        return [
          'How can I optimize my profile for recruiters?',
          'Which tech stacks have the most summer internship openings?',
          'How does 1-click verified application work?'
        ];
      case 'leaderboard':
        return [
          'How is the weekly leaderboard calculated?',
          'What rewards do top 3 campus contributors get?',
          'How much XP do I earn per gig and mentoring session?'
        ];
      case 'trending':
        return [
          'Which skills are predicted to surge next month?',
          'What is the average hourly budget for Next.js gigs?',
          'How do I add a new skill milestone to my profile?'
        ];
      case 'reputation':
        return [
          'How to climb from Gold to Platinum Tier (80+)?',
          'Why does email verification boost my reputation score?',
          'What are the benefits of 0% platform fee in Platinum?'
        ];
      default:
        return [
          'How can I earn ₹15,000 this month on campus?',
          'Recommend the best gigs for my skills',
          'How does the CampusGig ecosystem work?'
        ];
    }
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send to server-side AI endpoint
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            text: m.text
          })),
          context: {
            currentPage,
            userName: currentUser.name,
            college: currentUser.college,
            reputationScore: currentUser.reputationScore,
            couponsBalance: currentUser.couponsBalance,
            activeGigsCount: gigs.length,
            availableMentorsCount: mentors.length,
            competitionsCount: competitions.length
          }
        })
      });

      let botReply = '';
      let actions: Message['actions'] = [];

      if (response.ok) {
        const data = await response.json();
        botReply = data.reply || "I'm here to assist you with gigs, mentors, and campus career growth!";
      } else {
        botReply = getLocalSmartResponse(query);
      }

      // Generate helpful interactive action pills based on query keywords
      const lower = query.toLowerCase();
      if (lower.includes('gig') || lower.includes('job') || lower.includes('earn') || lower.includes('proposal')) {
        actions = [
          { label: 'Explore Gigs Marketplace', page: 'gigs', icon: '💼' },
          { label: 'Post a New Gig', page: 'post_gig', icon: '➕' }
        ];
      } else if (lower.includes('mentor') || lower.includes('coupon') || lower.includes('learn')) {
        actions = [
          { label: 'Browse Verified Mentors', page: 'mentors', icon: '🤝' },
          { label: 'My Coupons Balance', page: 'coupons', icon: '🎟️' }
        ];
      } else if (lower.includes('hackathon') || lower.includes('competition') || lower.includes('prize')) {
        actions = [
          { label: 'View Active Competitions', page: 'competitions', icon: '🏆' },
          { label: 'Campus Leaderboard', page: 'leaderboard', icon: '🥇' }
        ];
      } else if (lower.includes('skill') || lower.includes('trend')) {
        actions = [
          { label: 'Trending Skills Radar', page: 'trending', icon: '📈' },
          { label: 'Campus Analytics', page: 'insights', icon: '📊' }
        ];
      } else if (lower.includes('reputation') || lower.includes('trust') || lower.includes('tier')) {
        actions = [
          { label: 'Trust Ladder & Badges', page: 'reputation', icon: '🛡️' },
          { label: 'Update My Profile', page: 'profile', icon: '👤' }
        ];
      }

      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: actions.length > 0 ? actions : undefined
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Fallback local smart response if network/server is unavailable
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: getLocalSmartResponse(query),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalSmartResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('proposal')) {
      return `### 📝 Winning Proposal Framework:\n1. **Greeting**: Use client's name or reference their specific requirement.\n2. **Proof of Work**: Share a 1-sentence link to your past GitHub repo or Figma design.\n3. **Milestone Plan**: e.g., Day 1: Architecture/Wireframe, Day 3: MVP Demo, Day 5: Final Handover.\n4. **Call to Action**: "I can jump on a 5-min Google Meet to review requirements right away."`;
    }
    if (q.includes('earn') || q.includes('money')) {
      return `### 💰 30-Day Campus Earning Roadmap (Target: ₹15,000+):\n- **Week 1**: Complete 2 quick gigs in Web/Design (₹3,000 - ₹5,000).\n- **Week 2**: Offer 3 peer mentorship sessions in Python/React (Earn Reputation & Tips).\n- **Week 3**: Submit a solution to the weekly Hackathon (Prizes up to ₹50,000).\n- **Week 4**: Apply to verified summer internships on the Career Hub.`;
    }
    return `### 🚀 Campus AI Career Advice:\nI am ready to help you navigate campus gigs, peer mentorship, hackathons, and reputation badges. Ask me for proposal templates, gig matches, or mentor recommendations!`;
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('info', 'Copied to Clipboard', 'Message text copied.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        sender: 'bot',
        text: `✨ Chat history cleared! How can I assist your campus journey today?`,
        timestamp: 'Just now',
        actions: [
          { label: 'Browse Top Gigs', page: 'gigs', icon: '💼' },
          { label: 'Find a Mentor', page: 'mentors', icon: '🤝' }
        ]
      }
    ]);
  };

  // Helper to format markdown bold and lists nicely
  const formatBotText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs text-slate-800 leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-sm text-indigo-950 mt-2 mb-1 flex items-center gap-1.5">
                {line.replace('### ', '')}
              </h4>
            );
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{renderFormattedLine(line.substring(2))}</span>
              </div>
            );
          }
          if (/^\d+\.\s/.test(line)) {
            const num = line.match(/^\d+\./)?.[0];
            const content = line.replace(/^\d+\.\s/, '');
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-2">
                <span className="text-indigo-700 font-bold text-[11px]">{num}</span>
                <span>{renderFormattedLine(content)}</span>
              </div>
            );
          }
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }
          return <p key={idx}>{renderFormattedLine(line)}</p>;
        })}
      </div>
    );
  };

  const renderFormattedLine = (str: string) => {
    // Basic bold replacement
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* 1. Sideways Floating Toggle Tab / Button (Visible when closed) */}
      {!isOpen && (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            id="chatbot-sideways-toggle-btn"
            className="group flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 text-white pl-3.5 pr-4 py-3 rounded-l-2xl shadow-2xl hover:pl-4 transition-all duration-300 border-y border-l border-indigo-400/50 hover:shadow-indigo-500/30"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-300 group-hover:rotate-12 transition-transform shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-indigo-700"></span>
            </div>
            
            <div className="text-left hidden sm:block">
              <span className="text-[11px] font-extrabold uppercase tracking-wider block text-indigo-200">
                Campus AI
              </span>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                Ask Assistant
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        </div>
      )}

      {/* 2. Sideways Sliding Chatbot Drawer */}
      {isOpen && (
        <div
          id="sideways-chatbot-drawer"
          className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl border-l border-indigo-100 flex flex-col transition-all duration-300 animate-in slide-in-from-right ${
            isExpanded ? 'w-full sm:w-[540px]' : 'w-full sm:w-[410px]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white flex items-center justify-between border-b border-indigo-700/50 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-amber-300 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sm text-white">Campus AI Advisor</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-indigo-200 flex items-center gap-1.5">
                  <span>Gemini 3.7 Pro Engine</span>
                  <span>•</span>
                  <span>📍 {currentPage.toUpperCase()}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Clear conversation"
                className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-200 hover:text-white transition"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse width' : 'Expand width'}
                className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-200 hover:text-white transition hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close assistant"
                className="p-1.5 rounded-xl hover:bg-white/10 text-indigo-200 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Quick Status Bar */}
          <div className="px-4 py-2 bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-3">
              <span className="font-bold text-indigo-900 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Score: <strong>{currentUser.reputationScore}/100</strong>
              </span>
              <span className="font-bold text-amber-800 flex items-center gap-1">
                <Ticket className="w-3.5 h-3.5 text-amber-600" />
                Coupons: <strong>{currentUser.couponsBalance}</strong>
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold">
              {currentUser.college.split(' ')[0]} Campus
            </span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[90%] p-3.5 rounded-2xl text-xs relative group shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-white border border-indigo-100/80 rounded-bl-xs text-slate-800'
                  }`}
                >
                  {msg.sender === 'bot' ? (
                    <div>{formatBotText(msg.text)}</div>
                  ) : (
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}

                  {/* Copy Button */}
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="absolute top-2 right-2 p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-500 opacity-0 group-hover:opacity-100 transition"
                      title="Copy message"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>

                {/* Quick Action Navigation Pills attached to Bot Response */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          navigateTo(act.page, act.itemId);
                          if (window.innerWidth < 640) {
                            setIsOpen(false);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[11px] rounded-xl shadow-2xs hover:border-indigo-400 transition"
                      >
                        <span>{act.icon}</span>
                        <span>{act.label}</span>
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                      </button>
                    ))}
                  </div>
                )}

                <span className="text-[10px] text-slate-400 px-1 mt-1 font-medium">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-indigo-600 p-3 bg-white border border-indigo-100 rounded-2xl max-w-[70%] shadow-xs animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                <span className="font-semibold">Campus AI is crafting recommendations...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Contextual Suggested Prompt Chips */}
          <div className="p-3 bg-white border-t border-indigo-50 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider px-1">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" />
                Suggested for {currentPage}
              </span>
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {getContextPrompts().map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100 text-indigo-900 font-semibold text-[11px] border border-indigo-100/80 whitespace-nowrap transition flex-shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-indigo-100 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about gigs, mentors, proposals, hackathons..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-50 border border-indigo-100 focus:border-indigo-500 focus:bg-white text-xs text-slate-900 rounded-xl px-3.5 py-2.5 outline-none transition placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white rounded-xl transition shadow-xs flex-shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
