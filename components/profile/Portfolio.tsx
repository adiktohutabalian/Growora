import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ExternalLink, Image, Video, Link2, Award } from "lucide-react";
import type { PortfolioItem } from "@/lib/types";

interface PortfolioProps {
  items: PortfolioItem[];
}

const typeIcons = {
  image: Image,
  video: Video,
  link: Link2,
  certificate: Award,
};

const typeColors = {
  image: "bg-blue-50 text-blue-600",
  video: "bg-purple-50 text-purple-600",
  link: "bg-emerald-50 text-emerald-600",
  certificate: "bg-amber-50 text-amber-600",
};

export default function Portfolio({ items }: PortfolioProps) {
  if (items.length === 0) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h3>
        <p className="text-gray-500 text-sm">No portfolio items yet.</p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = typeIcons[item.type];
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-lg ${
                    typeColors[item.type]
                  } flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                      {item.title}
                    </h4>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <Badge variant="default" size="sm" className="mt-2">
                    {item.type}
                  </Badge>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </Card>
  );
}
