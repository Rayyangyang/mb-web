<template>
  <div class="service-package-wrapper my-container">
    <div class="table-handle-wrapper">
      <div class="search-wrapper">
        <div class="mr-2">
          <Input v-model:value="userName" placeholder="请输入服务包名称" size="small" />
        </div>
        <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="small"
          >查询</Button
        >
      </div>
      <div class="handle-btns">
        <Button
          @click="addNewPackage"
          style="border-radius: 4px; padding: 0px 16px"
          type="primary"
          size="small"
          >新增</Button
        >
      </div>
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
            <span style="color: #29a5ff" class="mr-1">详情</span>
            <span style="color: #29a5ff" class="mr-1">修改</span>
            <span style="color: red" class="mr-1">删除</span>
          </div>
        </template>
      </template>
    </Table>

    <!-- 患者档案 -->
    <Modal v-model:visible="addPackageVisiable" title="新增/修改/查看服务包信息" width="800px">
      <div class="user-archives-info">
        <div class="my-title">
          <i></i>
          <span>基础信息</span>
        </div>
        <div style="display: flex">
          <div style="width: 60%">
            <Form
              :model="formState"
              name="basic"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 14 }"
              autocomplete="off"
              @finish="onFinish"
              style="width: 100%"
              @finishFailed="onFinishFailed"
            >
              <FormItem
                label="服务包名称"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
              >
                <Input v-model:value="formState.username" />
              </FormItem>
              <FormItem
                label="服务包价格"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
              >
                <Input v-model:value="formState.username" />
              </FormItem>
              <FormItem
                label="签约年限"
                name="username"
                :rules="[{ required: true, message: 'Please input your username!' }]"
              >
                <DatePicker v-model:value="value1" style="width: 100%" />
              </FormItem>
            </Form>
          </div>

          <div class="upload-wrapper">
            <span class="mr-3">图片介绍: </span>
            <div>
              <Upload
                v-model:file-list="fileList"
                name="avatar"
                list-type="picture-card"
                class="avatar-uploader"
                :show-upload-list="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :before-upload="beforeUpload"
                @change="handleChange"
              >
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between">
          <div class="my-title">
            <i></i>
            <span>团队成员</span>
          </div>
          <span style="color: #29a5f; cursor: pointer" @click="addUserVisiable = true">
            + 添加成员
          </span>
        </div>
        <Table :columns="columns" :data-source="data" :customRow="handleRowClick">
          <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'action'">
              <div>
                <span style="color: #29a5ff" class="mr-1">详情</span>
                <span style="color: red" class="mr-1">删除</span>
              </div>
            </template>
          </template>
        </Table>
      </div>
      <template #footer>
        <Button key="back" @click="visible = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="handleOk" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>

    <!-- 添加成员 -->
    <Modal v-model:visible="addUserVisiable" width="800px">
      <div style="padding: 20px">
        <div class="table-handle-wrapper">
          <div class="search-wrapper">
            <div class="mr-2">
              <Input v-model:value="userName" placeholder="请输入成员姓名" size="small" />
            </div>
            <div class="mr-2">
              <Input v-model:value="userName" placeholder="请输入成员联系电话" size="small" />
            </div>

            <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="small"
              >查询</Button
            >
          </div>
          <div class="handle-btns">
            <Button
              @click="addNewUser"
              style="border-radius: 4px; padding: 0px 16px"
              type="primary"
              size="small"
              >新增</Button
            >
          </div>
        </div>
        <Table :columns="columns" :data-source="data" :row-selection="rowSelection">
          <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'action'">
              <!-- <div>
                <span style="color: #29a5ff" class="mr-1">详情</span>
                <span style="color: #29a5ff" class="mr-1">修改</span>
                <span style="color: red" class="mr-1">删除</span>
                <span style="color: #29a5ff">重置密码</span>
              </div> -->
            </template>
          </template>
        </Table>
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
  import { ref, watch, reactive } from 'vue';
  import {
    Button,
    Modal,
    Input,
    Table,
    Descriptions,
    Switch,
    Form,
    DatePicker,
    Upload,
  } from 'ant-design-vue';

  const DescriptionsItem = Descriptions.Item;
  const FormItem = Form.Item;
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
    {
      title: '启用/禁用',
      dataIndex: 'address',
      key: 'openStatus',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 140,
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

  let visible = ref(false);

  let isOpen = ref(false);

  let formState = ref({});

  let addPackageVisiable = ref(false);
  const addNewPackage = () => {
    addPackageVisiable.value = true;
  };

  // 添加服务包成员
  let addUserVisiable = ref(false);
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys: (string | number)[], selectedRows: DataItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: DataItem, selected: boolean, selectedRows: DataItem[]) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: DataItem[], changeRows: DataItem[]) => {
      console.log(selected, selectedRows, changeRows);
    },
  });
</script>

<style scoped lang="less">
  .service-package-wrapper {
    padding: 20px;
    background-color: #fff;
    .table-handle-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .search-wrapper {
        display: flex;
        align-items: center;
      }
    }
  }

  .user-archives-info {
    padding: 20px;
  }
  .upload-wrapper {
    display: flex;
  }

  .table-handle-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .search-wrapper {
      display: flex;
      align-items: center;
    }
  }
</style>
