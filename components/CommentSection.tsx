import React, { useState } from 'react';
import { Comment } from '../types';
import { User, Send } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText('');
  };

  return (
    <div className="flex flex-col h-[400px] bg-pump-card border border-gray-800 rounded-lg">
      <div className="p-3 border-b border-gray-800">
        <h3 className="font-bold text-gray-300">Live Chat</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-2 items-start">
            <div className="h-6 w-6 rounded bg-gray-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-gray-300 bg-gray-800 px-1 rounded">{comment.user}</span>
                    <span className="text-[10px] text-gray-600">{comment.timestamp}</span>
                </div>
                {comment.type === 'buy' ? (
                     <div className="text-sm text-pump-green font-bold">
                        BOUGHT {comment.amount} SOL
                     </div>
                ) : (
                    <p className="text-sm text-gray-400 leading-tight break-all">
                        {comment.text}
                    </p>
                )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 flex gap-2">
        <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-pump-green"
            placeholder="Say something nice..."
        />
        <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2"
        >
            <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default CommentSection;