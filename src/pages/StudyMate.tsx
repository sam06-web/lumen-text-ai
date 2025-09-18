import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, MessageSquare, Upload, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import DocumentUpload from "@/components/DocumentUpload";
import ChatInterface from "@/components/ChatInterface";

const StudyMate = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-academic-text mb-4">
              Transform Your Study Experience
            </h2>
            <p className="text-lg text-academic-text/70 max-w-2xl mx-auto">
              Upload your PDFs, ask questions, and get instant, contextual answers from your study materials
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-academic-muted">
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Documents</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Study Chat</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4" />
                <span>Study Insights</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <DocumentUpload />
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-academic-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-academic-primary" />
                    </div>
                    <h4 className="font-semibold text-academic-text mb-2">Multi-Format Support</h4>
                    <p className="text-sm text-academic-text/70">
                      Upload PDFs, Word documents, and text files
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-academic-secondary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-academic-secondary" />
                    </div>
                    <h4 className="font-semibold text-academic-text mb-2">Natural Language Q&A</h4>
                    <p className="text-sm text-academic-text/70">
                      Ask questions in plain English and get contextual answers
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-academic-accent/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-academic-accent" />
                    </div>
                    <h4 className="font-semibold text-academic-text mb-2">Smart Insights</h4>
                    <p className="text-sm text-academic-text/70">
                      Get summaries, key points, and study recommendations
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="chat">
              <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
                <div className="lg:col-span-2">
                  <ChatInterface />
                </div>
                <div className="space-y-6">
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-academic-text mb-4">Quick Actions</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-3 rounded-lg bg-academic-muted/50 hover:bg-academic-muted transition-colors text-sm">
                          Summarize this chapter
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-academic-muted/50 hover:bg-academic-muted transition-colors text-sm">
                          Explain key concepts
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-academic-muted/50 hover:bg-academic-muted transition-colors text-sm">
                          Create study questions
                        </button>
                        <button className="w-full text-left p-3 rounded-lg bg-academic-muted/50 hover:bg-academic-muted transition-colors text-sm">
                          Find related topics
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-academic-text mb-4">Study Tips</h4>
                      <div className="space-y-3 text-sm text-academic-text/70">
                        <p>💡 Be specific in your questions for better answers</p>
                        <p>📚 Upload related documents for comprehensive insights</p>
                        <p>🎯 Ask for examples to understand complex concepts</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="insights">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-academic-text mb-4">Study Progress</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-academic-text/70">Documents Processed</span>
                        <span className="font-medium text-academic-text">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-academic-text/70">Questions Asked</span>
                        <span className="font-medium text-academic-text">0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-academic-text/70">Study Sessions</span>
                        <span className="font-medium text-academic-text">0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-academic-text mb-4">Recommended Actions</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-academic-primary/5 rounded-lg border border-academic-primary/20">
                        <p className="text-sm font-medium text-academic-primary">
                          Upload your first document to get started
                        </p>
                      </div>
                      <div className="p-3 bg-academic-muted/50 rounded-lg">
                        <p className="text-sm text-academic-text/70">
                          Try asking about key concepts once you upload materials
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default StudyMate;