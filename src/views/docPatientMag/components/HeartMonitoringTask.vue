<template>
  <div class="heart-monitoring-wrapper">
    <div class="top-info">
      <div class="my-title">
        <i></i>
        <span>基础信息</span>
      </div>
      <Button type="primary" size="middle">新建监测任务</Button>
    </div>
    <Table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'openStatus'">
          <div>
            <Switch v-model:checked="isOpen" />
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div>
            <span style="color: #29a5ff" class="mr-1" @click="editTags">查看详情</span>
            <span style="color: red" class="mr-1">删除任务</span>
          </div>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import { Button, Modal, Input, Table, Descriptions, Switch, Form } from 'ant-design-vue';
  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '任务名称',
      dataIndex: 'tagName',
      key: 'tagName',
    },
    {
      title: '任务开始时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
    },
    {
      title: '任务结束时间',
      dataIndex: 'enabled',
      key: 'enabled',
      ellipsis: true,
    },
    {
      title: '任务间隙',
      dataIndex: 'enabled',
      key: 'enabled',
      ellipsis: true,
    },
    {
      title: '任务条数',
      dataIndex: 'enabled',
      key: 'enabled',
      ellipsis: true,
    },
    {
      title: '任务执行情况',
      dataIndex: 'enabled',
      key: 'enabled',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 180,
      dataIndex: 'Action',
      key: 'action',
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
</script>

<style scoped lang="scss">
  .top-info {
    display: flex;
    justify-content: space-between;
  }
</style>
