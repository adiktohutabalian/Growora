"use client";

import { useState, useRef, useEffect } from "react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import MessageBubble from "./MessageBubble";
import ScheduleSessionModal from "./ScheduleSessionModal";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";
import { Send, Paperclip, Calendar, ArrowLeft, Image, FileText, X } from "lucide-react";

interface ChatWindowProps {
  conversation: any;
  onBack?: () => void;
}

export default function ChatWindow({ conversation, onBack }: ChatWindowProps) {
  const { user: currentUser } = useApp();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(conversation.messages || []);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const attachRef = useRef<HTMLDivElement>(null);

  const other = conversation.participants?.find(
    (p: any) => p.userId !== currentUser?.id
  ) || conversation.participants?.[1];
  const otherUser = other?.user;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        attachRef.current &&
        !attachRef.current.contains(e.target as Node)
      ) {
        setShowAttachMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = {
      id: `m${Date.now()}`,
      senderId: currentUser?.id,
      content: message,
      createdAt: new Date().toISOString(),
      type: "text" as const,
    };
    setMessages([...messages, newMsg]);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (type: "image" | "file") => {
    setShowAttachMenu(false);
    const newMsg = {
      id: `m${Date.now()}`,
      senderId: currentUser?.id,
      content:
        type === "image"
          ? "📷 Shared an image"
          : "📎 Shared a file",
      createdAt: new Date().toISOString(),
      type: "file" as const,
    };
    setMessages([...messages, newMsg]);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-100 bg-white">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          )}
          <Avatar src={otherUser?.avatar} alt={otherUser?.fullName} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {otherUser?.fullName}
            </h3>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            title="Schedule a session"
          >
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 bg-gray-50">
          {messages.map((msg: any) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.senderId === currentUser?.id}
              senderName={
                msg.senderId === currentUser?.id
                  ? currentUser?.fullName || ""
                  : otherUser?.fullName || ""
              }
              senderAvatar={
                msg.senderId === currentUser?.id
                  ? currentUser?.avatar || ""
                  : otherUser?.avatar || ""
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-white">
          <div className="flex items-end gap-3">
            {/* Attachment button */}
            <div className="relative" ref={attachRef}>
              <button
                onClick={() => setShowAttachMenu(!showAttachMenu)}
                className="p-2.5 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shrink-0"
              >
                {showAttachMenu ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Paperclip className="w-5 h-5" />
                )}
              </button>

              {showAttachMenu && (
                <div className="absolute bottom-12 left-0 bg-white rounded-xl shadow-modal border border-gray-100 overflow-hidden w-48">
                  <button
                    onClick={() => handleFileSelect("image")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Image className="w-4 h-4 text-blue-500" />
                    Send Image
                  </button>
                  <button
                    onClick={() => handleFileSelect("file")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-emerald-500" />
                    Send File
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={1}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className={cn(
                "p-2.5 rounded-xl transition-colors shrink-0",
                message.trim()
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule session modal */}
      {showScheduleModal && (
        <ScheduleSessionModal
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
          partnerName={otherUser?.fullName || ""}
          partnerId={otherUser?.id || ""}
        />
      )}
    </>
  );
}
