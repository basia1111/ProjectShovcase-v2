import React from 'react';
import { IconType } from 'react-icons';
type FloatingCardProps = {
  icon: IconType;
  title: string;
  className: string;
  i: number;
};

const FloatingCard = ({ icon: Icon, title, className = '', i }: FloatingCardProps) => (
  <div
    className={`absolute flex items-center gap-3 rounded-xl bg-[#161B22]/80 p-3 ring-1 ring-white/10 backdrop-blur-sm ${className}`}
    style={{
      animationDelay: `${i}s`,
    }}
  >
    <div className="rounded-lg bg-gradient-to-r from-teal-500/10 to-emerald-500/10 p-2">
      <Icon className="h-5 w-5 text-teal-400" />
    </div>
    <span className="text-sm font-medium text-white">{title}</span>
  </div>
);

export default FloatingCard;
