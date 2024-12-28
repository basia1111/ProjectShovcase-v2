import { ModalContext } from "@contexts/ModalContext";
import { User } from "@types";
import React, { useContext } from "react";

type StatNumberProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: number;
  list: User[];
};

const ModalList = ({ list }: { list: User[] }) => {
  return (
    <div className="w-full max-w-md ">
      <h3 className="text-lg font-semibold text-gray-800 pb-6">Users</h3>
      <ul className="divide-y divide-gray-200">
        {list.map((user, index) => (
          <li
            key={index}
            className="py-3"
          >
            <a
              href={`/profile/${user._id}`}
              className="block hover:bg-gray-50 transition-colors duration-150 rounded-lg p-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.image || "/images/avatar.png"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <span className="text-gray-900 font-medium">{user.name}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const StatNumber = ({ icon: Icon, label, value, list }: StatNumberProps) => {
  const { openModal } = useContext(ModalContext)!;

  return (
    <div
      className="flex items-center gap-2 "
      onClick={() => openModal(<ModalList list={list} />)}
    >
      <div className="min-w-[20px]">
        <Icon className="text-white/60  size-4" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-white/90 font-medium">{value}</span>
        <span className="text-white/60 text-sm">{label}</span>
      </div>
    </div>
  );
};

export default StatNumber;
