<template>
  <div class="my-container patient-info-wrapper">
    <div class="top-select">
      <span @click="tagValue = '1'">患者档案</span>
      <div class="daliy">
        <span class="daliy-monitor">日常监测</span>
        <div class="daliy-child">
          <span @click="tagValue = '2'">心率监测</span>
          <span @click="tagValue = '3'">血压监测</span>
        </div>
      </div>
      <div class="task">
        <span class="task-monitor">监测任务</span>
        <div class="task-child">
          <span @click="tagValue = '4'">心率监测任务</span>
          <span @click="tagValue = '5'">血压监测任务</span>
        </div>
      </div>
    </div>

    <div>
      <PatientFile v-if="tagValue == '1'" />
      <!-- 心率监测 -->
      <HeartMonitoring v-if="tagValue == '2'" />
      <!-- 血压监测 -->
      <BloodMonitoring v-if="tagValue == '3'" />
      <!-- 心率监测任务 -->
      <HeartMonitoringTask v-if="tagValue == '4'" />
      <!-- 血压监测任务 -->
      <BloodMonitoringTask v-if="tagValue == '5'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Button, Radio } from 'ant-design-vue';
  import { useRouter } from 'vue-router';

  import PatientFile from './PatientFile.vue';
  import HeartMonitoring from './HeartMonitoring.vue';
  import BloodMonitoring from './BloodMonitoring.vue';

  import HeartMonitoringTask from './HeartMonitoringTask.vue'
  import BloodMonitoringTask from './BloodMonitoringTask.vue'

  const router = useRouter();
  const RadioGroup = Radio.Group;
  const RadioButton = Radio.Button;

  let isShowDailyChild = ref(false);

  let tagValue = ref('1');
  let tag = ref(1);
</script>

<style lang="scss" scoped>
  .patient-info-wrapper {
    background-color: #fff;
    position: relative;
    padding: 15px;
    .top-select {
      margin-bottom: 60px;
      display: flex;
      span {
        cursor: pointer;
        display: inline-block;
        width: 100px;
        line-height: 30px;
        border: 1px solid #ccc;
        text-align: center;
      }
      .daliy {
        position: relative;
      }
      .daliy:hover {
        .daliy-child {
          display: block;
        }
      }
      .daliy-child {
        display: none;
        position: absolute;
        top: 30px;
      }
      .task {
        position: relative;
      }
      .task:hover {
        .task-child {
          display: block;
        }
      }
      .task-child {
        display: none;
        position: absolute;
        top: 30px;
      }
    }
  }
</style>
