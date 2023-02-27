<template>
  <div class="patient-file-wrapper">
    <div class="my-title">
      <i></i>
      <span>基础信息</span>
    </div>
    <Descriptions>
      <DescriptionsItem label="真实姓名">{{ curInfo['真实姓名'] }}</DescriptionsItem>
      <DescriptionsItem label="性别">{{ curInfo['性别'] }}</DescriptionsItem>
      <DescriptionsItem label="现居地址">{{ curInfo['现居地址'] }}</DescriptionsItem>
      <DescriptionsItem label="身份证号">{{ curInfo['身份证号'] }}</DescriptionsItem>
      <DescriptionsItem label="身高">{{ curInfo['身高'] }}</DescriptionsItem>
      <DescriptionsItem label="过敏史">{{ curInfo['过敏史'] }}</DescriptionsItem>
      <DescriptionsItem label="联系电话">{{ curInfo['联系电话'] }}</DescriptionsItem>
      <DescriptionsItem label="体重">{{ curInfo['体重'] }}</DescriptionsItem>
      <DescriptionsItem label="既往史">{{ curInfo['既往史'] }}</DescriptionsItem>
      <DescriptionsItem label="家族病史">{{ curInfo['家族病史'] }}</DescriptionsItem>
      <DescriptionsItem label="就诊史">{{ curInfo['就诊史'] }}</DescriptionsItem>
    </Descriptions>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Descriptions } from 'ant-design-vue';

  const curInfo = ref({});
  const DescriptionsItem = Descriptions.Item;
</script>

<style scoped lang="scss"></style>
