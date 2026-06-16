import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  Smartphone,
  Box,
  Languages,
  Palette,
  Mic,
  Film,
  Code,
  PenTool,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Box,
  Languages,
  Palette,
  Mic,
  Film,
  Code,
  PenTool,
};

const featuredSkills = [
  {
    id: "1",
    name: "Flutter Development",
    category: "Programming",
    mentorCount: 48,
    icon: "Smartphone",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "2",
    name: "Blender 3D",
    category: "Creative",
    mentorCount: 32,
    icon: "Box",
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "3",
    name: "Japanese Language",
    category: "Languages",
    mentorCount: 67,
    icon: "Languages",
    color: "bg-red-50 text-red-600",
  },
  {
    id: "4",
    name: "UI/UX Design",
    category: "Design",
    mentorCount: 55,
    icon: "Palette",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "5",
    name: "Public Speaking",
    category: "Business",
    mentorCount: 29,
    icon: "Mic",
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "6",
    name: "Video Editing",
    category: "Creative",
    mentorCount: 41,
    icon: "Film",
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: "7",
    name: "Python Programming",
    category: "Programming",
    mentorCount: 83,
    icon: "Code",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "8",
    name: "Graphic Design",
    category: "Design",
    mentorCount: 59,
    icon: "PenTool",
    color: "bg-indigo-50 text-indigo-600",
  },
];

export default function FeaturedSkills() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
            Featured Skills
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Popular skills being exchanged
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover the most in-demand skills our community is sharing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredSkills.map((skill) => {
            const Icon = iconMap[skill.icon] || Code;
            return (
              <Link key={skill.id} href="/auth/register">
                <Card hover className="group h-full">
                  <div
                    className={`w-12 h-12 rounded-xl ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 group-hover:text-emerald-600 transition-colors">
                    {skill.name}
                  </h3>
                  <Badge variant="default" size="sm">
                    {skill.category}
                  </Badge>
                  <p className="mt-3 text-sm text-gray-500">
                    <span className="font-medium text-emerald-600">
                      {skill.mentorCount}
                    </span>{" "}
                    mentors available
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
          >
            View all skills
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
