import { defHttp } from '/@/utils/http/axios';

enum Api {
  UserList = '/admin/api/v1/tree',
}

/**
 * @description: user list
 */
export function getUserListTreeApi() {
  return defHttp.get({
    url: Api.UserList,
    params: {
      root: 'root',
    },
  });
}

export function uploadUserListTreeApi(params) {
  return defHttp.put({
    url: Api.UserList,
    params,
  });
}
