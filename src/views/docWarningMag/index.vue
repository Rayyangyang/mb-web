<template>
  <div class="doc-waring-wrapper my-container">
    <RadioGroup v-model:value="mode" :style="{ marginBottom: '8px' }">
      <RadioButton value="1">血压指标</RadioButton>
      <RadioButton value="2">心率指标</RadioButton>
    </RadioGroup>

    <!-- 血压预警 -->
    <div class="" v-show="mode == 1">
      <div class="table-handle-wrapper">
        <div class="search-wrapper">
          <div class="mr-2">
            <Input v-model:value="userName" placeholder="请输入患者姓名" size="middle" />
          </div>
          <div class="mr-2">
            <Select
              ref="select"
              v-model:value="value1"
              style="width: 180px"
              @focus="focus"
              placeholder="请选择预警项目"
              @change="handleChange"
              size="middle"
            >
              <SelectOption value="jack">Jack</SelectOption>
              <SelectOption value="lucy">Lucy</SelectOption>
              <SelectOption value="Yiminghe">yiminghe</SelectOption>
            </Select>
          </div>
          <div class="mr-2">
            <Select
              ref="select"
              v-model:value="value1"
              style="width: 180px"
              @focus="focus"
              placeholder="请选择预警等级"
              @change="handleChange"
              size="middle"
            >
              <SelectOption value="jack">Jack</SelectOption>
              <SelectOption value="lucy">Lucy</SelectOption>
              <SelectOption value="Yiminghe">yiminghe</SelectOption>
            </Select>
          </div>

          <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
            >查询</Button
          >
        </div>
      </div>
      <Table :columns="columns" :data-source="data" :customRow="handleRowClick">
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'action'">
            <div>
              <span style="color: #29a5ff; cursor: pointer" class="mr-1" @click="showInfo(column)"
                >详情</span
              >
            </div>
          </template>
        </template>
      </Table>
    </div>

    <!-- 心率预警 -->
    <div v-show="mode == 2">
      <div class="my-title">
        <i></i>
        <span>心率预警</span>
      </div>
    </div>

    <!-- 主管患者 预警管理详情 -->
    <!-- 患者档案 -->
    <Modal v-model:visible="visible" title="患者档案" width="800px" :footer="null">
      <div class="user-archives-info">
        <div class="my-title">
          <i></i>
          <span>预警信息</span>
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem label="预警时间">Zhou Maomao</DescriptionsItem>
            <DescriptionsItem label="预警项目">1810000000</DescriptionsItem>
            <DescriptionsItem label="预警值">Hangzhou, Zhejiang</DescriptionsItem>
            <DescriptionsItem label="预警等级">empty</DescriptionsItem>
            <DescriptionsItem label="主管医生">12</DescriptionsItem>
          </Descriptions>
        </div>
        <div class="my-title">
          <i></i>
          <span>服务信息</span>
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem label="真实姓名">Zhou Maomao</DescriptionsItem>
            <DescriptionsItem label="性别">1810000000</DescriptionsItem>
            <DescriptionsItem label="现居地址">Hangzhou, Zhejiang</DescriptionsItem>
            <DescriptionsItem label="身份证号">empty</DescriptionsItem>
            <DescriptionsItem label="身高">12</DescriptionsItem>
            <DescriptionsItem label="过敏史">12</DescriptionsItem>
            <DescriptionsItem label="联系电话">12</DescriptionsItem>
            <DescriptionsItem label="体重">12</DescriptionsItem>
            <DescriptionsItem label="既往史">12</DescriptionsItem>
            <DescriptionsItem label="家族病史">12</DescriptionsItem>
            <DescriptionsItem label="就诊史">12</DescriptionsItem>
            <DescriptionsItem label="血压标签">12</DescriptionsItem>
            <DescriptionsItem label="心率标签">12</DescriptionsItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive } from 'vue';
  import { Button, Modal, Input, Table, Descriptions, Select, Radio } from 'ant-design-vue';
  const DescriptionsItem = Descriptions.Item;

  const SelectOption = Select.Option;
  const RadioGroup = Radio.Group;
  const RadioButton = Radio.Button;

  let visible = ref(false);

  const showInfo = (row) => {
    visible.value = true;
  };
  let mode = ref('1');
</script>

<style scoped lang="scss">
  .doc-waring-wrapper {
    background-color: #fff;
    padding: 20px;
  }
</style>

<style lang="less">
  .doc-waring-wrapper {
    .ant-radio-button-wrapper-checked {
      color: #fff !important;
      background-color: #29a5ff !important;
    }
  }
</style>
