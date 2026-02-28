'use client';

import { useState } from 'react';
import { answerQuestionWithWikipedia } from '@/ai/flows/answer-question-with-wikipedia';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
};

export default function HomePage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const result = await answerQuestionWithWikipedia({ question });

      const assistantMessage: Message = {
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong while fetching the answer.',
        },
      ]);
    }

    setQuestion('');
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6 bg-background">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        WikiAgent
      </h1>

      <div className="w-full max-w-2xl space-y-4">

        {/* Chat Messages */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 bg-card rounded-xl shadow">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              <p>{msg.content}</p>

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 text-sm">
                  <p className="font-semibold">Sources:</p>
                  <ul className="list-disc list-inside">
                    {msg.sources.map((url, i) => (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about anything..."
            className="flex-1 p-2 rounded-lg border border-input"
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>
      </div>
    </main>
  );
}