import { defHttp } from '/@/utils/http/axios';

enum Api {
  RolesList = '/admin/api/v1/roles/',
}

/**
 * @description: roles list
 */
export function getPatientListApi() {
  return defHttp.get({
    url: `/dapi/v1/patients/`,
  });
}
