import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-light/5 dark:from-primary/10 dark:via-transparent dark:to-blue-light/10" />
        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              CollabTract FrontEnd
            </h1>
            <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
              Smart Door-to-Door and Flyering Route Planner
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 font-medium">
              Plan faster. Deliver smarter. Measure what matters.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              CollabTract is a modern web application that helps teams optimize door‑to‑door distribution routes and run high‑impact flyering campaigns. Designed as a polished portfolio project by a Data Scientist / Data Engineer, it showcases end‑to‑end product thinking—from clean UX to data‑driven decision making.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link
                href="/city-search"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Start Planning Routes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why CollabTract Section */}
      <section className="py-20 bg-gray-2 dark:bg-dark-2">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why CollabTract?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: "⚡",
                title: "Optimized Routes",
                description: "Reduce hours of manual planning to minutes with optimized routes",
              },
              {
                icon: "📱",
                title: "Mobile-First",
                description: "Keep field teams aligned with a mobile‑first interface",
              },
              {
                icon: "📊",
                title: "Real-Time Analytics",
                description: "See performance clearly with real‑time charts and metrics (coming soon)",
              },
              {
                icon: "🌓",
                title: "Dark/Light Mode",
                description: "Switch seamlessly between dark and light modes in any environment",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark p-6 rounded-lg shadow-card hover:shadow-card-2 transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for data-driven operations Section */}
      <section className="py-20 bg-gray-2 dark:bg-dark-2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Built for data‑driven operations
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                CollabTract blends geospatial UX with analytics, making it easy to:
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Identify the best neighborhoods to prioritize",
                "Balance workloads across teams",
                "Monitor campaign effectiveness in real time",
                "Iterate quickly based on measurable outcomes",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-dark p-6 rounded-lg shadow-card"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tech that scales
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Framework", value: "Next.js 15.5.4" },
                { label: "Language", value: "TypeScript" },
                { label: "Styling", value: "Tailwind CSS" },
                { label: "Charts", value: "ApexCharts" },
                { label: "Maps", value: "JSVectorMap" },
                { label: "Package Manager", value: "pnpm" },
                { label: "Deployment", value: "Docker support" },
              ].map((tech, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-dark-2 p-6 rounded-lg shadow-card border border-stroke dark:border-stroke-dark"
                >
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {tech.label}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 dark:text-white">
                    {tech.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="py-20 bg-gray-2 dark:bg-dark-2">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Source
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Explore the codebase and contribute to the project
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="https://github.com/adrien-senecal/CollabTract-Front"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-dark p-6 rounded-lg shadow-card hover:shadow-card-2 transition-shadow border border-stroke dark:border-stroke-dark group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    className="w-8 h-8 text-gray-900 dark:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    Frontend Repository
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Next.js frontend with TypeScript, Tailwind CSS, and modern UI components
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all gap-1">
                  <span>View on GitHub</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>

              <a
                href="https://github.com/adrien-senecal/CollabTract-Back"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-dark p-6 rounded-lg shadow-card hover:shadow-card-2 transition-shadow border border-stroke dark:border-stroke-dark group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    className="w-8 h-8 text-gray-900 dark:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    Backend Repository
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  FastAPI backend with machine learning clustering and route optimization
                </p>
                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all gap-1">
                  <span>View on GitHub</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
