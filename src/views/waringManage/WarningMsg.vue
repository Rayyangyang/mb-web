<template>
  <div class="warning-wrapper my-container">
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
            <SelectOption value="B">心率</SelectOption>
            <SelectOption value="A">血压</SelectOption>
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
            <SelectOption value="轻度">轻度</SelectOption>
            <SelectOption value="重度">重度</SelectOption>
            <SelectOption value="正常">正常</SelectOption>
            <SelectOption value="未知">未知</SelectOption>
          </Select>
        </div>

        <Button
          style="border-radius: 4px; padding: 0px 16px"
          type="primary"
          size="middle"
          @click="search"
          >查询</Button
        >
      </div>
    </div>
    <Table
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="changePage"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <div>
            <span style="color: #29a5ff; cursor: pointer" class="mr-1" @click="showInfo(record)"
              >详情</span
            >
          </div>
        </template>
      </template>
    </Table>

    <!-- 患者档案 -->
    <Modal v-model:visible="visible" title="患者档案" width="800px" :footer="null">
      <div class="user-archives-info">
        <div class="my-title">
          <i></i>
          <span>预警信息</span>
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem label="预警时间">{{
              dayjs(curInfo.create_at).format('YYYY-MM-DD')
            }}</DescriptionsItem>
            <DescriptionsItem label="预警项目">{{ warinType[curInfo.type] }}</DescriptionsItem>
            <DescriptionsItem label="预警值">{{
              curInfo.type == 'A' ? curInfo['血压'] : curInfo['心率']
            }}</DescriptionsItem>
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
            <DescriptionsItem label="真实姓名">{{ curInfo['真实姓名'] }}</DescriptionsItem>
            <DescriptionsItem label="性别">{{ curInfo['性别'] }}</DescriptionsItem>
            <DescriptionsItem label="现居地址">{{ curInfo['现居地址'] }}</DescriptionsItem>
            <DescriptionsItem label="身份证号">{{ curInfo['身份证号'] }}</DescriptionsItem>
            <DescriptionsItem label="身高">{{ curInfo['身高'] }}</DescriptionsItem>
            <DescriptionsItem label="过敏史">{{ curInfo['过敏史'] }}</DescriptionsItem>
            <DescriptionsItem label="联系电话">{{ curInfo['联系电话'] }}</DescriptionsItem>
            <DescriptionsItem label="体重">{{ curInfo['体重'] }}</DescriptionsItem>
            <DescriptionsItem label="既往史">{{ curInfo['既往史'] }}</DescriptionsItem>
            <DescriptionsItem label="联系人">{{ curInfo['联系人'] }}</DescriptionsItem>
            <DescriptionsItem label="血压标签">{{ curInfo['血压标签'] }}</DescriptionsItem>
            <DescriptionsItem label="家族病史">{{ curInfo['家族病史'] }}</DescriptionsItem>
            <DescriptionsItem label="就诊史">{{ curInfo['就诊史'] }}</DescriptionsItem>
            <DescriptionsItem label="心率标签">{{ curInfo['心率标签'] }}</DescriptionsItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, onMounted } from 'vue';
  import { Button, Modal, Input, Table, Descriptions, Select } from 'ant-design-vue';
  import { getWraningListApi } from '/@/api/warning/warning';
  import getAge from '/@/utils/getAgeWidthIdCard';
  import dayjs from 'dayjs';

  const searchForm = ref({
    item: undefined,
    level: undefined,
    userName: '',
  });
  const SelectOption = Select.Option;
  const DescriptionsItem = Descriptions.Item;
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

  const warinType = {
    A: '血压',
    B: '心率',
  };

  let searchString = {
    field: '',
    op: 'like',
    value: '',
    dt: 'varchar',
  };

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

  const tableData = ref([]);

  let searchParams = ref({
    pno: 0,
    psize: 10,
  });

  let searchStr = ref('');

  let pagination = ref({
    total: 0,
    current: 1,
    pageSize: 10,
  });

  const changePage = async (val) => {
    console.log(val);
    pagination.value = val;
    searchParams.value.pno = val.current - 1;
    searchParams.value.psize = val.pageSize;
    await getWraningList();
  };

  const getWraningList = async () => {
    let res = await getWraningListApi(searchParams.value, searchStr.value);
    console.log(123, res);
    pagination.value.total = res.headers.count;
    tableData.value = res.data.map((ele, i) => {
      return {
        ...ele,
        ...ele.meta,
        age: getAge(ele.meta['身份证号']),
        warnItem: warinType[ele.meta.type],
        order: i + 1,
        warnNum: ele.meta.type == 'A' ? ele.meta['血压'] : ele.meta['心率'],
        time: dayjs(ele.create_at).format('YYYY-MM-DD'),
      };
    });
    console.log(123, tableData.value);
  };

  onMounted(async () => {
    await getWraningList();
  });

  let visible = ref(false);

  let curInfo = ref({});
  const showInfo = (row) => {
    console.log(123, row);
    curInfo.value = row;
    visible.value = true;
  };
</script>
<style scoped lang="less">
  .warning-wrapper {
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
</style>
