<template>
  <div class="home-wrapper my-container">
    <div class="card-wrapper">
      <div class="card-item" v-for="(ele, i) in homeList" :key="i">
        <div class="img"></div>
        <div class="card-info">
          <p class="fb">{{ ele.title }}</p>
          <p>{{ ele.value }}</p>
        </div>
      </div>
    </div>
    <div class="center-wrapper">
      <div class="chart-content">
        <div class="my-title">
          <i></i>
          <p>新增客户数量</p>
        </div>
        <div class="chart-info">
          <div class="time-control">
            <RangePicker v-model:value="timeRange" />
          </div>
          <div>
            <i class="point"></i>
            人数
          </div>
        </div>
        <div id="main"></div>
      </div>
      <div class="progress-content">
        <div class="progress1">
          <div class="my-title">
            <i></i>
            <p>居民标签</p>
          </div>
          <div class="progress-info">
            <MyProgress title="高血压" :value="490" />
            <MyProgress title="高血压" :value="490" />
          </div>
        </div>
        <div class="progress2">
          <div class="my-title">
            <i></i>
            <p>预警统计</p>
          </div>
          <div class="progress-info">
            <MyProgress title="高血压" :value="490" />
            <MyProgress title="高血压" :value="490" />
          </div>
        </div>
      </div>
    </div>
    <div class=" ">
      <div class="my-title">
        <i></i>
        <p>今日预警信息</p>
      </div>
      <Table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ text }}</a>
          </template>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import * as echarts from 'echarts';
  import { ref, onMounted } from 'vue';
  import MyProgress from './MyProgress.vue';
  import { RangePicker, Table } from 'ant-design-vue';

  import type { Dayjs } from 'dayjs';
  type RangeValue = [Dayjs, Dayjs];

  const homeList = ref([
    {
      title: '居民总数',
      value: 2000,
    },
    {
      title: '医护总数',
      value: 2000,
    },
    {
      title: '总报警数',
      value: 2000,
    },
    {
      title: '总签约次数',
      value: 2000,
    },
  ]);

  const timeRange = ref<RangeValue>();

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address 1',
      ellipsis: true,
    },
    {
      title: 'Long Column Long Column Long Column',
      dataIndex: 'address',
      key: 'address 2',
      ellipsis: true,
    },
    {
      title: 'Long Column Long Column',
      dataIndex: 'address',
      key: 'address 3',
      ellipsis: true,
    },
    {
      title: 'Long Column',
      dataIndex: 'address',
      key: 'address 4',
      ellipsis: true,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  onMounted(() => {
    initChart();
  });
</script>

<style scoped lang="scss">
  p {
    margin-bottom: 0;
  }
  .card-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .card-item {
      display: flex;
      background-color: #fff;
      width: 24%;
      padding: 15px;
      border-radius: 8px;
    }

    .img {
      width: 40px;
      height: 40px;
      border: 1px solid red;
      margin-right: 12px;
    }
  }

  .center-wrapper {
    display: flex;
    margin-bottom: 20px;
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
    .progress-content {
      width: 24%;
    }
    .progress1 {
      margin-bottom: 10px;
    }
    .progress1,
    .progress2 {
      background-color: #fff;
      padding: 15px;
      border-radius: 8px;
    }
    .point {
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: #ff447e;
    }
  }

  .today-table {
    background-color: #fff;
  }
</style>
