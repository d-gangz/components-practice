"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip } from "lucide-react";
import { FileAttachment } from "@/components/file-attachment";

export default function Component() {
  // State management for the chat input
  // message: stores the current text input value
  // attachments: stores the currently selected files (if any)
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  // Refs to directly access DOM elements
  // textareaRef: used for auto-resizing the input field
  // fileInputRef: used to programmatically trigger file selection
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to dynamically adjust textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get accurate scrollHeight measurement.
      // Without this, scrollHeight would be based on previous height.
      textarea.style.height = "auto";

      // Define size constraints
      const lineHeight = 24; // Height of each text line in pixels
      const minHeight = lineHeight * 3; // Minimum height: 3 lines (72px)
      const maxHeight = lineHeight * 10; // Maximum height: 10 lines (240px)

      // Calculate new height within constraints
      // scrollHeight is the height of the textarea content that textArea needs to show all content.
      const scrollHeight = textarea.scrollHeight;
      const newHeight = Math.max(Math.min(scrollHeight, maxHeight), minHeight);

      // Apply the calculated height
      textarea.style.height = `${newHeight}px`;
    }
  };

  // Automatically adjust textarea height whenever message content changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  // Prevent default drag behavior and enable drop zone
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle file drop events
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  // Handle file selection through the file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  // Clear the current attachment and reset file input
  const handleRemoveAttachment = (fileToRemove: File) => {
    setAttachments((prev) => prev.filter((file) => file !== fileToRemove));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { message, attachments });
    // TODO: Implement backend integration here
    setMessage("");
    setAttachments([]);
  };

  return (
    // Main container card with fixed width and centered alignment
    <Card className="w-[800px] mx-auto shadow-none border-neutral-200 overflow-hidden">
      <CardContent className="pb-4 px-0">
        <form onSubmit={handleSubmit}>
          {/* Attachment preview section */}
          {attachments.length > 0 && (
            <div className="flex flex-row flex-wrap gap-2 px-4 py-4 bg-neutral-50">
              {attachments.map((file, index) => (
                <FileAttachment
                  key={`${file.name}-${index}`}
                  file={file}
                  onRemove={handleRemoveAttachment}
                />
              ))}
            </div>
          )}

          {/* Text input area with drag-and-drop support */}
          <div
            className="relative rounded-md"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Auto-resizing textarea with custom styling */}
            <Textarea
              ref={textareaRef}
              placeholder="Ask v0 a question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full resize-none overflow-y-auto shadow-none border-none 
                focus-visible:ring-0 focus-visible:ring-offset-0 px-4 pt-4 -mr-2 
                font-sans !text-base min-h-[72px] max-h-[240px] leading-6
                scrollbar-thin scrollbar-thumb-gray-300 !scrollbar-track-none 
                hover:scrollbar-thumb-gray-400 transition-colors"
            />
            {/* 
              <Textarea
                className="
                resize-none           // Prevents manual resizing
                overflow-y-auto      // Adds vertical scrollbar when needed
                min-h-[72px]        // Minimum height (3 lines)
                max-h-[240px]       // Maximum height (10 lines)
                leading-6           // Line height of 24px (6 * 4)
                scrollbar-thin      // Custom scrollbar styling
              "
            />
              */}
          </div>

          {/* Bottom toolbar with file attachment and send buttons */}
          <div className="flex justify-between items-center px-4">
            <div className="flex">
              {/* Hidden file input triggered by the paperclip button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              {/* File attachment button */}
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            {/* Submit button */}
            <Button type="submit">Send</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
