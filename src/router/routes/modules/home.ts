import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const Home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '首页',
    orderNo: 10,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: '首页',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default Home;
