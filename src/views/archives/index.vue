<template>
  <div class="archives-wrapper my-container">
    <div class="table-handle-wrapper">
      <div class="search-wrapper">
        <div class="mr-2">
          <Input v-model:value="userName" placeholder="请输入患者姓名" size="middle" />
        </div>
        <div class="mr-2">
          <Input v-model:value="userName" placeholder="请输入患者联系电话" size="middle" />
        </div>

        <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
          >查询</Button
        >
      </div>
    </div>
    <Table :columns="columns" :data-source="tableData" :customRow="handleRowClick">
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

    <!-- 患者档案 -->
    <Modal v-model:visible="visible" title="患者档案" width="800px" :footer="null">
      <div class="user-archives-info">
        <div class="my-title">
          <i></i>
          <span>预警信息</span>
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem label="真实姓名">{{ curPatientInfo['真实姓名'] }}</DescriptionsItem>
            <DescriptionsItem label="性别">{{ curPatientInfo['性别'] }}</DescriptionsItem>
            <DescriptionsItem label="现居地址">{{ curPatientInfo['现居地址'] }}</DescriptionsItem>
            <DescriptionsItem label="身份证号">{{ curPatientInfo['身份证号'] }}</DescriptionsItem>
            <DescriptionsItem label="身高">{{ curPatientInfo['身高'] }}</DescriptionsItem>
            <DescriptionsItem label="过敏史">{{ curPatientInfo['过敏史'] }}</DescriptionsItem>
            <DescriptionsItem label="联系电话">{{ curPatientInfo['联系电话'] }}</DescriptionsItem>
            <DescriptionsItem label="体重">{{ curPatientInfo['体重'] }}</DescriptionsItem>
            <DescriptionsItem label="既往史">{{ curPatientInfo['既往史'] }}</DescriptionsItem>
            <DescriptionsItem label="家族病史">{{ curPatientInfo['家族病史'] }}</DescriptionsItem>
            <DescriptionsItem label="就诊史">{{ curPatientInfo['就诊史'] }}</DescriptionsItem>
            <DescriptionsItem label="血压标签">{{ curPatientInfo['血压标签'] }}</DescriptionsItem>
            <DescriptionsItem label="心率标签">{{ curPatientInfo['心率标签'] }}</DescriptionsItem>
          </Descriptions>
        </div>
        <div class="my-title">
          <i></i>
          <span>服务信息</span>
        </div>
        <Table
          :columns="serviceColumns"
          :data-source="serviceTableData"
          :customRow="handleRowClick"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'enabled'">
              <div>
                <span style="color: #29a5ff" class="mr-1" v-show="record.enabled"> 已激活</span>
                <span style="color: #ccc" class="mr-1" v-show="!record.enabled"> 已过期 </span>
              </div>
            </template>
          </template>
        </Table>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, onMounted } from 'vue';
  import { Button, Modal, Input, Table, Descriptions } from 'ant-design-vue';
  import { getArchivesListApi, getServiceListApi } from '/@/api/archives/archives';
  import getAge from '/@/utils/getAgeWidthIdCard';
  import dayjs from 'dayjs';
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
      title: '居住地址',
      dataIndex: '现居地址',
      key: '现居地址',
      ellipsis: true,
    },
    {
      title: '血压标签',
      dataIndex: '血压标签',
      key: '血压标签',
      ellipsis: true,
    },
    {
      title: '心率标签',
      dataIndex: '心率标签',
      key: '心率标签',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: '激活状态',
      key: '激活状态',
    },
  ];

  const serviceColumns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '签约时间',
      dataIndex: 'signTime',
      key: 'signTime',
    },
    {
      title: '服务包名称',
      dataIndex: 'packName',
      key: 'packName',
    },
    {
      title: '主管医生',
      dataIndex: 'doctor',
      key: 'doctor',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
    },
  ];

  onMounted(async () => {
    await getArchivesList();
  });

  const tableData = ref([]);
  const serviceTableData = ref([]);

  const getArchivesList = async () => {
    let res = await getArchivesListApi();
    tableData.value = res.data.map((ele, i) => {
      return {
        order: i + 1,
        ...ele.health_doc,
        userId: ele.user_id,
        age: getAge(ele.health_doc['身份证号']),
      };
    });
  };

  const getServiceList = async (id) => {
    let res = await getServiceListApi(id);

    serviceTableData.value = res.data.map((ele, i) => {
      return {
        order: i + 1,
        signTime: dayjs(ele.create_at).format('YYYY-MM-DD'),
        packName: ele.meta.pack.name,
        doctor: ele.meta.pack.meta.leader.name,
        enabled: ele.meta.pack.enabled,
      };
    });
    console.log(123, res);
  };

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
  const curPatientInfo = ref({});

  const handleRowClick = (record, index) => {
    return {
      onClick: async () => {
        curPatientInfo.value = record;
        await getServiceList(record.userId);
        visible.value = true;
      },
    };
  };
</script>

<style scoped lang="less">
  .archives-wrapper {
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
