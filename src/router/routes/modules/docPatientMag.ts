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
      name: 'PatientMagPage',
      component: () => import('/@/views/docPatientMag/index.vue'),
      meta: {
        title: '患者管理',
        hideMenu: true,
        icon: 'simple-icons:about-dot-me',
      },
      children: [
        {
          path: 'patientInfo',
          name: 'PatientInfo',
          component: () => import('/@/views/docPatientMag/components/PatientInfo.vue'),
          meta: {
            title: '患者档案',
            hideMenu: true,
            icon: 'simple-icons:about-dot-me',
          },
        },
        // {
        //   path: 'dailyMonitoring',
        //   name: 'DailyMonitoring',
        //   component: () => import('/@/views/docPatientMag/components/DailyMonitoring.vue'),
        //   meta: {
        //     title: '日常监测',
        //     hideMenu: true,
        //     icon: 'simple-icons:about-dot-me',
        //   },
        // },
      ],
    },
  ],
};

export default PatientMag;
