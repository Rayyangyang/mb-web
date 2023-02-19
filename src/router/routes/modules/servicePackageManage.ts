import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/servicePackageManage',
  name: 'ServicePackageManage',
  component: LAYOUT,
  redirect: '/servicePackageManage/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '服务包管理',
    orderNo: 14,
  },
  children: [
    {
      path: 'index',
      name: 'ServicePackageManagePage',
      component: () => import('/@/views/servicePackageManage/index.vue'),
      meta: {
        title: '服务包管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default about;
