<template>
  <div class="tags-package-wrapper my-container">
    <div class="table-handle-wrapper">
      <div class="search-wrapper">
        <div class="mr-2">
          <Input v-model:value="searchParams.tagName" placeholder="请输入标签名称" size="middle" />
        </div>
        <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
          >查询</Button
        >
      </div>
      <div class="handle-btns">
        <Button
          @click="addNewTags"
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
            <Switch v-model:checked="record.enabled" @change="(e) => changeEnable(e, record)" />
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div>
            <span style="color: #29a5ff" class="mr-1" @click="editTags(record)">修改</span>
            <span style="color: red" class="mr-1" @click="del(record)">删除</span>
          </div>
        </template>
      </template>
    </Table>

    <!-- 新增/修改标签 -->
    <Modal v-model:visible="editTagsVisible" title="新增/修改标签" @cancel="formState.tagName = ''">
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
              name="tagName"
              :rules="[{ required: true, message: '请输入标签名' }]"
            >
              <Input v-model:value="formState.tagName" placeholder="请输入标签名称" />
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
  import { ref, onMounted } from 'vue';
  import { getSysListApi, uploadSysTreeApi } from '/@/api/sys/sys';
  import dayjs from 'dayjs';
  import { Button, Modal, Input, Table, Descriptions, Switch, Form } from 'ant-design-vue';
  import { v4 as uuidv4 } from 'uuid';
  import { cloneDeep } from 'lodash';

  const FormItem = Form.Item;

  const searchParams = ref({
    tagName: '',
  });

  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '标签名称',
      dataIndex: 'tagName',
      key: 'tagName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      ellipsis: true,
    },
    {
      title: '启用/禁用',
      dataIndex: 'enabled',
      key: 'enabled',
      ellipsis: true,
    },
    {
      title: '操作',
      width: 140,
      dataIndex: 'Action',
      key: 'action',
    },
  ];

  onMounted(async () => {
    await getSysList();
  });

  const tableData = ref([]);
  const getSysList = async () => {
    let res = await getSysListApi();
    tableData.value = res.data.tags.map((ele, i) => {
      console.log(123456, ele);
      return {
        ...ele,
        order: i + 1,
      };
    });
    console.log(123, res);
  };

  const formState = ref({
    tagName: '',
  });
  let editTagsVisible = ref(false);

  const addNewTags = () => {
    isEdit.value = false;
    editTagsVisible.value = true;
  };

  let isEdit = ref(false);
  let curEditId = ref();
  const editTags = (row) => {
    isEdit.value = true;
    curEditId.value = row.id;
    formState.value.tagName = row.tagName;
    editTagsVisible.value = true;
  };

  let isOpen = ref(false);

  const handleOk = async () => {
    let subData = {};

    if (isEdit.value) {
      // 编辑
      tableData.value.map((ele) => {
        if (ele.id == curEditId.value) {
          console.log(9999);
          ele.tagName = formState.value.tagName;
        }
      });

      subData = {
        tags: tableData.value,
      };
    } else {
      // 新增
      subData = {
        tags: [
          {
            tagName: formState.value.tagName,
            createTime: dayjs().format('YYYY-MM-DD'),
            enabled: false,
            id: uuidv4(),
          },
          ...tableData.value,
        ],
      };
    }

    await uploadSysTreeApi(subData);
    await getSysList();
    editTagsVisible.value = false;
  };

  const changeEnable = async (enabled, row) => {
    tableData.value.map((ele) => {
      if (ele.id == row.id) {
        ele.enabled = enabled;
      }
    });

    console.log(123, tableData);

    await uploadSysTreeApi({
      tags: tableData.value,
    });
    await getSysList();
  };

  const del = async (row) => {
    let copyData = cloneDeep(tableData.value);
    tableData.value.map((ele, i) => {
      if (ele.id == row.id) {
        copyData.splice(i, 1);
      }
    });

    await uploadSysTreeApi({
      tags: copyData,
    });
    await getSysList();

  };
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
