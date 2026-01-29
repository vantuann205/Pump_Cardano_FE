import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Book, Shield, Zap, ChevronRight, User } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'user' | 'agent'}[]>([
    { id: 1, text: 'Hello! Welcome to Pump.Cardano support. How can we help you today?', sender: 'agent' }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now(), text: inputText, sender: 'user' as const };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Mock auto-reply
    setTimeout(() => {
        setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            text: "Thanks for your message. An agent (probably an AI on Hydra) will check this shortly.", 
            sender: 'agent' 
        }]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 animate-fade-in">
      <h1 className="text-3xl font-black text-white mb-8">Support Center</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: FAQ & Info */}
        <div className="lg:col-span-2 space-y-8">
            {/* Quick Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-pump-card p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-colors group cursor-pointer">
                    <Book className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-2">How it works</h3>
                    <p className="text-xs text-gray-400">Learn about bonding curves, Hydra L2, and fair launches.</p>
                </div>
                <div className="bg-pump-card p-6 rounded-xl border border-gray-800 hover:border-green-500/50 transition-colors group cursor-pointer">
                    <Shield className="w-8 h-8 text-green-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-2">Safety</h3>
                    <p className="text-xs text-gray-400">How we prevent rugs and ensure fair distribution.</p>
                </div>
                <div className="bg-pump-card p-6 rounded-xl border border-gray-800 hover:border-yellow-500/50 transition-colors group cursor-pointer">
                    <Zap className="w-8 h-8 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-white mb-2">Fees</h3>
                    <p className="text-xs text-gray-400">Understanding transaction costs on Cardano L2.</p>
                </div>
            </div>

            {/* FAQ List */}
            <div className="bg-pump-card rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                    <h2 className="font-bold text-white">Frequently Asked Questions</h2>
                </div>
                <div className="divide-y divide-gray-800">
                    {[
                        "What happens when the curve reaches 100%?",
                        "How do I bridge funds to Hydra?",
                        "Is there a developer wallet allocation?",
                        "Why is my transaction pending?"
                    ].map((q, i) => (
                        <div key={i} className="p-4 hover:bg-gray-800/50 cursor-pointer flex justify-between items-center group">
                            <span className="text-sm text-gray-300 group-hover:text-white">{q}</span>
                            <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-6">
                <h3 className="font-bold text-blue-400 mb-2">Contact Email</h3>
                <p className="text-sm text-gray-400 mb-4">For partnership inquiries or serious bug reports.</p>
                <code className="bg-black/30 px-3 py-2 rounded text-blue-200 text-sm">support@pump.cardano</code>
            </div>
        </div>

        {/* Right Column: Live Chat Widget */}
        <div className="lg:col-span-1 h-[600px] flex flex-col">
            <div className="flex-1 bg-pump-card border border-gray-800 rounded-xl flex flex-col overflow-hidden shadow-2xl">
                <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Live Support</h3>
                        <p className="text-xs text-gray-400">Typical reply time: 5m</p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                                msg.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSend} className="p-3 bg-gray-900 border-t border-gray-800 flex gap-2">
                    <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..." 
                        className="flex-1 bg-gray-800 text-white text-sm rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-blue-500 transition-colors"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors">
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>

      </div>
    </div>
  );
};

export default SupportPage;