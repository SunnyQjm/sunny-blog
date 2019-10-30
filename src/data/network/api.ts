import axios from 'axios';
import {BaseResponseBody} from "@/data/interface/response.interface";
import {StatusCode} from "@/data/network/status-code";
import {User} from "@/data/user";
import router from "umi/router";
import {CreatePostParam} from "@/data/param/request.param";

export const API = {
  INFO: {
    login: '/login',
    register: '/register',
    getUserInfo: '/admin/getUserInfo',
    createPost: '/admin/create-post',
  },
  global: {
    token: ''
  },
  easyRequest<T>(type: string, url: string, data: any = {}, config: any = {}): Promise<T> {
    // 统一添加相应的头部
    if (config.headers) {
      config.headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${API.global.token}`,
        ...config.headers,
      }
    } else {
      config.headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${API.global.token}`
      }
    }
    let requestPromise;
    switch (type.trim().toLowerCase()) {
      case 'get':
        requestPromise = axios.get(`/api${url}`, {
          params: data,
          ...config,
        });
        break;
      case 'post':
        requestPromise = axios.post(`/api${url}`, data, config);
        break;
      case 'put':
        break;
      default:
        break;
    }
    if (requestPromise) {
      return requestPromise
        .then((result: any) => {
          return result.data;
        })
        .then((responseData: BaseResponseBody<T>) => {
          // 同意处理状态码
          switch (responseData.statusCode) {
            case StatusCode.SUCCESS:
              break;
            case StatusCode.NEED_ADMIN_PERMISSION:
            case StatusCode.COMMENT_ERROR:
            case StatusCode.NEED_LOGIN:
              break;
            case StatusCode.UN_AUTHORIZED:
              router.replace('/login');
              break;
          }
          if(responseData.statusCode === StatusCode.SUCCESS) {
            return responseData.data;
          } else {
            return Promise.reject(responseData);
          }
        });
    }

    return Promise.reject('请求类型不对');
  },
  easyGet<T>(url: string, data: any = null, config: any = {}): Promise<T> {
    return API.easyRequest<T>('get', url, data, config);
  },
  eastPost<T>(url: string, data: any, config: any = {}): Promise<T> {
    return API.easyRequest<T>('post', url, data, config);
  },

  ////////////////////////////////////////////////////////////
  ///////// 用户相关接口
  ////////////////////////////////////////////////////////////
  /**
   * 登录
   * @param username
   * @param password
   */
  login: (username: string, password: string): Promise<User> => {
    return API.eastPost<User>(API.INFO.login, {
      username,
      password
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: (): Promise<User> => {
    return API.easyGet<User>(API.INFO.getUserInfo);
  },


  ///////////////////////////////////////////////////////////////
  ////////// 管理相关
  ///////////////////////////////////////////////////////////////
  /**
   * 创建博客
   * @param createPostParam
   */
  createPost(createPostParam: CreatePostParam) {
    return API.eastPost(API.INFO.createPost, createPostParam);
  }

};

