<template>
  <div class="heart-wrapper">
    <div class="chart-content">
      <div class="my-title">
        <i></i>
        <p>心率趋势</p>
      </div>
      <div class="chart-info">
        <div class="time-control">
          <RangePicker v-model:value="timeRange" />
        </div>
        <div style="display: flex">
          <span style="display: flex; align-items: center; margin-right: 10px">
            <i class="point"></i>
            收缩压（高压）
          </span>
        </div>
      </div>
      <div id="main"></div>
    </div>
    <div class="talbe-wrapper">
      <div class="my-title">
        <i></i>
        <p>历史记录</p>
      </div>
      <Table :columns="columns" :data-source="tableData">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'enabled'">
            <div>
              <Switch v-model:checked="record.enabled" @click="changeEnabled(record)" />
            </div>
          </template>
          <template v-if="column.key === 'action'">
            <div>
              <span
                style="color: #29a5ff; cursor: pointer"
                class="mr-1"
                @click="showInfo(record, false)"
                >填写建议</span
              >
            </div>
          </template>
        </template>
      </Table>
    </div>
    <!-- 填写建议 -->
    <Modal v-model:visible="visible" title="填写建议" @cancel="suggest = ''">
      <div style="padding: 20px">
        <div style="display: flex">
          <span style="width: 100px">主管建议：</span>
          <TextArea
            v-model:value="suggest"
            placeholder="请输入标签名称"
            :auto-size="{ minRows: 5, maxRows: 5 }"
          />
        </div>
      </div>
      <template #footer>
        <Button key="back" @click="visible = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="handleOk" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, onMounted } from 'vue';

  import { RangePicker, Table, Input, Modal, Button } from 'ant-design-vue';

  const TextArea = Input.TextArea;
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '3%',
      containLabel: true,
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        itemStyle: {
          color: '#FF447E',
        },
      },
    ],
  };

  const initChart = () => {
    const myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option);
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '测量时间',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数值(mmHg)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '数据来源',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: '评估',
      dataIndex: 'serve_length',
      key: 'serve_length',
    },
    {
      title: '操作',
      width: 140,
      dataIndex: 'Action',
      key: 'action',
    },
  ];

  const tableData = ref([{}]);

  const visible = ref(false);

  const suggest = ref('');

  const showInfo = (val) => {
    visible.value = true;
  };

  const handleOk = () => {};
  onMounted(() => {
    initChart();
  });
</script>

<style lang="scss" scoped>
  p {
    margin: 0;
  }
  .chart-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    flex: 1;
    margin-right: 1.3%;
    #main {
      height: 200px;
      width: 100%;
    }
    .chart-info {
      display: flex;
      justify-content: space-between;
    }
  }
  .point {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #5495fd;
    margin-right: 8px;
  }
</style>
