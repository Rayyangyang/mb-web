import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const DocWarningManage: AppRouteModule = {
  path: '/docWarningManage',
  name: 'DocWarningManage',
  component: LAYOUT,
  redirect: '/docWarningManage/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '预警管理',
    orderNo: 13,
    roles: [RoleEnum.DOC],
  },
  children: [
    {
      path: 'index',
      name: 'docWarningMagPage',
      component: () => import('/@/views/docWarningMag/index.vue'),
      meta: {
        title: '预警管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
        roles: [RoleEnum.DOC],
      },
    },
  ],
};

export default DocWarningManage;
