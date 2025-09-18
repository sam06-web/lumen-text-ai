import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your StudyMate AI assistant. Upload your documents and ask me anything about them. I can help you understand complex concepts, summarize content, and answer specific questions about your study materials.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I understand you're asking about "${input.trim()}". Based on your uploaded documents, I can provide relevant information. However, to give you accurate answers, please make sure you've uploaded your study materials first. Once you do, I'll be able to search through them and provide specific, contextual answers with source references.`,
        timestamp: new Date(),
        sources: ["Document 1, Page 3", "Document 2, Page 12"],
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-medium">
      <CardContent className="flex-1 p-0 flex flex-col">
        <div className="p-4 border-b bg-gradient-card">
          <h3 className="font-semibold text-academic-text">Study Chat</h3>
          <p className="text-sm text-academic-text/70">Ask questions about your documents</p>
        </div>

        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 ${
                    message.type === "user"
                      ? "bg-academic-primary text-white ml-12"
                      : "bg-academic-muted text-academic-text mr-12"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                      message.type === "user" 
                        ? "bg-white/20" 
                        : "bg-academic-primary/20"
                    }`}>
                      {message.type === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-academic-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.sources && (
                        <div className="mt-2 pt-2 border-t border-academic-primary/20">
                          <p className="text-xs text-academic-text/70 font-medium mb-1">Sources:</p>
                          <div className="flex flex-wrap gap-1">
                            {message.sources.map((source, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 bg-academic-primary/10 text-academic-primary text-xs rounded-md"
                              >
                                <FileText className="w-3 h-3 mr-1" />
                                {source}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-academic-text/50 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-academic-muted text-academic-text rounded-xl px-4 py-3 mr-12">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-academic-primary/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-academic-primary" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-academic-primary/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-academic-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-academic-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-academic-muted/30">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your documents..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="bg-academic-primary hover:bg-academic-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-academic-text/50 mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;