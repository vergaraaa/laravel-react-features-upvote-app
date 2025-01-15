import { Config } from 'ziggy-js';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  permissions: string[];
  roles: string[];
  created_at: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
};

export type Comment = {
  id: number;
  comment: string;
  user: User;
  created_at: string;
};

export interface Feature {
  id: number;
  name: string;
  description?: string;
  user: User;
  upvote_count: number;
  user_has_upvoted: boolean;
  user_has_downvoted: boolean;
  comments: Comment[];
  created_at: Date;
}

export type PaginatedData<T> = {
  data: T[];
  links: Record<string, string>;
};

export interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
