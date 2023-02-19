<template>
  <div class="progress-wrapper">
    <div class="title">
      <span>{{ title }}</span>
      <span>{{ value }}</span>
    </div>
    <Progress :percent="value" :show-info="false" />
  </div>
</template>

<script setup lang="ts">
  import { Progress } from 'ant-design-vue';

  defineProps({
    title: {
      type: String,
    },
    value: {
      type: Number,
    },
  });
</script>

<style scoped lang="scss">
  .progress-wrapper {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
