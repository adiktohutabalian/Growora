"use client";

import Button from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const skillExchanges = [
  { from: "Japanese 🇯🇵", to: "Blender 3D 🎨" },
  { from: "Flutter 📱", to: "UI/UX Design 🎯" },
  { from: "Photography 📸", to: "Public Speaking 🎤" },
  { from: "Python 🐍", to: "Guitar 🎸" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 via-white to-white" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              No money needed — just skills
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
            >
              Learn Anything.{" "}
              <span className="text-emerald-500">Pay With Your Skills.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Exchange knowledge, teach what you know, and learn what you need
              from a community that grows together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Swapping Skills
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {["S", "K", "M", "A", "D"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-semibold text-emerald-700"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">12,800+</span>{" "}
                members already swapping skills
              </div>
            </motion.div>
          </div>

          {/* Right: Skill exchange illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                Live Skill Exchanges
              </h3>
              <div className="space-y-4">
                {skillExchanges.map((exchange, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-300"
                  >
                    <div className="flex-1 text-right">
                      <span className="text-sm md:text-base font-semibold text-gray-900">
                        {exchange.from}
                      </span>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm md:text-base font-semibold text-gray-900">
                        {exchange.to}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats bar */}
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-600">34.5k</p>
                  <p className="text-xs text-gray-500">Swaps Done</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-600">248</p>
                  <p className="text-xs text-gray-500">Skills</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-600">4.8★</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white rounded-xl shadow-soft px-4 py-2.5 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🌱</span>
                <span className="text-sm font-semibold text-gray-700">
                  New match!
                </span>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-soft px-4 py-2.5 border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🎉</span>
                <span className="text-sm font-semibold text-gray-700">
                  Swap complete!
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
