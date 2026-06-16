"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import { Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  skillName: string;
}

export default function ReviewForm({
  isOpen,
  onClose,
  partnerName,
  skillName,
}: ReviewFormProps) {
  const [communication, setCommunication] = useState(0);
  const [teachingQuality, setTeachingQuality] = useState(0);
  const [reliability, setReliability] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setCommunication(0);
    setTeachingQuality(0);
    setReliability(0);
    setComment("");
    onClose();
  };

  const isValid = communication > 0 && teachingQuality > 0 && reliability > 0;

  const ratingCategories = [
    {
      label: "Communication",
      value: communication,
      onChange: setCommunication,
    },
    {
      label: "Teaching Quality",
      value: teachingQuality,
      onChange: setTeachingQuality,
    },
    {
      label: "Reliability",
      value: reliability,
      onChange: setReliability,
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Leave a Review"
      size="md"
    >
      {submitted ? (
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Review Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for reviewing your skill swap with {partnerName}. Your
            feedback helps build trust in the community.
          </p>
          <Button onClick={handleClose}>Done</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Context */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
            <p className="text-sm text-emerald-700">
              Rate your skill swap experience with{" "}
              <span className="font-semibold">{partnerName}</span> for{" "}
              <span className="font-semibold">{skillName}</span>
            </p>
          </div>

          {/* Rating categories */}
          {ratingCategories.map((cat) => (
            <div key={cat.label}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {cat.label}
              </label>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => cat.onChange(i + 1)}
                    className="p-0.5"
                  >
                    <Star
                      className={cn(
                        "w-7 h-7 transition-colors",
                        i < cat.value
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200 hover:fill-amber-200 hover:text-amber-200"
                      )}
                    />
                  </button>
                ))}
                {cat.value > 0 && (
                  <span className="ml-2 text-sm text-gray-500">
                    {cat.value}/5
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Written Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              placeholder="Share your experience... What did you learn? How was the teaching?"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              loading={loading}
              disabled={!isValid}
              className="flex-1"
            >
              Submit Review
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
