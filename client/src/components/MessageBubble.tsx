import { format } from "date-fns";
import type { Message } from "@shared/schema";

interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
}

export function MessageBubble({ message, isSender }: MessageBubbleProps) {
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'} max-w-[75%] sm:max-w-md`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isSender
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          }`}
          data-testid={`message-${message.id}`}
        >
          <p className="text-base break-words">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {format(message.timestamp, 'h:mm a')}
        </span>
      </div>
    </div>
  );
}
