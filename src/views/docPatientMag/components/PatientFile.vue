<template>
  <div class="patient-file-wrapper">
    <div class="my-title">
      <i></i>
      <span>基础信息</span>
    </div>
    <Descriptions>
      <DescriptionsItem label="真实姓名">{{ patientInfo['真实姓名'] }}</DescriptionsItem>
      <DescriptionsItem label="性别">{{ patientInfo['性别'] }}</DescriptionsItem>
      <DescriptionsItem label="现居地址">{{ patientInfo['现居地址'] }}</DescriptionsItem>
      <DescriptionsItem label="身份证号">{{ patientInfo['身份证号'] }}</DescriptionsItem>
      <DescriptionsItem label="身高">{{ patientInfo['身高'] }}</DescriptionsItem>
      <DescriptionsItem label="过敏史">{{ patientInfo['过敏史'] }}</DescriptionsItem>
      <DescriptionsItem label="联系电话">{{ patientInfo['联系电话'] }}</DescriptionsItem>
      <DescriptionsItem label="体重">{{ patientInfo['体重'] }}</DescriptionsItem>
      <DescriptionsItem label="既往史">{{ patientInfo['既往史'] }}</DescriptionsItem>
      <DescriptionsItem label="家族病史">{{ patientInfo['家族病史'] }}</DescriptionsItem>
      <DescriptionsItem label="就诊史">{{ patientInfo['就诊史'] }}</DescriptionsItem>
    </Descriptions>
  </div>
</template>

<script setup lang="ts">
  import { Descriptions } from 'ant-design-vue';
  import { usePatientInfoStore } from '/@/store/modules/patientInfo';

  const { patientInfo } = usePatientInfoStore();
  const DescriptionsItem = Descriptions.Item;
</script>

<style scoped lang="scss"></style>
