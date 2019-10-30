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
    updateUser(state: any, action: Action<User>) {
      console.log('fuck?', action);
      return {
        ...state,
        user: action.data
      }
    }
  },
  effects: {
    * init(action: Action<any>, operators: Operators) {
      const user = yield LocalStorageManager.getObj(LocalStorageKeys.USER);
      if(user) {
        yield operators.put({
          type: 'updateUser',
          data: user
        });
      } else {      // 没有登录则跳转到登录页
        router.replace('/login');
      }
      yield console.log('init');
    },
    * login(action: Action<any>, operators: Operators) {
      const result: User = yield operators.call(API.login, action.data.username, action.data.password);
      yield operators.put({
        type: 'updateUser',
        data: result
      });
      LocalStorageManager.save(LocalStorageKeys.USER, result);
      router.replace('/admin');
    }
  }
}


