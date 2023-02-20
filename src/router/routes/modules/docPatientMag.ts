import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';

const PatientMag: AppRouteModule = {
  path: '/patientMag',
  name: 'PatientMag',
  component: LAYOUT,
  redirect: '/patientMag/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '患者管理',
    orderNo: 13,
    roles: [RoleEnum.DOC],
  },
  children: [
    {
      path: 'index',
      name: 'patientMagPage',
      component: () => import('/@/views/docPatientMag/index.vue'),
      meta: {
        title: '患者管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default PatientMag;
