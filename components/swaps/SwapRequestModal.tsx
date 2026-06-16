"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useApp } from "@/context/AppContext";
import { Send, CheckCircle } from "lucide-react";
import type { User, Skill } from "@/lib/types";

interface SwapRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId: string;
  skillId: string;
}

export default function SwapRequestModal({
  isOpen,
  onClose,
  receiverId,
  skillId,
}: SwapRequestModalProps) {
  const { user: currentUser } = useApp();
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiver, setReceiver] = useState<User | null>(null);
  const [wantedSkill, setWantedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/users")
      .then((res) => res.json())
      .then((users: User[]) => {
        const r = users.find((u) => u.id === receiverId);
        if (r) setReceiver(r);
      });
    fetch("/api/skills")
      .then((res) => res.json())
      .then((skills: Skill[]) => {
        const s = skills.find((sk) => sk.id === skillId);
        if (s) setWantedSkill(s);
      });
  }, [isOpen, receiverId, skillId]);

  const handleSend = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  const handleClose = () => {
    setSent(false);
    setSelectedOfferedSkill("");
    setMessage("");
    onClose();
  };

  if (!receiver || !wantedSkill) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Request Skill Swap" size="md">
      {sent ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Request Sent!
          </h3>
          <p className="text-gray-600 mb-6">
            Your skill swap request has been sent to {receiver.fullName}.
            You&apos;ll be notified when they respond.
          </p>
          <Button onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Exchange preview */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-500 mb-1">You teach</p>
              <p className="font-semibold text-gray-900">
                {selectedOfferedSkill
                  ? currentUser?.skillsTeach?.find((us) => us.skill.id === selectedOfferedSkill)?.skill.name
                  : "Select a skill"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-500 mb-1">You learn</p>
              <p className="font-semibold text-emerald-600">
                {wantedSkill.name}
              </p>
            </div>
          </div>

          {/* Select offered skill */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skill I Can Offer
            </label>
            <select
              value={selectedOfferedSkill}
              onChange={(e) => setSelectedOfferedSkill(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              <option value="">Select a skill to offer...</option>
              {currentUser?.skillsTeach?.map((us) => (
                <option key={us.skill.id} value={us.skill.id}>
                  {us.skill.name} ({us.level})
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              placeholder={`Hi ${receiver.fullName}! I'd love to learn ${wantedSkill.name} from you. Would you like to do a skill swap?`}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              loading={loading}
              disabled={!selectedOfferedSkill}
              className="flex-1"
              icon={<Send className="w-4 h-4" />}
            >
              Send Request
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
