'use client';

// We import the ChatContainer which now handles the logic (state, API calls)
// This keeps this file clean and focused on the visual layout.
import ChatContainer from '@/components/wiki-agent/chat-container';

export default function HomePage() {
  return (
    // 1. MAIN CONTAINER: Sets the full-screen gradient background
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 p-4 md:p-8">
      
      {/* 2. BACKGROUND DECOR: Adds subtle glowing orbs (Perplexity/Gemini style) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-200/20 blur-[100px]" />
      </div>

      {/* 3. CONTENT WRAPPER: Centers the chat interface */}
      <div className="z-10 w-full max-w-5xl">
        <ChatContainer />
      </div>
    </main>
  );
}