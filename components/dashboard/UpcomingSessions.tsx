import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Calendar, Clock, Video } from "lucide-react";

const sessions = [
  {
    id: "1",
    partner: "Kenji Tanaka",
    avatar: "/avatars/kenji.jpg",
    skill: "Japanese Language",
    date: "Today",
    time: "3:00 PM",
    type: "Video Call",
  },
  {
    id: "2",
    partner: "Amira Patel",
    avatar: "/avatars/amira.jpg",
    skill: "UI/UX Design",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "Video Call",
  },
  {
    id: "3",
    partner: "David Kim",
    avatar: "/avatars/david.jpg",
    skill: "Public Speaking",
    date: "Friday",
    time: "2:00 PM",
    type: "In Person",
  },
];

export default function UpcomingSessions() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Upcoming Sessions
        </h3>
        <Badge variant="info">{sessions.length} scheduled</Badge>
      </div>
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-emerald-200 transition-colors"
          >
            <Avatar src={session.avatar} alt={session.partner} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {session.partner}
              </p>
              <p className="text-sm text-emerald-600">{session.skill}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                <span>{session.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{session.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
