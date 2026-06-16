import { CreditCard, BadgeCheck, Crown, Building2 } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Skill Credits",
    description:
      "Earn credits by teaching others. Use them to unlock premium learning opportunities and exclusive sessions.",
    status: "Coming Soon",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: BadgeCheck,
    title: "Verified Skills",
    description:
      "Get your skills verified through assessments and earn trusted badges that showcase your expertise.",
    status: "Coming Soon",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Crown,
    title: "Premium Membership",
    description:
      "Unlock enhanced visibility, priority matching, unlimited swaps, and exclusive community features.",
    status: "Coming Soon",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    icon: Building2,
    title: "Recruitment Portal",
    description:
      "Companies can discover talented users based on verified skills, reputation, and community contributions.",
    status: "Coming Soon",
    color: "bg-purple-50 text-purple-600 border-purple-100",
    iconBg: "bg-purple-100",
  },
];

export default function FutureFeatures() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">
            What&apos;s Next
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            The future of Growora
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Exciting features on the horizon to make your skill-sharing journey
            even better.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`relative p-6 rounded-2xl border ${feature.color} hover:shadow-card-hover transition-all duration-300`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {feature.status}
              </span>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
