import Link from "next/link";
import Button from "@/components/ui/Button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-50 flex items-center justify-center">
          <span className="text-5xl">🌱</span>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like this page hasn&apos;t sprouted yet. The page you&apos;re
          looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/discover">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Discover Skills
            </Button>
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back
        </Link>
      </div>
    </div>
  );
}
