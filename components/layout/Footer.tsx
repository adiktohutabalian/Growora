import Link from "next/link";
import { Sprout, Globe, Hash, Mail, MessageCircle } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Discover Skills", href: "/discover" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Skill Swaps", href: "/swaps" },
    { label: "Community", href: "/#stats" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Guidelines", href: "#" },
    { label: "API", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Hash, href: "#", label: "Twitter" },
  { icon: Globe, href: "#", label: "Website" },
  { icon: Mail, href: "#", label: "Email" },
  { icon: MessageCircle, href: "#", label: "Community" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Grow<span className="text-emerald-400">ora</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              A skill-exchange platform where you teach what you know and learn
              what you need. No money required — just knowledge and community.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Future features banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 mb-1">
                Coming Soon
              </h4>
              <p className="text-sm text-gray-400">
                Skill Credits • Verified Skills • Premium Membership •
                Recruitment Portal
              </p>
            </div>
            <Link
              href="/settings"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
            >
              Join the waitlist →
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Growora. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Learn. Share. Grow Together. 🌱
          </p>
        </div>
      </div>
    </footer>
  );
}
