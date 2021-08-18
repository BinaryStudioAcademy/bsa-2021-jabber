import { Image } from '~/common/types/types';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  imageId: number | null;
  email: string;
  nickname: string;
  password: string;
  birthdate: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  image: Image | null;
};

export type { User };
