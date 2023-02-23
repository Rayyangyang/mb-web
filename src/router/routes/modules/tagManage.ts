import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const TagManage: AppRouteModule = {
  path: '/tagManage',
  name: 'TagManage',
  component: LAYOUT,
  redirect: '/tagManage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '标签管理',
    orderNo: 16,
    roles: [RoleEnum.ADMIN],
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

export default TagManage;
