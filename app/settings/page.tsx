"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useApp } from "@/context/AppContext";
import {
  User,
  Mail,
  Lock,
  Bell,
  Globe,
  Camera,
  Save,
  Shield,
  Palette,
  Crown,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "profile" | "notifications" | "account" | "premium";

export default function SettingsPage() {
  const { user, updateUser, logout } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  const [notifications, setNotifications] = useState({
    emailSwapRequests: true,
    emailMessages: true,
    emailMatches: true,
    pushSwapRequests: true,
    pushMessages: true,
    pushMatches: false,
  });

  const tabs = [
    { id: "profile" as Tab, label: "Profile", icon: User },
    { id: "notifications" as Tab, label: "Notifications", icon: Bell },
    { id: "account" as Tab, label: "Account", icon: Shield },
    { id: "premium" as Tab, label: "Premium", icon: Crown },
  ];

  const handleSave = async () => {
    updateUser({
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      bio: form.bio,
      location: form.location,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ProtectedRoute>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account preferences and profile
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar tabs */}
        <div className="lg:w-56 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
                  activeTab === tab.id
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Profile Settings
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
                    icon={<Globe className="w-4 h-4" />}
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  icon={<Mail className="w-4 h-4" />}
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <Input
                  label="Location"
                  icon={<Globe className="w-4 h-4" />}
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
                    onChange={(e) =>
                      setForm({ ...form, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button onClick={handleSave} icon={<Save className="w-4 h-4" />}>
                    Save Changes
                  </Button>
                  {saved && (
                    <span className="text-sm text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Saved!
                    </span>
                  )}
                </div>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Notification Preferences
              </h2>

              <div className="space-y-6">
                {/* Email notifications */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: "emailSwapRequests",
                        label: "Swap requests",
                        desc: "When someone wants to swap skills with you",
                      },
                      {
                        key: "emailMessages",
                        label: "New messages",
                        desc: "When you receive a new message",
                      },
                      {
                        key: "emailMatches",
                        label: "Match recommendations",
                        desc: "Weekly digest of new matches",
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={
                            notifications[
                              item.key as keyof typeof notifications
                            ]
                          }
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Push notifications */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        key: "pushSwapRequests",
                        label: "Swap requests",
                        desc: "Instant notification for swap requests",
                      },
                      {
                        key: "pushMessages",
                        label: "New messages",
                        desc: "Instant notification for messages",
                      },
                      {
                        key: "pushMatches",
                        label: "Match recommendations",
                        desc: "When a new match is found",
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={
                            notifications[
                              item.key as keyof typeof notifications
                            ]
                          }
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSave} icon={<Save className="w-4 h-4" />}>
                  Save Preferences
                </Button>
              </div>
            </Card>
          )}

          {activeTab === "account" && (
            <div className="space-y-6">
              <Card>
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Account Security
                </h2>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Change Password
                    </h3>
                    <div className="space-y-3">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="••••••••"
                      />
                      <Input
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <Button className="mt-4" size="sm">
                      Update Password
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="border-red-100">
                <h2 className="text-lg font-semibold text-red-600 mb-4">
                  Danger Zone
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout();
                      router.push("/auth/login");
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Sign Out
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Delete Account
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "premium" && (
            <Card>
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Growora Premium
                </h2>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Unlock enhanced visibility, priority matching, and exclusive
                  features to accelerate your learning journey.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                  {[
                    {
                      title: "Priority Matching",
                      desc: "Get matched first with top mentors",
                    },
                    {
                      title: "Enhanced Profile",
                      desc: "Premium badge and featured listing",
                    },
                    {
                      title: "Unlimited Swaps",
                      desc: "No limits on active skill swaps",
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="p-4 rounded-xl bg-amber-50 border border-amber-100"
                    >
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>
                <p className="text-xs text-gray-400 mt-3">
                  Coming soon — join the waitlist to be notified
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
