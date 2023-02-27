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
