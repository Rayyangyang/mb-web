<template>
  <div class="user-wrapper my-container">
    <div class="left-wrapper">
      <div class="title">
        <span>角色</span>
        <p @click="addNew"> + 新增角色 </p>
      </div>
      <div class="user-list-wrapper">
        <Tree :tree-data="treeData" :field-names="fieldNames">
          <template #title="{ name, key }">
            <div class="tree-item">
              <span>{{ name }}</span>
              <div class="control-wrapper">
                <div style="display: flex; align-items: center">
                  <div class="mr-2">
                    <img src="../../assets/icons/add.png" alt="" @click="secVisible = true" />
                  </div>
                  <div class="mr-2">
                    <img src="../../assets/icons/edit.png" alt="" @click="edit" />
                  </div>
                  <div>
                    <img src="../../assets/icons/del.png" alt="" @click="del" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tree>
      </div>
    </div>
    <div class="right-wrapper">
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
      <Table :columns="columns" :data-source="data">
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'action'">
            <div>
              <span style="color: #29a5ff" class="mr-1">详情</span>
              <span style="color: #29a5ff" class="mr-1">修改</span>
              <span style="color: red" class="mr-1">删除</span>
              <span style="color: #29a5ff">重置密码</span>
            </div>
          </template>
        </template>
      </Table>
    </div>

    <!-- 一级机构 -->
    <Modal v-model:visible="visible" title="新增/修改机构">
      <div class="edit-user-wrapper">
        <span class="mr-4">
          <i style="color: red">*</i>
          一级机构名称
        </span>
        <div style="width: 70%">
          <Input v-model:value="firOrgName" placeholder="请输入机构名称" />
        </div>
      </div>
      <template #footer>
        <Button key="back" @click="visible = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="handleOk" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>

    <!-- 二级机构 -->
    <Modal v-model:visible="secVisible" title="新增/修改机构">
      <div>
        <p style="padding: 20px 20px 0px">
          <span class="mr-4"> 一级机构名称： </span>
          1233333
        </p>
        <div class="edit-user-wrapper">
          <span class="mr-4">
            <i style="color: red">*</i>
            二级机构名称:
          </span>
          <div style="width: 70%">
            <Input v-model:value="firOrgName" placeholder="请输入机构名称" />
          </div>
        </div>
      </div>

      <template #footer>
        <Button key="back" @click="secVisible = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="handleOk" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>

    <!-- 新增成员 -->
    <!-- 一级机构 -->
    <Modal v-model:visible="userVisible" title="新增/修改/查看成员信息" width="600px">
      <div class="edit-userinfo-wrapper">
        <Form
          :model="formState"
          name="basic"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 8 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <FormItem
            label="姓名"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.username" />
          </FormItem>
          <FormItem
            label="手机号"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.username" />
            <p style="color: #b1b1b1">默认密码： 123456</p>
          </FormItem>
          <FormItem
            label="身份证号"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.username" />
          </FormItem>
          <FormItem
            label="职务"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.username" />
          </FormItem>
          <FormItem
            label="角色"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.username" />
          </FormItem>
        </Form>
        <div class="remark-wrapper">
          <span>备注:</span>
          <Textarea v-model:value="formState.username" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </div>
        <!-- 上传 -->
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
            <p style="font-size: 12px; color: #b1b1b1">仅支持上传JPG/PNG/</p>
            <p style="font-size: 12px; color: #b1b1b1">JPEG格式，小于10MB</p>
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
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive } from 'vue';
  import {
    Checkbox,
    Button,
    Modal,
    Input,
    message,
    Tree,
    Table,
    Form,
    Textarea,
    Upload,
  } from 'ant-design-vue';

  const CheckboxGroup = Checkbox.Group;
  const FormItem = Form.Item;
  const fieldNames = {
    children: 'child',
    title: 'name',
  };
  const treeData = [
    {
      name: 'parent 1',
      key: '0-0',
      child: [
        {
          name: '张晨成',
          key: '0-0-0',
          child: [
            { name: 'leaf', key: '0-0-0-0' },
            { name: 'leaf', key: '0-0-0-1' },
          ],
        },
        {
          name: 'parent 1-1',
          key: '0-0-1',
          child: [{ key: '0-0-1-0', name: 'zcvc' }],
        },
      ],
    },
  ];

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
  let isAdd = ref(false);
  let firOrgName = ref('');

  let secVisible = ref(false);
  let userVisible = ref(false);

  // 新增
  const addNew = () => {
    visible.value = true;
    isAdd.value = true;
  };
  // 修改
  const edit = () => {
    visible.value = true;
    isAdd.value = false;
  };
  // 新增子级
  const addChild = () => {};

  const handleOk = () => {
    if (firOrgName.value.length == 0) {
      message.error('机构名称必填');
      return;
    }
    visible.value = false;
  };

  const del = () => {};

  // 成员
  const formState = ref({});
  const addNewUser = () => {
    userVisible.value = true;
  };
</script>

<style scoped lang="less">
  p {
    margin: 0;
  }
  .user-wrapper {
    display: flex;
  }
  .left-wrapper {
    width: 20%;
    margin-right: 20px;
    background-color: #fff;
    .title {
      display: flex;
      padding: 15px;
      justify-content: space-between;
      p {
        color: #29a5ff;
        cursor: pointer;
      }
    }

    .tree-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .right-wrapper {
    width: 80%;
    height: 100%;
    background-color: #fff;
    padding: 15px;
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

  .footer-btns {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }

  // tree
  ::v-deep(.ant-tree-treenode) {
    width: 100%;
    .ant-tree-node-content-wrapper {
      width: 100%;
      span {
        width: 100%;
        display: inline-block;
      }
    }
  }

  .edit-user-wrapper {
    display: flex;
    align-items: center;
    padding: 20px;
  }
  .edit-userinfo-wrapper {
    padding: 20px;
    position: relative;
    .remark-wrapper {
      display: flex;
      span {
        margin-left: 50px;
        display: inline-block;
        width: 50px;
      }
    }

    .upload-wrapper {
      display: flex;
      position: absolute;
      top: 20px;
      right: 30px;
    }
  }
</style>
