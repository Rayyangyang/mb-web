import { defHttp } from '/@/utils/http/axios';

enum Api {
  WraningList = '',
}

/**
 * @description: user tree list
 */
export function getWraningListApi(query, searchStr) {
  return defHttp.get({
    url: `/admin/api/v1/warnings/?pno=${query.pno}&psize=${query.psize}${searchStr}`,
  });
}

/**
 * @description: 预警指标
 */
export function getWraningTargetApi() {
  return defHttp.get({
    url: `/api/v1/sys-configs?c=warning_values2`,
  });
}
