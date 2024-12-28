export type User = {
  id: string;
  _id?: string;
  name: string;
  email: string;
  image?: string;
  professionalTitle?: string;
  city?: string;
  about?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  likedProjects: Project[];
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  followedBy: User[];
  following: User[];
  isFollowed?: boolean;
};

export type Project = {
  _id: string;
  id: string;
  title: string;
  description: string;
  author: User;
  cover?: string;
  email: string;
  status: string;
  category: string;
  techStack: string[];
  keyFeatures: {
    title: string;
    description: string;
  };
  likedBy: User[];
  likeCount: number;
  gitHub?: string;
  documentation?: string;
  liveDemo?: string;
  createdAt: string;
  updatedAt: string;
  isLikedByUser?: boolean;
};

export type ProfileComponentProps = {
  user: User;
  isOwner: boolean;
};
