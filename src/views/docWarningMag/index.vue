<template>
  <div class="doc-waring-wrapper my-container">
    <RadioGroup v-model:value="mode" :style="{ marginBottom: '8px' }" @change="changeMode">
      <RadioButton value="1">主管患者</RadioButton>
      <RadioButton value="2">值班患者</RadioButton>
    </RadioGroup>

    <div class="">
      <div class="table-handle-wrapper">
        <div class="search-wrapper">
          <div class="mr-2">
            <Input v-model:value="searchForm.userName" placeholder="请输入患者姓名" size="middle" />
          </div>
          <div class="mr-2">
            <Select
              ref="select"
              v-model:value="searchForm.item"
              style="width: 180px"
              placeholder="请选择预警项目"
              size="middle"
            >
              <SelectOption value="jack">Jack</SelectOption>
              <SelectOption value="lucy">Lucy</SelectOption>
              <SelectOption value="Yiminghe">yiminghe</SelectOption>
            </Select>
          </div>
          <div class="mr-2">
            <Select
              ref="select"
              v-model:value="searchForm.level"
              style="width: 180px"
              placeholder="请选择预警等级"
              size="middle"
            >
              <SelectOption value="jack">Jack</SelectOption>
              <SelectOption value="lucy">Lucy</SelectOption>
              <SelectOption value="Yiminghe">yiminghe</SelectOption>
            </Select>
          </div>

          <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
          @click='search'
            >查询</Button
          >
        </div>
      </div>
      <Table
        :columns="columns"
        :data-source="tableData"
        :customRow="handleRowClick"
        :pagination="pagination"
        @change="changePage"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'action'">
            <div>
              <span style="color: #29a5ff; cursor: pointer" class="mr-1" @click="showInfo(column)"
                >详情</span
              >
            </div>
          </template>
        </template>
      </Table>
    </div>

    <!-- 主管患者 预警管理详情 -->
    <!-- 患者档案 -->
    <Modal v-model:visible="visible" title="患者档案" width="800px" :footer="null">
      <div class="user-archives-info">
        <div class="my-title">
          <i></i>
          <span>预警信息</span>
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem label="预警时间">Zhou Maomao</DescriptionsItem>
            <DescriptionsItem label="预警项目">1810000000</DescriptionsItem>
            <DescriptionsItem label="预警值">Hangzhou, Zhejiang</DescriptionsItem>
            <DescriptionsItem label="预警等级">empty</DescriptionsItem>
            <DescriptionsItem label="主管医生">12</DescriptionsItem>
          </Descriptions>
        </div>
        <div class="my-title">
          <i></i>
          <span>服务信息</span>
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem label="真实姓名">Zhou Maomao</DescriptionsItem>
            <DescriptionsItem label="性别">1810000000</DescriptionsItem>
            <DescriptionsItem label="现居地址">Hangzhou, Zhejiang</DescriptionsItem>
            <DescriptionsItem label="身份证号">empty</DescriptionsItem>
            <DescriptionsItem label="身高">12</DescriptionsItem>
            <DescriptionsItem label="过敏史">12</DescriptionsItem>
            <DescriptionsItem label="联系电话">12</DescriptionsItem>
            <DescriptionsItem label="体重">12</DescriptionsItem>
            <DescriptionsItem label="既往史">12</DescriptionsItem>
            <DescriptionsItem label="家族病史">12</DescriptionsItem>
            <DescriptionsItem label="就诊史">12</DescriptionsItem>
            <DescriptionsItem label="血压标签">12</DescriptionsItem>
            <DescriptionsItem label="心率标签">12</DescriptionsItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, onMounted } from 'vue';
  import { Button, Modal, Input, Table, Descriptions, Select, Radio } from 'ant-design-vue';
  import { getDocWraningListApi } from '/@/api/docWarning/docWarning';

  onMounted(async () => {
    await getDocWraningList();
  });
  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '成员姓名',
      dataIndex: '真实姓名',
      key: '真实姓名',
    },
    {
      title: '联系方式',
      dataIndex: '联系电话',
      key: '联系电话',
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: '性别',
      key: '性别',
      ellipsis: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      ellipsis: true,
    },
    {
      title: '居住地',
      dataIndex: '现居地址',
      key: '现居地址',
      ellipsis: true,
    },
    // {
    //   title: '主治医生',
    //   dataIndex: '主治医生',
    //   key: '主治医生',
    //   ellipsis: true,
    // },
    // {
    //   title: '值班医生',
    //   dataIndex: '值班医生',
    //   key: '值班医生',
    //   ellipsis: true,
    // },
    {
      title: '预警项目',
      dataIndex: 'warnItem',
      key: 'warnItem',
      ellipsis: true,
    },
    {
      title: '预警值',
      dataIndex: 'warnNum',
      key: 'warnNum',
      ellipsis: true,
    },
    {
      title: '预警级别',
      dataIndex: '严重程度',
      key: '严重程度',
      ellipsis: true,
    },
    {
      title: '监测时间',
      dataIndex: 'time',
      key: 'time',
      ellipsis: true,
    },
    {
      title: '客服状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'Action',
      width: 100,
      key: 'action',
    },
  ];

  const searchForm = ref({
    item: undefined,
    level: undefined,
    userName: '',
  });
  let searchStr = ref('');

  const search = async () => {
    searchStr.value = '';
    searchParams.value.pno = 0;

    if (searchForm.value.userName != '') {
      searchStr.value += `&field=真实姓名&op=like&dt=varchar&value=%25${searchForm.value.userName}%25`;
    }
    if (searchForm.value.item != undefined) {
      searchStr.value += `&field=type&op=like&dt=varchar&value=%25${searchForm.value.item}%25`;
    }
    if (searchForm.value.level != undefined) {
      searchStr.value += `&field=严重程度&op=like&dt=varchar&value=%25${searchForm.value.level}%25`;
    }

    await getWraningList();
  };

  let searchParams = ref({
    pno: 0,
    psize: 10,
  });

  let pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10,
  });

  const changeMode = (val) => {};

  const changePage = async (val) => {
    console.log(val);
    pagination.value = val;
    searchParams.value.pno = val.current - 1;
    searchParams.value.psize = val.pageSize;
    await getDocWraningList();
  };

  const tableData = ref([]);
  const getDocWraningList = async () => {
    let res = await getDocWraningListApi(searchParams.value, searchStr);
    pagination.value.total = res.headers.count;
    tableData.value = res.data.map((ele) => {
      return {
        ...ele.health_doc,
        ...ele.meta,
        ...ele,
      };
    });
    console.log(123, res);
  };

  const DescriptionsItem = Descriptions.Item;

  const SelectOption = Select.Option;
  const RadioGroup = Radio.Group;
  const RadioButton = Radio.Button;

  let visible = ref(false);

  const showInfo = (row) => {
    visible.value = true;
  };
  let mode = ref('1');
</script>

<style scoped lang="scss">
  .doc-waring-wrapper {
    background-color: #fff;
    padding: 20px;
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

<style lang="less">
  .doc-waring-wrapper {
    .ant-radio-button-wrapper-checked {
      color: #fff !important;
      background-color: #29a5ff !important;
    }
  }
</style>
