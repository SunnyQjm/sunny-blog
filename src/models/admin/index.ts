import {Action, Operators} from "@/data/interface/dva.interface";
import {API} from "@/data/network/api";
import {User} from "@/data/user";
import router from 'umi/router';
import {message} from 'antd'
import {LocalStorageKeys, LocalStorageManager} from "@/manager/storage.manager";
import {CreatePostParam, DelPostParam, GetPostsParam} from "@/data/param/request.param";
import {Post} from "@/data/post";

export default {
  namespace: 'admin',
  state: {
    user: null,
    posts: [],
  },
  reducers: {
    /**
     * 更新用户信息
     * @param state
     * @param action
     */
    updateUser(state: any, action: Action<User>) {
      if (action.data && action.data.access_token) {
        API.global.token = action.data.access_token;
      }
      return {
        ...state,
        user: action.data
      }
    },

    /**
     * 退出登录
     */
    logout(state: any, action: Action<any>) {
      LocalStorageManager.clear();
      return {
        ...state,
        user: null
      }
    },


  },
  effects: {
    * init(action: Action<any>, operators: Operators) {
      const user = yield LocalStorageManager.getObj(LocalStorageKeys.USER);
      if (user) {
        yield operators.put({
          type: 'updateUser',
          data: user
        });

        // 获取网上的用户信息
        yield operators.put({
          type: 'getUserInfo',
        });
      } else {      // 没有登录则跳转到登录页
        router.replace('/login');
      }
    },
    * getUserInfo(action: Action<any>, operators: Operators) {
      const user = yield operators.call(API.getUserInfo);
      yield operators.put({
        type: 'updateUser',
        data: user
      });
    },
    * login(action: Action<any>, operators: Operators) {
      const user: User = yield operators.call(API.login, action.data.username, action.data.password);
      yield operators.put({
        type: 'updateUser',
        data: user
      });
      LocalStorageManager.save(LocalStorageKeys.USER, user);
      router.replace('/admin');
    },

    * createPost(action: Action<CreatePostParam>, operators: Operators) {
      yield operators.call(API.createPost, action.data);
      message.success('发表成功');
    },
  }
}


