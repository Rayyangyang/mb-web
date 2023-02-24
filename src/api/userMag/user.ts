import { defHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/admin/api/v1/tree',
}

/**
 * @description: user tree list
 */
export function getUserListTreeApi() {
  return defHttp.get({
    url: Api.UserList,
    params: {
      root: 'root',
    },
  });
}

/**
 * @description: upload user tree list
 */
export function uploadUserListTreeApi(params) {
  return defHttp.put({
    url: Api.UserList,
    params,
  });
}

/**
 * @description: user list
 */
export function getUserListApi(id) {
  return defHttp.get({
    url: `admin/api/v1/tree/${id}/members/`,
  });
}

/**
 * @description: post user
 */
export function createUserApi(params, id) {
  return defHttp.post({
    url: `/admin/api/v1/tree/${id}/members/`,
    params,
  });
}
