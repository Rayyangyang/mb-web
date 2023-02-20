import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const ActivationManage: AppRouteModule = {
  path: '/activationManage',
  name: 'ActivationManage',
  component: LAYOUT,
  redirect: '/activationManage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '激活管理',
    orderNo: 15,
  },
  children: [
    {
      path: 'index',
      name: 'ActivationManagePage',
      component: () => import('/@/views/activationManage/index.vue'),
      meta: {
        title: '激活管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default ActivationManage;
