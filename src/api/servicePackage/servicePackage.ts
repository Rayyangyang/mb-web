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

/**
 * @description: 启用 sevicepackage
 */
export function setServiceEnabledApi(id, params) {
  return defHttp.patch({
    url: `/admin/api/v1/service-packs/${id}`,
    params,
  });
}

/**
 * @description: 创建 服务包
 */
export function createServicePackApi(params) {
  return defHttp.post({
    url: `/admin/api/v1/service-packs/`,
    params,
  });
}
