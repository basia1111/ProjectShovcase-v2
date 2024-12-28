import React from "react";
import { IconType } from "react-icons";

type StatProps = {
  icon: IconType;
  value: string;
};

export const Stat = ({ icon: Icon, value }: StatProps) => (
  <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
    <Icon className="h-4 w-4 text-teal-500" />
    <span>{value}</span>
  </div>
);
