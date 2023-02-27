<template>
  <div class="waring-indicator-wrapper my-container">
    <RadioGroup v-model:value="mode" :style="{ marginBottom: '8px' }">
      <RadioButton value="1">血压指标</RadioButton>
      <RadioButton value="2">心率指标</RadioButton>
    </RadioGroup>

    <!-- 血压预警 -->
    <div class="" v-show="mode == 1">
      <div class="my-title">
        <i></i>
        <span>血压预警</span>
      </div>
    </div>

    <!-- 心率预警 -->
    <div v-show="mode == 2">
      <div class="my-title">
        <i></i>
        <span>心率预警</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Radio } from 'ant-design-vue';
  import {getWraningTargetApi} from '/@/api/warning/warning'
  const RadioGroup = Radio.Group;
  const RadioButton = Radio.Button;



  onMounted(async()=>{
    await getWraningTarget()
  })

  const getWraningTarget = async()=>{
    let res = await getWraningTargetApi()
    
  }

  let mode = ref('1');
</script>

<style scoped lang="scss">
  .waring-indicator-wrapper {
    background-color: #fff;
    padding: 20px;
  }
</style>

<style lang="less">
  .waring-indicator-wrapper {
    .ant-radio-button-wrapper-checked {
      color: #fff !important;
      background-color: #29a5ff !important;
    }
  }
</style>
