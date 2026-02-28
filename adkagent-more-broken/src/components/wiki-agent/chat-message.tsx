"use client";

import { cn } from "@/lib/utils";
import { ExternalLink, User, Bot, Globe } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  sources?: string[];
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex flex-col max-w-[75%] gap-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <Card
          className={cn(
            "p-4 text-sm leading-relaxed shadow-sm",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground"
          )}
        >
          <CardContent className="p-0">{message.content}</CardContent>
        </Card>

        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.sources.map((source, idx) => (
              <a
                key={idx}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border"
              >
                <Globe className="h-3 w-3" />
                Source {idx + 1}
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}