"use client";

import { useState } from "react";
import { answerQuestionWithWikipedia } from "@/ai/flows/answer-question-with-wikipedia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
};

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await answerQuestionWithWikipedia({
        question,
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: response.answer,
        sources: response.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong while fetching the answer.",
        },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <Card key={index} className="shadow-sm">
            <CardContent className="p-4 space-y-2">
              <p className="text-sm font-semibold">
                {msg.role === "user" ? "You" : "WikiAgent"}
              </p>
              <p className="text-sm">{msg.content}</p>

              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Sources:
                  </p>
                  <ul className="list-disc list-inside text-xs">
                    {msg.sources.map((url, i) => (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {loading && (
          <p className="text-sm text-muted-foreground">Thinking...</p>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Ask a Wikipedia-based question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button onClick={handleAsk} disabled={loading}>
          Ask
        </Button>
      </div>
    </div>
  );
}