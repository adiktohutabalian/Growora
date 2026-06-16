"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useApp } from "@/context/AppContext";
import { formatRelativeTime, cn } from "@/lib/utils";
import {
  Bell,
  ArrowLeftRight,
  Check,
  MessageSquare,
  Star,
  Users,
  Award,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";

const typeIcons: Record<string, React.ElementType> = {
  swap_request: ArrowLeftRight,
  swap_accepted: Check,
  swap_completed: Check,
  message: MessageSquare,
  review: Star,
  match: Users,
  system: Award,
};

const typeColors: Record<string, string> = {
  swap_request: "bg-blue-50 text-blue-600",
  swap_accepted: "bg-emerald-50 text-emerald-600",
  swap_completed: "bg-emerald-50 text-emerald-600",
  message: "bg-purple-50 text-purple-600",
  review: "bg-amber-50 text-amber-600",
  match: "bg-pink-50 text-pink-600",
  system: "bg-gray-50 text-gray-600",
};

export default function NotificationsPage() {
  const { user } = useApp();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/notifications?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const filtered =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">
            Stay updated with your skill swaps and community activity
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4 mr-1.5" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1",
            filter === "all"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1",
            filter === "unread"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Unread
          {unreadCount > 0 && (
            <span className="ml-1.5 text-xs bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification list */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((notif) => {
            const Icon = typeIcons[notif.type] || Bell;
            const colorClass = typeColors[notif.type] || "bg-gray-50 text-gray-600";

            return (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer",
                  !notif.read
                    ? "bg-white border-emerald-100 shadow-card hover:shadow-card-hover"
                    : "bg-gray-50 border-gray-100 hover:bg-white"
                )}
              >
                {/* Icon or avatar */}
                {notif.avatar ? (
                  <Avatar src={notif.avatar} alt="" size="md" />
                ) : (
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                      colorClass
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className={cn(
                        "text-sm truncate",
                        !notif.read
                          ? "font-semibold text-gray-900"
                          : "font-medium text-gray-700"
                      )}
                    >
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {notif.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {formatRelativeTime(notif.createdAt)}
                  </p>
                </div>

                {/* Link arrow */}
                {notif.link && (
                  <Link
                    href={notif.link}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium shrink-0 self-center"
                  >
                    View
                  </Link>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No notifications</p>
            <p className="text-gray-400 text-sm mt-2">
              {filter === "unread"
                ? "You're all caught up!"
                : "Notifications will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
