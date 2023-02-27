<template>
  <div class="blood-monitoring-wrapper">
    <div class="top-info">
      <div class="my-title">
        <i></i>
        <span>基础信息</span>
      </div>
      <Button type="primary" size="middle" @click="addNewTask">新建监测任务</Button>
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
            <span style="color: #29a5ff" class="mr-1" @click="showInfo">查看详情</span>
          </div>
        </template>
      </template>
    </Table>

    <!-- 新增任务 -->
    <Modal v-model:visible="visible" title="新增任务" width="800px" @cancel="close">
      <div class="user-archives-info">
        <div class="my-title">
          <i></i>
          <span>基础信息</span>
        </div>
        <div style="display: flex">
          <div style="width: 100%">
            <Form
              :model="formState"
              name="basic"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              autocomplete="off"
              style="width: 100%"
              ref="formRef"
            >
              <Row>
                <Col :span="12">
                  <FormItem
                    label="任务名称"
                    name="name"
                    :rules="[{ required: true, message: '请输入服务包名称' }]"
                  >
                    <Input v-model:value="formState.name" :disabled="!isEdit" />
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem
                    label="监测频次"
                    name="name"
                    :rules="[{ required: true, message: '请输入服务包名称' }]"
                  >
                    <Input v-model:value="formState.name" :disabled="!isEdit" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="12">
                  <FormItem
                    label="开始时间"
                    name="name"
                    :rules="[{ required: true, message: '请输入服务包名称' }]"
                  >
                    <Input v-model:value="formState.name" :disabled="!isEdit" />
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem
                    label="结束时间"
                    name="name"
                    :rules="[{ required: true, message: '请输入服务包名称' }]"
                  >
                    <Input v-model:value="formState.name" :disabled="!isEdit" />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col :span="12">
                  <FormItem
                    label="监测注意"
                    name="name"
                    :rules="[{ required: true, message: '请输入服务包名称' }]"
                  >
                    <Input v-model:value="formState.name" :disabled="!isEdit" />
                  </FormItem>
                </Col>
                <Col :span="12">
                  <FormItem
                    label="提醒时间"
                    name="name"
                    :rules="[{ required: true, message: '请输入服务包名称' }]"
                  >
                    <Input v-model:value="formState.name" :disabled="!isEdit" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
      <template #footer>
        <Button key="back" @click="visible = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="handleOk" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>
    
    <!-- 任务详情 -->
    <Modal v-model:visible="visibleInfo" title="查看任务详情" width="800px" @cancel="close">
      <div>
        <Table
          :columns="infoColumns"
          :data-source="tableData"
          :pagination="pagination"
          @change="changePage"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <div>
                <span
                  style="color: #29a5ff; cursor: pointer"
                  class="mr-1"
                  @click="addSuggest(record)"
                  >填写建议</span
                >
              </div>
            </template>
          </template>
        </Table>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import {
    Button,
    Modal,
    Input,
    Table,
    Descriptions,
    Switch,
    Form,
    Row,
    Col,
  } from 'ant-design-vue';
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

  const infoColumns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '监测日期',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '测重方式',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '数值(mmHg)',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '预警等级',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '上传时间',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '状态',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const FormItem = Form.Item;
  const isEdit = ref(true);
  const visible = ref(false);
  const visibleInfo = ref(false);
  const formState = ref({});

  const close = () => {
    formState.value = {};
  };
  const addNewTask = () => {
    visible.value = true;
  };

  const handleOk = () => {};

  const showInfo = () => {
    visibleInfo.value = true
  };
</script>

<style scoped lang="scss">
  .top-info {
    display: flex;
    justify-content: space-between;
  }
  .user-archives-info {
    padding: 20px;
  }
</style>
