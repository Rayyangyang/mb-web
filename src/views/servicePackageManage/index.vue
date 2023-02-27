<template>
  <div class="service-package-wrapper my-container">
    <div class="table-handle-wrapper">
      <div class="search-wrapper">
        <div class="mr-2">
          <Input v-model:value="servicePackName" placeholder="请输入服务包名称" size="middle" />
        </div>
        <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
          >查询</Button
        >
      </div>
      <div class="handle-btns">
        <Button
          @click="addNewPackage"
          style="border-radius: 4px; padding: 0px 16px"
          type="primary"
          size="middle"
          >新增</Button
        >
      </div>
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
              >详情</span
            >
            <span
              style="color: #29a5ff; cursor: pointer"
              class="mr-1"
              @click="showInfo(record, true)"
              >修改</span
            >
            <span style="color: red; cursor: pointer" class="mr-1">删除</span>
          </div>
        </template>
      </template>
    </Table>

    <!-- 患者档案 -->
    <Modal
      v-model:visible="addPackageVisiable"
      title="新增/修改/查看服务包信息"
      width="800px"
      @cancel="close"
    >
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
              style="width: 100%"
              ref="formRef"
            >
              <FormItem
                label="服务包名称"
                name="name"
                :rules="[{ required: true, message: '请输入服务包名称' }]"
              >
                <Input v-model:value="formState.name" :disabled="!isEdit" />
              </FormItem>
              <FormItem
                label="服务包价格"
                name="price"
                :rules="[{ required: true, message: '请输入服务包价格' }]"
              >
                <Input v-model:value="formState.price" :disabled="!isEdit" />
              </FormItem>
              <FormItem
                label="签约年限"
                name="serve_length"
                :rules="[{ required: true, message: '请输入签约年限' }]"
              >
                <Input v-model:value="formState.serve_length" :disabled="!isEdit" />
                <!-- <DatePicker v-model:value="value1" style="width: 100%" /> -->
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
          <span style="color: #29a5ff; cursor: pointer" @click="addUserVisiable = true">
            + 添加成员
          </span>
        </div>
        <Table :columns="teamColumns" :data-source="teamData">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'occupation'">
              <div>
                <Select ref="select" v-model:value="record.occupation" placeholder="请选择">
                  <SelectOption value="h">主管人员</SelectOption>
                  <SelectOption value="d">值班人员</SelectOption>
                </Select>
              </div>
            </template>
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
        <Button key="back" @click="addPackageVisiable = false" style="border-radius: 8px"
          >取消</Button
        >
        <Button key="submit" type="primary" @click="handleOk" style="border-radius: 8px"
          >保存</Button
        >
      </template>
    </Modal>

    <!-- 添加成员 -->
    <Modal v-model:visible="addUserVisiable" width="800px" class="my-modal">
      <div style="padding: 20px">
        <div class="table-handle-wrapper">
          <div class="search-wrapper">
            <div class="mr-2">
              <Input
                v-model:value="searchForm.userName"
                placeholder="请输入成员姓名"
                size="middle"
              />
            </div>
            <div class="mr-2">
              <Input
                v-model:value="searchForm.phone"
                placeholder="请输入成员联系电话"
                size="middle"
              />
            </div>

            <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
              >查询</Button
            >
          </div>
        </div>
        <Table
          :columns="userColumns"
          :data-source="allUserLlist"
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: rowSelection,
            onSelect: test,
          }"
        />
      </div>
      <template #footer>
        <Button key="back" @click="addUserVisiable = false" style="border-radius: 8px">取消</Button>
        <Button key="submit" type="primary" @click="addNewUser" style="border-radius: 8px"
          >添加</Button
        >
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, onMounted } from 'vue';
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
    message,
    Select,
  } from 'ant-design-vue';

  import {
    getServiceListApi,
    setServiceEnabledApi,
    createServicePackApi,
  } from '/@/api/servicePackage/servicePackage';
  import { getUserListApi } from '/@/api/userMag/user';

  const SelectOption = Select.Option;
  const servicePackName = ref('');
  onMounted(async () => {
    await getServiceList();
    let res = await getUserListApi('root');
    allUserLlist.value = res.data.map((ele, i) => {
      return {
        order: i + 1,
        ...ele.profile,
        ...ele,
        key: ele.user_id,
      };
    });
    console.log(123, res);
  });

  const allUserLlist = ref([]);

  const getServiceList = async () => {
    let res = await getServiceListApi();
    console.log(res);
    tableData.value = res.data.map((ele, i) => {
      return {
        order: i + 1,
        ...ele,
        doctor: ele.meta.leader.name,
      };
    });
    console.log(123, res);
  };

  const DescriptionsItem = Descriptions.Item;
  const FormItem = Form.Item;

  const tableData = ref([]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '服务包名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '服务包价格（元）',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '主管医生',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: '签约年限',
      dataIndex: 'serve_length',
      key: 'serve_length',
    },
    {
      title: '启用/禁用',
      dataIndex: 'enabled',
      key: 'enabled',
    },
    {
      title: '操作',
      width: 140,
      dataIndex: 'Action',
      key: 'action',
    },
  ];

  const teamColumns = [
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
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '队内职务',
      dataIndex: 'occupation',
      key: 'occupation',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  let teamData = ref([]);

  const userColumns = [
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
      title: '联系方式',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '所属机构',
      dataIndex: 'belong_to',
      key: 'belong_to',
    },
    {
      title: '角色',
      dataIndex: 'order',
      key: 'order',
    },
  ];

  let userData = ref([]);

  let visible = ref(false);

  let isOpen = ref(false);

  let formState = ref({
    name: '',
    price: '',
    serve_length: '',
  });

  let addPackageVisiable = ref(false);
  const addNewPackage = () => {
    isEdit.value = true;
    addPackageVisiable.value = true;
  };

  // 添加服务包成员
  let addUserVisiable = ref(false);

  let isEdit = ref(false);
  // 服务包详情
  let curServicePackInfo = ref({});
  const showInfo = (val, edit) => {
    isEdit.value = edit;
    curServicePackInfo.value = val;
    formState.value = val;
    teamData.value = val.members.map((ele, i) => {
      return {
        order: i + 1,
        ...ele,
        ...ele.profile,
      };
    });
    selectedRowKeys.value = val.members.map((ele) => ele.user_id);
    addPackageVisiable.value = true;
  };

  // 服务包启用
  const changeEnabled = async (val) => {
    console.log(12, val);
    await setServiceEnabledApi(val.id, {
      enabled: val.enabled,
    });

    message.success('修改成功');
    await getServiceList();
  };

  // 添加团队成员
  const addNewUser = () => {
    teamData.value = selectedRow.value;
    addUserVisiable.value = false;
  };

  const selectedRow = ref([]);

  const selectedRowKeys = ref([]);

  const rowSelection = (selectedRowKeys, selectedRows) => {
    console.log(123, selectedRowKeys);
    selectedRow.value = selectedRows;
    selectedRowKeys.value = [123, 22];
  };

  const test = (val, selected) => {
    console.log(3333, val);

    if (selected) {
      selectedRowKeys.value.push(val.key);
    } else {
      selectedRowKeys.value.splice(selectedRowKeys.value.indexOf(val.key, 1));
    }
  };

  const close = () => {
    formState.value = {
      name: '',
      price: '',
      serve_length: '',
    };
    teamData.value = [];
  };

  const fileList = ref([]);
  const searchForm = ref({
    userName: '',
    phone: '',
  });
  const formRef = ref();

  let imageUrl = ref('');

  let beforeUpload = () => {};
  let handleChange = () => {};

  // 保存服务包
  const handleOk = async () => {
    console.log(123, formRef.value);

    await formRef.value.validate();

    let subData = {
      price: formState.value.price,
      meta: {
        leader: {
          name: teamData.value.filter((ele) => ele.occupation == 'h')[0].name,
          id: teamData.value.filter((ele) => ele.occupation == 'h')[0].user_id,
        },
      },
      members: teamData.value.map((ele) => {
        return {
          occupation: ele.occupation,
          user_id: ele.user_id,
        };
      }),
      name: formState.value.name,
      serve_length: formState.value.serve_length,
      cover_img: '',
      enabled: true,
    };

    await createServicePackApi(subData);
    console.log(123, subData);
  };
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

<style lang="scss">
  .my-modal {
    .ant-modal-close-x {
      display: none;
    }
  }
</style>
