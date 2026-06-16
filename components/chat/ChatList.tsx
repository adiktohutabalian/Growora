"use client";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

interface ChatListProps {
  conversations: any[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ChatList({
  conversations,
  activeId,
  onSelect,
}: ChatListProps) {
  const { user: currentUser } = useApp();

  return (
    <div className="divide-y divide-gray-100">
      {conversations.map((conv) => {
        // Find the other participant
        const other = conv.participants?.find(
          (p: any) => p.userId !== currentUser?.id
        ) || conv.participants?.[1];
        const otherUser = other?.user;

        // Get last message
        const lastMsg = conv.messages?.[conv.messages.length - 1];

        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left",
              activeId === conv.id && "bg-emerald-50 hover:bg-emerald-50"
            )}
          >
            <Avatar src={otherUser?.avatar} alt={otherUser?.fullName} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <h4
                  className={cn(
                    "font-medium truncate",
                    activeId === conv.id
                      ? "text-emerald-700"
                      : "text-gray-900"
                  )}
                >
                  {otherUser?.fullName}
                </h4>
                <span className="text-xs text-gray-400 shrink-0 ml-2">
                  {lastMsg ? formatRelativeTime(lastMsg.createdAt) : ""}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {lastMsg?.content}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
