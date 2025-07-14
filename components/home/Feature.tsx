import React from "react";
import { LuGlobe, LuPuzzle, LuZap } from "react-icons/lu";


export default function Feature() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
          Why Choose Craftfolio?
        </h2>
        <p className="text-light-text-sub dark:text-dark-text-sub max-w-2xl mx-auto">
          Everything you need to create a professional portfolio that stands out
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<LuZap />}
          title="Lightning Fast"
          subtitle="Generate your portfolio in under 2 minutes"
          description="Just upload your resume and watch as we transform it into a beautiful, professional portfolio website."
        />
        <FeatureCard
          icon={<LuPuzzle />}
          title="Fully Customizable"
          subtitle="Edit every section with ease"
          description="Fine-tune your content, adjust layouts, and personalize your portfolio to match your unique style and brand."
        />
        <FeatureCard
          icon={<LuGlobe />}
          title="Share Anywhere"
          subtitle="Your portfolio, everywhere"
          description="Get a custom URL to share your portfolio on social media, job applications, and networking events."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  subtitle,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}) {
  return (
    <div className="group p-6 bg-light-bg dark:bg-dark-bg-sub border border-light-border-sub dark:border-dark-border-sub rounded-2xl hover:border-light-text dark:hover:border-dark-text transition-all duration-300 hover:shadow-lg">
      <div className="w-12 h-12 bg-light-text/10 dark:bg-dark-text/10 rounded-xl flex items-center justify-center text-light-text dark:text-dark-text text-xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-2">
        {title}
      </h3>
      <p className="text-sm font-medium text-light-text-sub dark:text-dark-text-sub mb-3">
        {subtitle}
      </p>
      <p className="text-sm text-light-text-sub dark:text-dark-text-sub leading-relaxed">
        {description}
      </p>
    </div>
  );
}
