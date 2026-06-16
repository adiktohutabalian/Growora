"use client";

import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Conversation } from "@/lib/types";

interface ChatListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function ChatList({
  conversations,
  activeId,
  onSelect,
}: ChatListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {conversations.map((conv) => {
        const other = conv.participants[1]; // Assuming current user is first
        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left",
              activeId === conv.id && "bg-emerald-50 hover:bg-emerald-50"
            )}
          >
            <Avatar src={other.avatar} alt={other.name} size="md" />
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
                  {other.name}
                </h4>
                <span className="text-xs text-gray-400 shrink-0 ml-2">
                  {formatRelativeTime(conv.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="success" size="sm">
                  {conv.skillExchange.skill1}
                </Badge>
                <span className="text-gray-400 text-xs">↔</span>
                <Badge variant="info" size="sm">
                  {conv.skillExchange.skill2}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {conv.lastMessage}
              </p>
            </div>
            {conv.unreadCount > 0 && (
              <span className="w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                {conv.unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
