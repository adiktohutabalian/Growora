"use client";

import { useState, useEffect } from "react";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useApp } from "@/context/AppContext";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  const { user } = useApp();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    const url = user?.id
      ? `/api/conversations?userId=${user.id}`
      : "/api/conversations";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setConversations(data);
        if (data.length > 0 && !activeId) {
          setActiveId(data[0].id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  const activeConversation = conversations.find((c) => c.id === activeId);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setShowList(false);
  };

  const handleBack = () => {
    setShowList(true);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden h-[calc(100vh-200px)] min-h-[500px] flex items-center justify-center">
          <p className="text-gray-500">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden h-[calc(100vh-200px)] min-h-[500px]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div
            className={`w-full lg:w-80 lg:min-w-[320px] border-r border-gray-100 flex flex-col ${
              !showList && activeId ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="px-4 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <p className="text-sm text-gray-500">
                {conversations.length} conversations
              </p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ChatList
                conversations={conversations}
                activeId={activeId}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* Chat area */}
          <div
            className={`flex-1 flex flex-col ${
              showList && activeId ? "hidden lg:flex" : "flex"
            }`}
          >
            {activeConversation ? (
              <ChatWindow
                conversation={activeConversation}
                onBack={handleBack}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
