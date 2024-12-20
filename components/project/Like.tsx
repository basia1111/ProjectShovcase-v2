import React, { useContext, useEffect, useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { Project } from "@types";
import { ModalContext } from "@contexts/ModalContext";
import LoginModalContent from "@components/common/LoginModalContent";

const Like = ({ project }: { project: Project }) => {
  const { data } = useSession();
  const [likeState, setLikeState] = useState({
    count: project.likeCount,
    isLiked: project.isLikedByUser,
    loading: false,
  });

  const { openModal } = useContext(ModalContext)!;

  useEffect(() => {
    setLikeState((prev) => ({
      ...prev,
      count: project.likeCount,
      isLiked: project.isLikedByUser,
    }));
  }, [project.likeCount, project.isLikedByUser]);

  const handleClick = async (e: React.MouseEvent, id: string) => {
    // Prevent the click event from reaching the parent Link
    e.preventDefault();
    e.stopPropagation();

    if (likeState.loading) return;

    try {
      setLikeState((prev) => ({ ...prev, loading: true }));

      const response = await fetch(`/api/project/like/${id}`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setLikeState((prev) => ({
        loading: false,
        isLiked: !prev.isLiked,
        count: prev.count + (data.wasLikedByUser ? -1 : 1),
      }));
    } catch (error) {
      setLikeState((prev) => ({
        ...prev,
        loading: false,
      }));
      console.error("Failed to update like:", error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (data?.user?.id) {
      handleClick(e, project._id);
    } else {
      e.preventDefault();
      e.stopPropagation();
      openModal(<LoginModalContent />);
    }
  };

  return (
    <button
      className="group/like flex  items-center justify-center rounded-lg p-2 bg-white/5 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-teal-500/20"
      onClick={handleButtonClick}
      disabled={likeState.loading}
    >
      {likeState.count > 0 && (
        <span className=" min-w-5 rounded-full  px-1 py-0.5 text-xs font-medium text-white/70 transition-colors duration-300 group-hover/like:text-teal-400">
          {likeState.count}
        </span>
      )}
      {likeState.isLiked ? (
        <IoHeart
          size="18"
          className="text-teal-500 transition-all duration-300 group-hover/like:scale-110"
        />
      ) : (
        <IoHeartOutline
          size="18"
          className="text-white/40 transition-all duration-300 group-hover/like:scale-110 group-hover/like:text-teal-400"
        />
      )}
    </button>
  );
};

export default Like;
