import { defHttp } from '/@/utils/http/axios';

/**
 * @description: user tree list
 */
export function getDocWraningListApi(query, searchStr) {
  return defHttp.get({
    url: `/dapi/v1/warnings/?s=0&pno=${query.pno}&psize=${query.psize}${searchStr}`,
  });
}
