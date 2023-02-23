import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const ArchivesManage: AppRouteModule = {
  path: '/archivesManage',
  name: 'ArchivesManage',
  component: LAYOUT,
  redirect: '/archivesManage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '档案管理',
    orderNo: 12,
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'index',
      name: 'ArchivesManagePage',
      component: () => import('/@/views/archives/index.vue'),
      meta: {
        title: '档案管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default ArchivesManage;
