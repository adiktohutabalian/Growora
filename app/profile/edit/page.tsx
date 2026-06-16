"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useApp } from "@/context/AppContext";
import { cn, getLevelColor, getLevelLabel } from "@/lib/utils";
import type { SkillLevel, Availability, Skill } from "@/lib/types";
import {
  User,
  MapPin,
  Camera,
  Save,
  Plus,
  X,
  ArrowLeft,
  Sun,
  Sunset,
  Moon,
  CalendarDays,
} from "lucide-react";
import Link from "next/link";

export default function ProfileEditPage() {
  const { user, updateUser } = useApp();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const [selectedAvailability, setSelectedAvailability] = useState<Availability[]>(
    user?.availability || []
  );

  const [selectedSkillsTeach, setSelectedSkillsTeach] = useState<
    { skillId: string; level: SkillLevel }[]
  >(
    user?.skillsTeach.map((s) => ({
      skillId: s.skill.id,
      level: s.level,
    })) || []
  );

  const [selectedSkillsLearn, setSelectedSkillsLearn] = useState<string[]>(
    user?.skillsLearn.map((s) => s.id) || []
  );

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then(setSkills)
      .catch(() => {});
  }, []);

  const availabilityOptions: {
    id: Availability;
    label: string;
    icon: React.ElementType;
    time: string;
  }[] = [
    { id: "morning", label: "Morning", icon: Sun, time: "8 AM — 12 PM" },
    { id: "afternoon", label: "Afternoon", icon: Sunset, time: "12 PM — 5 PM" },
    { id: "evening", label: "Evening", icon: Moon, time: "5 PM — 9 PM" },
    { id: "weekend", label: "Weekend", icon: CalendarDays, time: "Sat & Sun" },
  ];

  const levels: SkillLevel[] = ["beginner", "intermediate", "advanced", "expert"];

  const toggleAvailability = (slot: Availability) => {
    setSelectedAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const addTeachSkill = () => {
    setSelectedSkillsTeach((prev) => [...prev, { skillId: "", level: "intermediate" }]);
  };

  const removeTeachSkill = (index: number) => {
    setSelectedSkillsTeach((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTeachSkill = (
    index: number,
    field: "skillId" | "level",
    value: string
  ) => {
    setSelectedSkillsTeach((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const toggleLearnSkill = (skillId: string) => {
    setSelectedSkillsLearn((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSave = async () => {
    updateUser({
      fullName: form.fullName,
      username: form.username,
      bio: form.bio,
      location: form.location,
      availability: selectedAvailability,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ProtectedRoute>
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href={`/profile/${user?.username}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to profile
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>

      <div className="space-y-6">
        {/* Basic info */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Basic Information
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <Avatar
              src={user?.avatar}
              alt={user?.fullName || ""}
              size="xl"
            />
            <div>
              <button className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Change Photo
              </button>
              <p className="text-xs text-gray-400 mt-1.5">
                JPG, PNG or GIF. Max 5MB
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                icon={<User className="w-4 h-4" />}
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
              />
              <Input
                label="Username"
                icon={<User className="w-4 h-4" />}
                value={form.username}
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>

            <Input
              label="Location"
              icon={<MapPin className="w-4 h-4" />}
              value={form.location}
              onChange={(e) =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
              />
            </div>
          </div>
        </Card>

        {/* Skills I Can Teach */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Skills I Can Teach
            </h2>
            <Button variant="outline" size="sm" onClick={addTeachSkill}>
              <Plus className="w-4 h-4 mr-1" />
              Add Skill
            </Button>
          </div>

          <div className="space-y-3">
            {selectedSkillsTeach.map((ts, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
              >
                <select
                  value={ts.skillId}
                  onChange={(e) =>
                    updateTeachSkill(index, "skillId", e.target.value)
                  }
                  className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  <option value="">Select a skill...</option>
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
                <select
                  value={ts.level}
                  onChange={(e) =>
                    updateTeachSkill(index, "level", e.target.value)
                  }
                  className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {getLevelLabel(level)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeTeachSkill(index)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {selectedSkillsTeach.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No skills added yet. Click &quot;Add Skill&quot; to get started.
              </p>
            )}
          </div>
        </Card>

        {/* Skills I Want to Learn */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Skills I Want to Learn
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => toggleLearnSkill(skill.id)}
              >
                <Badge
                  variant={
                    selectedSkillsLearn.includes(skill.id)
                      ? "success"
                      : "outline"
                  }
                  size="md"
                  className="cursor-pointer hover:border-emerald-300"
                >
                  {skill.name}
                </Badge>
              </button>
            ))}
          </div>
        </Card>

        {/* Availability */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Availability
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {availabilityOptions.map((slot) => {
              const isSelected = selectedAvailability.includes(slot.id);
              return (
                <button
                  key={slot.id}
                  onClick={() => toggleAvailability(slot.id)}
                  className={cn(
                    "p-4 rounded-xl border text-center transition-all",
                    isSelected
                      ? "border-emerald-500 bg-emerald-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <slot.icon
                    className={cn(
                      "w-6 h-6 mx-auto mb-2",
                      isSelected ? "text-emerald-600" : "text-gray-400"
                    )}
                  />
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-emerald-700" : "text-gray-700"
                    )}
                  >
                    {slot.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{slot.time}</p>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <Button size="lg" onClick={handleSave} icon={<Save className="w-4 h-4" />}>
            Save Changes
          </Button>
          {saved && (
            <span className="text-sm text-emerald-600 flex items-center gap-1">
              <Save className="w-4 h-4" />
              Changes saved!
            </span>
          )}
          <Link href={`/profile/${user?.username}`} className="ml-auto">
            <Button variant="ghost">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
