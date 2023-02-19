<template>
  <div class="tags-package-wrapper my-container">
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
          @click="addNewTags"
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
            <span style="color: #29a5ff" class="mr-1" @click="editTags">修改</span>
            <span style="color: red" class="mr-1">删除</span>
          </div>
        </template>
      </template>
    </Table>

    <!-- 新增/修改标签 -->
    <Modal v-model:visible="editTagsVisible" title="新增/修改标签">
      <div style="padding: 20px">
        <div>
          <Form
            :model="formState"
            name="basic"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 14 }"
            autocomplete="off"
            style="width: 100%"
          >
            <FormItem
              label="标签名称"
              name="username"
              :rules="[{ required: true, message: 'Please input your username!' }]"
            >
              <Input v-model:value="formState.username" placeholder="请输入标签名称" />
            </FormItem>
          </Form>
        </div>
      </div>
      <template #footer>
        <Button key="back" @click="editTagsVisible = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="handleOk" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Button, Modal, Input, Table, Descriptions, Switch, Form } from 'ant-design-vue';
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

  const formState = ref({});
  let editTagsVisible = ref(false);

  const addNewTags = () => {
    editTagsVisible.value = true;
  };

  const editTags = () => {
    editTagsVisible.value = true;
  };

  let isOpen = ref(false);
</script>

<style scoped lang="less">
  .tags-package-wrapper {
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
