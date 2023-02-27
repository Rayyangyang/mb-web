import { defHttp } from '/@/utils/http/axios';

enum Api {
  ActivationList = '/admin/api/v1/contracts/',
}

/**
 * @description: 激活 list
 */
export function getActivationListApi() {
  return defHttp.get({
    url: Api.ActivationList,
  });
}

/**
 * @description: 激活/撤销 list
 */
export function handleActivationStatusApi(id, params) {
  return defHttp.patch({
    url: `/admin/api/v1/contracts/${id}`,
    params
  });
}

