import Avatar from "@/components/ui/Avatar";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Message } from "@/lib/types";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderName: string;
  senderAvatar: string;
}

export default function MessageBubble({
  message,
  isOwn,
  senderName,
  senderAvatar,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-3 max-w-[85%]",
        isOwn ? "ml-auto flex-row-reverse" : ""
      )}
    >
      <Avatar src={senderAvatar} alt={senderName} size="sm" className="mt-1" />
      <div>
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-sm",
            isOwn
              ? "bg-emerald-500 text-white rounded-br-md"
              : "bg-white border border-gray-100 text-gray-900 rounded-bl-md"
          )}
        >
          {message.content}
        </div>
        <p
          className={cn(
            "text-[11px] text-gray-400 mt-1",
            isOwn ? "text-right" : ""
          )}
        >
          {formatRelativeTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
