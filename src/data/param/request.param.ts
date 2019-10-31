export interface CreatePostParam {
  title: string,
  content: string,
  tags?: string[],
}

export interface GetListParam {
  page: number,
  size: number
}

export interface GetPostsParam extends GetListParam {
  tagId?: string,
}

export interface DelPostParam {
  postId: number
}
