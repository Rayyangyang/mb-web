import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/docWarningManage',
  name: 'DocWarningManage',
  component: LAYOUT,
  redirect: '/docWarningManage/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '预警管理医生',
    orderNo: 13,
  },
  children: [
    {
      path: 'index',
      name: 'docWarningMagPage',
      component: () => import('/@/views/docWarningMag/index.vue'),
      meta: {
        title: '预警管理医生',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default about;
