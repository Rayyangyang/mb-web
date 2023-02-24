import { defHttp } from '/@/utils/http/axios';

enum Api {
  ServiceList = '/admin/api/v1/service-packs/',
}

/**
 * @description: sevicepackage list
 */
export function getServiceListApi() {
  return defHttp.get({
    url: Api.ServiceList,
  });
}

