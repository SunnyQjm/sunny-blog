import {Tag} from "@/data/tag";
import {Comment} from "@/data/comment";
import {User} from "@/data/user";

export interface Post {
  id: number,
  title: string,
  content: string,
  tags: Tag[],
  comments: Comment[],
  owner: User,
  createdAt: number,
  updatedAt: number,
}
