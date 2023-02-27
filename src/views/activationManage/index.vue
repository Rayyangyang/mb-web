<template>
  <div class="activation-wrapper my-container">
    <div class="table-handle-wrapper">
      <div class="search-wrapper">
        <div class="mr-2">
          <Input v-model:value="userName" placeholder="请输入患者姓名" size="middle" />
        </div>
        <div class="mr-2">
          <Input v-model:value="userName" placeholder="请输入服务包名称" size="middle" />
        </div>
        <div class="mr-2">
          <DatePicker v-model:value="value1" size="middle" placeholder="请选择申请时间" />
        </div>

        <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle"
          >查询</Button
        >
      </div>
    </div>
    <Table :columns="columns" :data-source="tableData" :customRow="handleRowClick">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'activated'">
          <div>
            <span
              style="color: #ccc; cursor: pointer"
              class="mr-1"
              v-if="record.end_at < new Date().getTime()"
            >
              已过期
            </span>
            <p v-else>
              <span style="color: #00e85d; cursor: pointer" class="mr-1" v-show="record.activated">
                已激活
              </span>
              <span style="color: #29a5ff; cursor: pointer" class="mr-1" v-show="!record.activated">
                待激活
              </span>
            </p>
          </div>
        </template>
        <template v-if="column.key === 'action'">
          <div>
            <span
              style="color: #29a5ff; cursor: pointer"
              class="mr-1"
              @click="handleActivation(record)"
              v-if="!record.activated && record.end_at > new Date().getTime()"
            >
              激活
            </span>
            <span
              style="color: red; cursor: pointer"
              class="mr-1"
              @click="handleCancle(record)"
              v-if="record.activated && record.end_at > new Date().getTime()"
            >
              撤销
            </span>
            <span style="color: #29a5ff; cursor: pointer" class="mr-1" @click="showInfo(record)">
              详情
            </span>
          </div>
        </template>
      </template>
    </Table>

    <!-- 激活详情 -->
    <Modal v-model:visible="visible" title="激活详情" width="800px" :footer="null">
      <div class="user-archives-info">
        <div class="my-title">
          <i></i>
          <span>激活信息</span>
        </div>
        <div>
          <Descriptions>
            <DescriptionsItem label="服务包名称">{{ curInfo.name }}</DescriptionsItem>
            <DescriptionsItem label="激活时间">{{
              dayjs(curInfo.create_at).format('YYYY-MM-DD')
            }}</DescriptionsItem>
            <DescriptionsItem label="主管人员">{{
              curInfo.members.filter((ele) => ele.occupation === 'h')[0].profile.name
            }}</DescriptionsItem>
            <DescriptionsItem label="服务包价格">{{ curInfo.price }}</DescriptionsItem>
            <DescriptionsItem label="签约年限">{{ curInfo.serve_length }}</DescriptionsItem>
            <DescriptionsItem label="值班人员">{{
              curInfo.members
                .filter((ele) => ele.occupation === 'd')
                .map((ele) => ele.profile.name)
                .join(',')
            }}</DescriptionsItem>
          </Descriptions>
        </div>
        <div class="my-title">
          <i></i>
          <span>基础信息</span>
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
            <DescriptionsItem label="家族病史">{{ curInfo['家族病史'] }}</DescriptionsItem>
            <DescriptionsItem label="就诊史">{{ curInfo['就诊史'] }}</DescriptionsItem>
          </Descriptions>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, onMounted } from 'vue';
  import { Button, Modal, Input, Table, Descriptions, Select, DatePicker } from 'ant-design-vue';
  import getAge from '/@/utils/getAgeWidthIdCard';

  import {
    getActivationListApi,
    handleActivationStatusApi,
  } from '/@/api/activationMag/activationMag';
  import dayjs from 'dayjs';
  const SelectOption = Select.Option;
  const DescriptionsItem = Descriptions.Item;
  const columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: '患者姓名',
      dataIndex: '真实姓名',
      key: '真实姓名',
    },
    {
      title: '手机号',
      dataIndex: '联系电话',
      key: '联系电话',
    },
    {
      title: '患者性别',
      dataIndex: '性别',
      key: '性别',
    },
    {
      title: '患者年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '申请时间',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '服务包名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '服务包价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '签约年限',
      dataIndex: 'serve_length',
      key: 'serve_length',
    },
    {
      title: '状态',
      dataIndex: 'activated',
      key: 'activated',
    },
    {
      title: '操作',
      dataIndex: 'Action',
      width: 140,
      key: 'action',
    },
  ];

  const tableData = ref([]);

  onMounted(async () => {
    await getActivationList();
  });

  const getActivationList = async () => {
    let res = await getActivationListApi();
    console.log(res);

    tableData.value = res.data.map((ele, i) => {
      return {
        order: i + 1,
        ...ele.meta.health_doc,
        age: getAge(ele.meta.health_doc['身份证号']),
        ...ele.meta.pack,
        ...ele,
      };
    });
  };

  const handleActivation = async (val) => {
    await handleActivationStatusApi(val.id, {
      activated: true,
    });
    await getActivationList();
  };

  const handleCancle = async (val) => {
    await handleActivationStatusApi(val.id, {
      activated: false,
    });
    await getActivationList();
  };

  let visible = ref(false);

  let curInfo = ref({});
  const showInfo = (row) => {
    curInfo.value = row;
    visible.value = true;
  };
</script>
<style scoped lang="less">
  p {
    margin-bottom: 0;
  }
  .activation-wrapper {
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
