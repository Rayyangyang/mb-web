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
    <Table :columns="columns" :data-source="data" :customRow="handleRowClick">
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
        <div class="my-title">
          <i></i>
          <span>服务信息</span>
        </div>
        <Table :columns="columns" :data-source="data" :customRow="handleRowClick">
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
    </Modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive } from 'vue';
  import { Button, Modal, Input, Table, Descriptions } from 'ant-design-vue';

  const DescriptionsItem = Descriptions.Item;
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

  const handleRowClick = (record, index) => {
    return {
      onClick: () => {
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
