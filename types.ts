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
    linkedIn?: string;
    github?: string;
  };
  coverImage?: string;
};

export type Project = {
  _id: string;
  id: string;
  title: string;
  description: string;
  author: User;
  cover?: string;
  status: string;
  category: string;
};

export type ProfileComponentProps = {
  user: User;
  isOwner: boolean;
};
