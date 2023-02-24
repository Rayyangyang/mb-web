import { defHttp } from '/@/utils/http/axios';

enum Api {
  RolesList = '/admin/api/v1/roles/',
}

/**
 * @description: roles list
 */
export function getRolesListApi() {
  return defHttp.get({
    url: Api.RolesList,
  });
}
/**
 * @description: add new role
 */
export function addNewRoleApi(params) {
  return defHttp.post({
    url: Api.RolesList,
    params,
  });
}
/**
 * @description: update new role
 */
export function updateRoleApi(params, id) {
  return defHttp.patch({
    url: `/admin/api/v1/roles/${id}`,
    params,
  });
}
/**
 * @description: update new role
 */
export function delRoleApi(id) {
  return defHttp.delete({
    url: `/admin/api/v1/roles/${id}`,
  });
}
