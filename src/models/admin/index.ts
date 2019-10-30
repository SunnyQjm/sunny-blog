import {Action, Operators} from "@/data/interface/dva.interface";
import {API} from "@/data/network/api";
import {User} from "@/data/user";
import router from 'umi/router';
import {} from 'antd'
import {LocalStorageKeys, LocalStorageManager} from "@/manager/storage.manager";

export interface AdminModelState {
  user: User,
  loginIng: boolean
}

export default {
  namespace: 'admin',
  state: {
    user: null,
  },
  reducers: {
    /**
     * 更新用户信息
     * @param state
     * @param action
     */
    updateUser(state: any, action: Action<User>) {
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
    }
  },
  effects: {
    * init(action: Action<any>, operators: Operators) {
      const user = yield LocalStorageManager.getObj(LocalStorageKeys.USER);
      if(user) {
        API.global.token = user.access_token;
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
      API.global.token = user.access_token;
      yield operators.put({
        type: 'updateUser',
        data: user
      });
    },
    * login(action: Action<any>, operators: Operators) {
      const user: User = yield operators.call(API.login, action.data.username, action.data.password);
      API.global.token = user.access_token;
      yield operators.put({
        type: 'updateUser',
        data: user
      });
      LocalStorageManager.save(LocalStorageKeys.USER, user);
      router.replace('/admin');
    }
  }
}


