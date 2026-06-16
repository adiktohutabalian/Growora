import { UserPlus, Search, Handshake, GraduationCap } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description:
      "Add your skills, set your expertise level, and share what you want to learn.",
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Search,
    step: "02",
    title: "Discover People",
    description:
      "Browse our community and find users with the skills you want to learn.",
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Propose a Skill Swap",
    description:
      "Offer your skill in exchange for theirs. Send a friendly request to connect.",
    color: "bg-purple-50 text-purple-600",
    iconBg: "bg-purple-100",
  },
  {
    icon: GraduationCap,
    step: "04",
    title: "Learn & Grow Together",
    description:
      "Schedule sessions, exchange knowledge, build connections, and level up.",
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Start swapping in 4 simple steps
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            No complicated process. Just create, connect, and grow.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative group"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gray-200" />
              )}

              <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${step.iconBg} flex items-center justify-center`}
                  >
                    <step.icon className={`w-6 h-6 ${step.color.split(" ")[1]}`} />
                  </div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">
                    Step {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
