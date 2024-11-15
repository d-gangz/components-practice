"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, Paperclip } from "lucide-react";

export default function Component() {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Calculate line height (assuming 24px per line)
      const lineHeight = 24;
      const minHeight = lineHeight * 3; // 3 lines minimum (72px)
      const maxHeight = lineHeight * 10; // 10 lines maximum (240px)

      // Get the scroll height and calculate new height
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.max(Math.min(scrollHeight, maxHeight), minHeight);

      textarea.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachment(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { message, attachment });
    // Here you would typically send the message and attachment to your backend
    setMessage("");
    setAttachment(null);
  };

  return (
    <Card className="w-[800px] mx-auto shadow-none border-neutral-200">
      <CardContent className="py-4 px-0">
        <form onSubmit={handleSubmit} className="space-y-2">
          {attachment && (
            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
              <div className="flex items-center space-x-2">
                <Paperclip className="h-4 w-4" />
                <span className="text-sm">{attachment.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(attachment.size / 1024).toFixed(2)}kB
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRemoveAttachment}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div
            className="relative rounded-md"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Ask v0 a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none overflow-y-auto shadow-none border-none 
                focus-visible:ring-0 focus-visible:ring-offset-0 px-4 pt-0 -mr-2 
                font-sans !text-base min-h-[72px] max-h-[240px] leading-6
                scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent 
                hover:scrollbar-thumb-gray-400 transition-colors"
            />
          </div>
          <div className="flex justify-between items-center px-4">
            <div className="flex">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
