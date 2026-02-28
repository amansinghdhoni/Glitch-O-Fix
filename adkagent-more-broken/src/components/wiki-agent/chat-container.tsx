"use client";

import { useState, useRef, useEffect } from "react";
import { answerQuestionWithWikipedia } from "@/ai/flows/answer-question-with-wikipedia";
import { ChatMessage, type Message } from "./chat-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles, BookOpen } from "lucide-react";

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await answerQuestionWithWikipedia({ question });
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.answer,
        sources: response.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I encountered a hiccup while searching. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="flex flex-col h-[85vh] w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative ring-1 ring-slate-900/5">
      
      {/* 1. Header / Top Bar */}
      <div className="absolute top-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-white to-transparent z-10">
        <div className="flex items-center gap-2 px-2 opacity-50">
          <BookOpen className="h-4 w-4" />
          <span className="text-xs font-medium tracking-widest uppercase">WikiAgent</span>
        </div>
      </div>

      {/* 2. Chat History Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 pt-16 space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
             <div className="h-20 w-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center shadow-lg transform rotate-3 transition-transform hover:rotate-6">
                <Sparkles className="h-10 w-10 text-white" />
             </div>
             <div className="space-y-2">
               <h3 className="text-2xl font-bold text-slate-900 tracking-tight">How can I help you?</h3>
               <p className="text-slate-500 max-w-sm mx-auto">
                 I can research any topic on Wikipedia and summarize it for you instantly.
               </p>
             </div>
          </div>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-3 p-4 text-sm text-slate-500 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
               <Sparkles className="h-4 w-4 animate-spin text-indigo-500" />
            </div>
            <span>Analyzing knowledge base...</span>
          </div>
        )}
      </div>

      {/* 3. Floating Input Area */}
      <div className="p-6 bg-gradient-to-t from-white via-white to-transparent">
        <div className="flex gap-2 items-center bg-white p-2 rounded-full border border-slate-200 shadow-xl ring-4 ring-slate-50 focus-within:ring-indigo-50 focus-within:border-indigo-200 transition-all">
          <Input
            className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent px-4 text-base h-12"
            placeholder="Ask anything (e.g., 'Who is Elon Musk?')"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            disabled={loading}
          />
          <Button 
            onClick={handleAsk} 
            disabled={loading || !question.trim()}
            size="icon"
            className="rounded-full h-10 w-10 shrink-0 bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}