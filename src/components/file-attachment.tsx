import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect } from "react";

interface FileAttachmentProps {
  file: File;
  onRemove: (file: File) => void;
}

export function FileAttachment({ file, onRemove }: FileAttachmentProps) {
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="relative max-w-[160px] bg-white border border-neutral-100 p-2 rounded-md">
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(file)}
              className="absolute -top-2 -right-2 h-6 w-6 bg-white border border-neutral-100 hover:bg-neutral-100 rounded-full"
            >
              <X className="h-3 w-3 text-neutral-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-2">
        <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 bg-neutral-100">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm text-neutral-700 font-medium truncate">
            {file.name}
          </span>
          <span className="text-xs text-neutral-500 truncate">
            {(file.size / 1024).toFixed(2)}kB
          </span>
        </div>
      </div>
    </div>
  );
}
