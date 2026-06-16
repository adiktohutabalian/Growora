import Card from "@/components/ui/Card";
import { Sun, Sunset, Moon, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Availability as AvailabilityType } from "@/lib/types";

interface AvailabilityProps {
  availability: AvailabilityType[];
}

const timeSlots = [
  { id: "morning" as AvailabilityType, label: "Morning", icon: Sun, time: "8 AM — 12 PM" },
  { id: "afternoon" as AvailabilityType, label: "Afternoon", icon: Sunset, time: "12 PM — 5 PM" },
  { id: "evening" as AvailabilityType, label: "Evening", icon: Moon, time: "5 PM — 9 PM" },
  { id: "weekend" as AvailabilityType, label: "Weekend", icon: CalendarDays, time: "Sat & Sun" },
];

export default function Availability({ availability }: AvailabilityProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
      <div className="grid grid-cols-2 gap-3">
        {timeSlots.map((slot) => {
          const isAvailable = availability.includes(slot.id);
          return (
            <div
              key={slot.id}
              className={cn(
                "p-3 rounded-xl border text-center",
                isAvailable
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-gray-100 bg-gray-50 opacity-50"
              )}
            >
              <slot.icon
                className={cn(
                  "w-5 h-5 mx-auto mb-1.5",
                  isAvailable ? "text-emerald-600" : "text-gray-400"
                )}
              />
              <p
                className={cn(
                  "text-sm font-medium",
                  isAvailable ? "text-emerald-700" : "text-gray-500"
                )}
              >
                {slot.label}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{slot.time}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
