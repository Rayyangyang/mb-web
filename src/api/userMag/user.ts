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

/**
 * @description: 修改密码
 */
export function resetUserApi(params, id) {
  return defHttp.put({
    url: `/admin/api/v1/users/${id}/account`,
    params,
  });
}
/**
 * @description: 删除用户
 */
export function delUserApi(id) {
  return defHttp.delete({
    url: `/admin/api/v1/users/${id}`,
  });
}
/**
 * @description: 删除用户
 */
export function uploadUserApi(id, params) {
  return defHttp.patch({
    url: `/admin/api/v1/users/${id}/profile`,
    params,
  });
}
