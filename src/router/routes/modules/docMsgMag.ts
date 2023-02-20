import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const MsgMag: AppRouteModule = {
  path: '/msgMag',
  name: 'MsgMag',
  component: LAYOUT,
  redirect: '/msgMag/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '消息管理',
    orderNo: 13,
    roles: [RoleEnum.DOC],
  },
  children: [
    {
      path: 'index',
      name: 'MsgMagPage',
      component: () => import('/@/views/docMsgMag/index.vue'),
      meta: {
        title: '消息管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default MsgMag;
