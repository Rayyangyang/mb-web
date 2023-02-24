<template>
  <div class="user-wrapper my-container">
    <div class="left-wrapper">
      <div class="title">
        <span>角色</span>
        <p @click="addNew"> + 新增角色 </p>
      </div>
      <div class="user-list-wrapper">
        <Tree :tree-data="treeData" :field-names="fieldNames" @select="selectTree">
          <template #title="{ name, id, level }">
            <div class="tree-item">
              <span>{{ name }}</span>
              <div class="control-wrapper">
                <div style="display: flex; align-items: center">
                  <div class="mr-2">
                    <img
                      src="../../assets/icons/add.png"
                      alt=""
                      @click="addSecOrg(name, id)"
                      v-show="level == 0"
                    />
                  </div>
                  <div class="mr-2">
                    <img src="../../assets/icons/edit.png" alt="" @click="edit(name, id, level)" />
                  </div>
                  <div>
                    <img src="../../assets/icons/del.png" alt="" @click="del(id)" />
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
            <Input v-model:value="userName" placeholder="请输入成员姓名" size="middle" />
          </div>
          <div class="mr-2">
            <Input v-model:value="userName" placeholder="请输入成员联系电话" size="middle" />
          </div>

          <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
            >查询</Button
          >
        </div>
        <div class="handle-btns">
          <Button
            @click="addNewUser"
            style="border-radius: 4px; padding: 0px 16px"
            type="primary"
            size="middle"
            >新增</Button
          >
        </div>
      </div>
      <Table :columns="columns" :data-source="tableData">
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
        <Button key="submit" type="primary" @click="handleSaveFirTree" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>

    <!-- 二级机构 -->
    <Modal v-model:visible="secVisible" title="新增/修改机构">
      <div>
        <p style="padding: 20px 20px 0px">
          <span class="mr-4"> 一级机构名称： </span>
          {{ firOrgNameStatic }}
        </p>
        <div class="edit-user-wrapper">
          <span class="mr-4">
            <i style="color: red">*</i>
            二级机构名称:
          </span>
          <div style="width: 70%">
            <Input v-model:value="secOrgName" placeholder="请输入机构名称" />
          </div>
        </div>
      </div>

      <template #footer>
        <Button key="back" @click="secVisible = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="saveSecOrg" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>

    <!-- 新增成员 -->
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
            name="name"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.name" />
          </FormItem>
          <FormItem
            label="手机号"
            name="phone"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.phone" />
            <p style="color: #b1b1b1">默认密码： 123456</p>
          </FormItem>
          <FormItem
            label="身份证号"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.idCard" />
          </FormItem>
          <FormItem
            label="职务"
            name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]"
          >
            <Input v-model:value="formState.job" />
          </FormItem>
          <FormItem label="角色" name="role">
            <Select
              v-model:value="formState.role"
              style="width: 100%"
              :options="roleList"
              placeholder="请选择角色"
            />
          </FormItem>
        </Form>
        <div class="remark-wrapper">
          <span>备注:</span>
          <Textarea v-model:value="formState.remark" :auto-size="{ minRows: 2, maxRows: 5 }" />
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
  import { ref, watch, reactive, onMounted } from 'vue';
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
    Select,
  } from 'ant-design-vue';
  import md5 from 'md5';

  import {
    getUserListTreeApi,
    uploadUserListTreeApi,
    getUserListApi,
    createUserApi,
  } from '/@/api/userMag/user';
  import { getRolesListApi } from '/@/api/userMag/roles';

  import { v4 as uuidv4 } from 'uuid';

  onMounted(async () => {
    await getUserTreeList();
    await getUserList('root');

    roleList.value = (await getRolesListApi()).data.map((ele) => {
      return {
        value: ele.id,
        label: ele.name,
      };
    });
  });

  const roleList = ref([]);
  let curSelectRole = ref('');
  const tableData = ref([]);
  const getUserList = async (id) => {
    let res = await getUserListApi(id);
    console.log(123, res);
    tableData.value = res.data.map((ele, i) => {
      return {
        ...ele.profile,
        ...ele,
        order: i + 1,
      };
    });
  };

  const treeData = ref([]);

  const getUserTreeList = async () => {
    let res = await getUserListTreeApi();
    console.log(111, res);
    treeData.value = res.data.children;
    arrayFlagLevel(treeData.value, 0);
  };

  // 处理树形结构
  function arrayFlagLevel(array, level) {
    if (!array || !array.length) return;
    array.forEach((item) => {
      item.level = level;
      if (item.children && item.children.length) {
        arrayFlagLevel(item.children, level + 1);
      }
    });
  }

  // 保存一级机构
  const handleSaveFirTree = async () => {
    // 新增
    if (isAdd.value) {
      let uploadData = [
        {
          name: firOrgName.value,
          children: [],
          meta: {},
          id: uuidv4(),
        },
        ...treeData.value,
      ];

      await uploadUserListTreeApi({
        id: 'root',
        meta: {},
        name: '慢病管理系统',
        children: uploadData,
      });
    } else {
      // 编辑
      changeTreeName(treeData.value, curEditTreeId.value, firOrgName.value);
      await uploadUserListTreeApi({
        id: 'root',
        meta: {},
        name: '慢病管理系统',
        children: treeData.value,
      });
    }

    // 刷新列表
    await getUserTreeList();

    visible.value = false;
  };

  // 添加二级机构
  let firOrgNameStatic = ref('');
  let curEditTreeId = ref('');
  let secOrgName = ref('');
  const addSecOrg = (val, id) => {
    isAdd.value = true;
    curEditTreeId.value = id;
    secVisible.value = true;
    firOrgNameStatic.value = val;
  };

  const saveSecOrg = async () => {
    // 新增
    if (isAdd.value) {
      let uploadData = {
        id: uuidv4(),
        meta: {},
        children: [],
        name: secOrgName.value,
      };

      readNodes(treeData.value, curEditTreeId.value, uploadData);

      await uploadUserListTreeApi({
        id: 'root',
        meta: {},
        name: '慢病管理系统',
        children: treeData.value,
      });
    } else {
      // 编辑
      changeTreeName(treeData.value, curEditTreeId.value, secOrgName.value);

      await uploadUserListTreeApi({
        id: 'root',
        meta: {},
        name: '慢病管理系统',
        children: treeData.value,
      });
    }

    secVisible.value = false;
    await getUserTreeList();
  };

  function readNodes(nodes, id, addChild) {
    for (let item of nodes) {
      if (id == item.id) {
        item.children.push(addChild);
        return;
      }

      if (item.children && item.children.length) {
        readNodes(item.children, id, addChild);
      }
    }
  }

  const CheckboxGroup = Checkbox.Group;
  const FormItem = Form.Item;
  const fieldNames = {
    children: 'children',
    title: 'name',
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '成员姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '身份证号',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      ellipsis: true,
    },
    {
      title: '操作',
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
  const edit = (name, id, level) => {
    isAdd.value = false;
    curEditTreeId.value = id;

    // 编辑一级机构
    if (level == 0) {
      visible.value = true;
      firOrgName.value = name;
    }

    // 编辑二级机构
    if (level == 1) {
      let curFa = {};
      for (let prop of treeData.value) {
        if (prop.children && prop.children.length) {
          for (let item of prop.children) {
            if (item.id == id) {
              curFa = prop;
            }
          }
        }
      }

      firOrgNameStatic.value = curFa.name;
      secVisible.value = true;
      secOrgName.value = name;
    }
  };

  function changeTreeName(nodes, id, name) {
    for (let item of nodes) {
      if (id == item.id) {
        item.name = name;
        return;
      }

      if (item.children && item.children.length) {
        changeTreeName(item.children, id, name);
      }
    }
  }

  let curSelectTreeListId = ref('');
  const selectTree = async (val, e) => {
    curSelectTreeListId.value = e.selectedNodes[0].id;

    await getUserList(curSelectTreeListId.value);
  };

  const handleOk = async () => {
    console.log(123, formState);

    let subData = {
      meta: {},
      profile: {
        ...formState.value,
      },
      account: {
        username: formState.value.name,
        password: md5(123456),
      },
    };
    await createUserApi(subData, curSelectTreeListId.value);

    visible.value = false;
  };

  const del = async (id) => {
    removeNodeInTree(treeData.value, id);

    await uploadUserListTreeApi({
      id: 'root',
      meta: {},
      name: '慢病管理系统',
      children: treeData.value,
    });

    await getUserTreeList();
  };

  const removeNodeInTree = (treeList, id) => {
    // 通过id从数组（树结构）中移除元素
    if (!treeList || !treeList.length) {
      return;
    }
    for (let i = 0; i < treeList.length; i++) {
      if (treeList[i].id === id) {
        treeList.splice(i, 1);
        break;
      }
      removeNodeInTree(treeList[i].children, id);
    }
  };

  // 成员
  const formState = ref({
    role: undefined,
  });
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
    width: 350px;
    margin-right: 20px;
    background-color: #fff;
    flex: 1;
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
    width: calc(100% - 350px);
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
