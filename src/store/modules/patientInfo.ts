import { defineStore } from 'pinia';

export const usePatientInfoStore = defineStore({
  id: 'patient-info',
  state: () => ({
    patientInfo: {},
  }),
  actions: {
    setPatientInfo(info) {
      this.patientInfo = info ? info : '';
    },
  },
});
