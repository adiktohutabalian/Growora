import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-100",
        hover &&
          "transition-all duration-300 hover:shadow-card-hover hover:border-gray-200 cursor-pointer",
        "shadow-card",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
