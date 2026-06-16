"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { formatRelativeTime } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function RecentMessages() {
  const { user } = useApp();
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/conversations?userId=${user.id}`)
      .then((res) => res.json())
      .then(setConversations)
      .catch(() => {});
  }, [user?.id]);

  const recentConversations = conversations.slice(0, 3);

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
        <Link
          href="/chat"
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          View all
        </Link>
      </div>
      <div className="space-y-3">
        {recentConversations.map((conv) => {
          const other = conv.participants?.find(
            (p: any) => p.userId !== user?.id
          ) || conv.participants?.[1];
          const otherUser = other?.user;

          const lastMsg = conv.messages?.[conv.messages.length - 1];

          return (
            <Link
              key={conv.id}
              href="/chat"
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors"
            >
              <div className="relative">
                <Avatar src={otherUser?.avatar} alt={otherUser?.fullName} size="md" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="font-medium text-gray-900 truncate text-sm">
                    {otherUser?.fullName}
                  </p>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">
                    {lastMsg ? formatRelativeTime(lastMsg.createdAt) : ""}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {lastMsg?.content}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
