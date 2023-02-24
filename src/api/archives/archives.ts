import { defHttp } from '/@/utils/http/axios';

enum Api {
  ArchivesList = '/admin/api/v1/patients/',
}

/**
 * @description: sevicepackage list
 */
export function getArchivesListApi() {
  return defHttp.get({
    url: Api.ArchivesList,
  });
}

/**
 * @description: sevicepackage list
 */
export function getServiceListApi(id) {
  return defHttp.get({
    url: `/admin/api/v1/patients/${id}/contracts/`,
  });
}
