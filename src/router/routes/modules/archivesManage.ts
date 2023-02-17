import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/archivesManage',
  name: 'ArchivesManage',
  component: LAYOUT,
  redirect: '/archivesManage/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '档案管理',
    orderNo: 90,
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

export default about;
