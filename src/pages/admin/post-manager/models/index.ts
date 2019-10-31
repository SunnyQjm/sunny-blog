import {Action, Operators} from "@/data/interface/dva.interface";
import {DelPostParam, GetPostsParam} from "@/data/param/request.param";
import {API} from "@/data/network/api";
import {message} from "antd";
import {Post} from "@/data/post";
import {BaseListData} from "@/data/interface/response.interface";

export default {
  namespace: 'post-manager',
  state: {
    posts: [],
    total: 0,
    page: 1,
    pageSize: API.INFO.DEFAULT_PAGE_SIZE
  },
  reducers: {
    updatePosts(state: any, action: Action<BaseListData<Post>>) {
      return {
        ...state,
        total: action.data.total,
        posts: action.data.list,
        page: action.data.page,
      }
    },


    removePost(state: any, action: Action<number>) {
      return {
        ...state,
        posts: state.posts.filter((post: Post) => post.id !== action.data)
      }
    }
  },
  effects: {
    * getPosts(action: Action<GetPostsParam>, operators: Operators) {
      const postList = yield operators.call(API.getPosts, action.data);
      console.log(postList);
      yield operators.put({
        type: 'updatePosts',
        data: {
          ...postList,
          ...action.data,
        }
      })
    },

    * delPost(action: Action<DelPostParam>, operators: Operators) {
      const result = yield operators.call(API.delPost, {
        postId: action.data
      });
      message.destroy();
      if (result) {    // 删除成功
        yield operators.put({
          type: 'removePost',
          data: action.data
        });
        message.success('删除成功')
      } else {        // 删除失败
        message.error('删除失败')
      }
    },

  }
}
