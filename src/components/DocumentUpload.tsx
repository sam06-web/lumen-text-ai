import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "completed" | "error";
}

const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "uploading" as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: "completed" as const }
              : f
          )
        );
        toast({
          title: "Document processed",
          description: `${file.name} is ready for questions!`,
        });
      }, 2000);
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc', '.docx'],
    },
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-medium border-0">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragActive
                ? "border-academic-primary bg-academic-primary/5 scale-102"
                : "border-academic-muted hover:border-academic-primary hover:bg-academic-primary/5"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-academic-primary/10 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-academic-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-academic-text">
                  {isDragActive ? "Drop your files here" : "Upload Study Materials"}
                </h3>
                <p className="text-academic-text/70">
                  Drag & drop PDFs, Word docs, or text files
                </p>
                <p className="text-sm text-academic-text/50">
                  Maximum file size: 20MB
                </p>
              </div>
              <Button className="bg-academic-primary hover:bg-academic-primary/90">
                Browse Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <h4 className="font-semibold text-academic-text mb-4">Uploaded Documents</h4>
            <div className="space-y-3">
              {files.map(file => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-academic-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-academic-primary/20 rounded flex items-center justify-center">
                      <FileText className="w-4 h-4 text-academic-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-academic-text">{file.name}</p>
                      <p className="text-xs text-academic-text/60">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {file.status === "uploading" && (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-academic-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-academic-text/70">Processing...</span>
                      </div>
                    )}
                    {file.status === "completed" && (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-academic-secondary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="text-xs text-academic-secondary">Ready</span>
                      </div>
                    )}
                    {file.status === "error" && (
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-destructive" />
                        <span className="text-xs text-destructive">Error</span>
                      </div>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      className="h-6 w-6 p-0 hover:bg-destructive/20"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentUpload;