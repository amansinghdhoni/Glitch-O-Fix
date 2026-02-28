"use client";

import { cn } from "@/lib/utils";
import { ExternalLink, User, Sparkles, Globe } from "lucide-react"; // Swapped Bot for Sparkles
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        "flex w-full gap-4 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <Avatar className={cn("h-8 w-8 border", isUser ? "border-primary/20" : "border-indigo-500/20")}>
        <AvatarFallback className={cn("text-xs", isUser ? "bg-primary/10 text-primary" : "bg-indigo-50 text-indigo-600")}>
          {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      {/* Message Bubble */}
      <div className={cn("flex flex-col max-w-[80%] gap-2", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-none"
              : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
          )}
        >
          {message.content}
        </div>

        {/* Sources Section (Only for Assistant) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1 pl-1">
            {message.sources.map((source, idx) => (
              <a
                key={idx}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                <Globe className="h-3 w-3" />
                Source {idx + 1}
                <ExternalLink className="h-2.5 w-2.5 opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}