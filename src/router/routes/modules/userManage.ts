import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const about: AppRouteModule = {
  path: '/userManage',
  name: 'UserManage',
  component: LAYOUT,
  redirect: '/userManage/roleManage',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '人员管理',
    orderNo: 11,
  },
  children: [
    {
      path: 'roleManage',
      name: 'RoleManage',
      component: () => import('/@/views/userManage/RoleManage.vue'),
      meta: {
        title: '角色管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'userManageChild',
      name: 'userManageChild',
      component: () => import('/@/views/userManage/UserManage.vue'),
      meta: {
        title: '人员管理',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default about;
