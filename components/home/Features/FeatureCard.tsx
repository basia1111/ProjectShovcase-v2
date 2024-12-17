import React from 'react';
import { IconType } from 'react-icons';

type FeatureCardProps = {
  icon: IconType;
  title: string;
  description: string;
};
const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="group relative rounded-xl bg-white/5 p-6 ring-1 ring-white/10 transition-all hover:bg-white/10">
    <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 p-3">
      <Icon className="h-6 w-6 text-teal-400" />
    </div>
    <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </div>
);

export default FeatureCard;
