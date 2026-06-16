"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Calendar, Clock, Video, MapPin, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScheduleSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  partnerId: string;
  skillExchange: {
    skill1: string;
    skill2: string;
  };
}

export default function ScheduleSessionModal({
  isOpen,
  onClose,
  partnerName,
  skillExchange,
}: ScheduleSessionModalProps) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState<"online" | "in_person">("online");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSchedule = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  const handleClose = () => {
    setSent(false);
    setDate("");
    setTime("");
    setMode("online");
    setNotes("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Schedule Learning Session"
      size="md"
    >
      {sent ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Session Scheduled!
          </h3>
          <p className="text-gray-600 mb-6">
            A session request has been sent to {partnerName}. They&apos;ll
            confirm the time soon.
          </p>
          <Button onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Session info */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-500 mb-1">Learning</p>
              <p className="font-semibold text-emerald-600">
                {skillExchange.skill1}
              </p>
            </div>
            <span className="text-gray-400">↔</span>
            <div className="flex-1 text-center">
              <p className="text-xs text-gray-500 mb-1">Teaching</p>
              <p className="font-semibold text-gray-900">
                {skillExchange.skill2}
              </p>
            </div>
          </div>

          {/* Date */}
          <Input
            label="Date"
            type="date"
            icon={<Calendar className="w-4 h-4" />}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Time */}
          <Input
            label="Time"
            type="time"
            icon={<Clock className="w-4 h-4" />}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMode("online")}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors",
                  mode === "online"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                <Video className="w-4 h-4" />
                Online
              </button>
              <button
                type="button"
                onClick={() => setMode("in_person")}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors",
                  mode === "in_person"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                )}
              >
                <MapPin className="w-4 h-4" />
                In Person
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              placeholder="What would you like to cover in this session?"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              loading={loading}
              disabled={!date || !time}
              className="flex-1"
              icon={<Calendar className="w-4 h-4" />}
            >
              Schedule Session
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
