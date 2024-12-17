import React from 'react';
import { FiUsers, FiLayout, FiMessageCircle } from 'react-icons/fi';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: FiLayout,
      title: 'Project Showcase',
      description:
        'Create beautiful portfolios to showcase your work with rich media support and custom layouts.',
    },
    {
      icon: FiUsers,
      title: 'Community Collaboration',
      description:
        'Connect with like-minded creators, form teams, and collaborate on exciting new projects.',
    },
    {
      icon: FiMessageCircle,
      title: 'Smart Discovery',
      description:
        'Find relevant projects and creators through intelligent recommendations and easy navigation.',
    },
  ];

  return (
    <div className="relative bg-[#0D1117] py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">
            Powerful Features for
            <span className="ml-2 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Modern Creators
            </span>
          </h2>
          <p className="text-gray-400 mx-auto max-w-2xl text-lg">
            Everything you need to bring your projects to life and collaborate with an engaged
            community of creators.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
