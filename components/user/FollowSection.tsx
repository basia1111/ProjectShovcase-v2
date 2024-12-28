import React, { useContext, useEffect, useState } from "react";
import { FiHeart, FiUsers } from "react-icons/fi";
import { User } from "@types";
import { useSession } from "next-auth/react";
import { ModalContext } from "@contexts/ModalContext";
import LoginModalContent from "@components/common/LoginModalContent";
import StatNumber from "./StatNumber";
import StatNumberProjects from "./StatNumberProjects";

type FollowSectionType = {
  user: User;
  isOwner: boolean;
};

const FollowSection = ({ user, isOwner }: FollowSectionType) => {
  const [followState, setFollowState] = useState({
    isFollowed: user.isFollowed,
    followedByCount: user.followedBy.length,
    loading: false,
  });
  const { openModal } = useContext(ModalContext)!;

  useEffect(() => {
    setFollowState((prev) => ({
      ...prev,
      isFollowed: user.isFollowed,
      followedByCount: user.followedBy.length,
    }));
  }, [user.followedBy.length, user.isFollowed]);

  const { data: session } = useSession();

  const handleClick = async () => {
    if (followState.loading) return;

    if (session?.user?.id) {
      try {
        setFollowState((prev) => ({ ...prev, loading: true }));

        const response = await fetch(`/api/user/${session.user.id}/follow/${user.id}`, {
          method: "POST",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setFollowState((prev) => ({
          loading: false,
          isFollowed: !prev.isFollowed,
          followedByCount: data.wasFollowedByUser ? prev.followedByCount - 1 : prev.followedByCount + 1,
        }));
      } catch (error) {
        setFollowState((prev) => ({
          ...prev,
          loading: false,
        }));
        console.error("Failed to update follow:", error);
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (session?.user?.id) {
      handleClick();
    } else {
      e.preventDefault();
      e.stopPropagation();
      openModal(<LoginModalContent />);
    }
  };

  return (
    <div className="md:self-center flex flex-col items-end gap-4">
      <div className="flex items-center gap-6">
        <StatNumber
          icon={FiUsers}
          label="Following"
          value={user.following?.length || 0}
          list={user.following}
        />
        <StatNumber
          icon={FiUsers}
          label="Followers"
          value={followState.followedByCount}
          list={user.followedBy}
        />
        <StatNumberProjects
          icon={FiHeart}
          label="Liked"
          value={user.likedProjects?.length || 0}
          list={user.likedProjects}
        />
      </div>
      {!isOwner && (
        <button
          onClick={handleButtonClick}
          disabled={followState.loading}
          className="px-5 py-1.5 rounded-lg bg-[#1B1F24] text-teal-400 border border-emerald-500/20 
                   hover:bg-emerald-500/10 transition-all duration-300 text-sm font-medium"
        >
          {followState.loading ? "Loading..." : followState.isFollowed ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default FollowSection;
