"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 12847,
    suffix: "+",
    label: "Active Members",
    description: "Growing every day",
  },
  {
    value: 248,
    suffix: "+",
    label: "Skills Available",
    description: "And counting",
  },
  {
    value: 34521,
    suffix: "+",
    label: "Successful Swaps",
    description: "Knowledge exchanged",
  },
  {
    value: 4.8,
    suffix: "★",
    label: "Community Rating",
    description: "Trusted by thousands",
    decimals: 1,
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(value, increment * step);
      setCount(current);

      if (step >= steps) {
        clearInterval(timer);
        setCount(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-emerald-500">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">
            Community Impact
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white">
            A thriving community of learners
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Join thousands of people already growing together through skill exchange.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
              <p className="mt-2 text-lg font-semibold text-white">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
