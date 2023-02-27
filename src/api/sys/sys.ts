import { defHttp } from '/@/utils/http/axios';

enum Api {
  UploadSys = '/admin/api/v1/sys-configs?c=tags',
}

/**
 * @description: user tree list
 */
export function getSysListApi() {
  return defHttp.get({
    url: `/api/v1/sys-configs?c=tags`,
  });
}

/**
 * @description: user tree list
 */
export function uploadSysTreeApi(params) {
  return defHttp.put({
    url: Api.UploadSys,
    params,
  });
}
