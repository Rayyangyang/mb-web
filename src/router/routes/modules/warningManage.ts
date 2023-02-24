import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const WarningManage: AppRouteModule = {
  path: '/warningManage',
  name: 'WarningManage',
  component: LAYOUT,
  redirect: '/warningManage/waringIndicator',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '预警管理',
    orderNo: 13,
    roles: [RoleEnum.ADMIN],
  },
  children: [
    {
      path: 'waringIndicator',
      name: 'WaringIndicator',
      component: () => import('/@/views/waringManage/WaringIndicator.vue'),
      meta: {
        title: '预警指标',
        icon: 'simple-icons:about-dot-me',
      },
    },
    {
      path: 'warningMsg',
      name: 'WarningMsg',
      component: () => import('/@/views/waringManage/WarningMsg.vue'),
      meta: {
        title: '预警消息',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default WarningManage;
