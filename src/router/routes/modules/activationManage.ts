import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/activationManage',
  name: 'ActivationManage',
  component: LAYOUT,
  redirect: '/activationManage/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '激活管理',
    orderNo: 90,
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

export default about;
