import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/tagManage',
  name: 'TagManage',
  component: LAYOUT,
  redirect: '/tagManage/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '标签管理',
    orderNo: 90,
  },
  children: [
    {
      path: 'index',
      name: 'TagManagePage',
      component: () => import('/@/views/tagManage/index.vue'),
      meta: {
        title: '标签管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default about;
