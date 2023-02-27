<template>
  <div class="doc-patient-wrapper my-container">
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
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === '真实姓名'">
          <div>
            <span @click="toInfo(record)">{{ record['真实姓名'] }}</span>
          </div>
        </template>
        <template v-if="column.key === 'bloodTag'">
          <div>
            <Select
              ref="select"
              v-model:value="record.bloodTag"
              style="width: 120px"
              @change="changeBloodTag"
            >
              <SelectOption value="轻度">轻度</SelectOption>
              <SelectOption value="重度">重度</SelectOption>
              <SelectOption value="正常">正常</SelectOption>
              <SelectOption value="未知">未知</SelectOption>
            </Select>
          </div>
        </template>
        <template v-if="column.key === 'heartTag'">
          <div>
            <Select
              ref="select"
              v-model:value="record.bloodTag"
              style="width: 120px"
              @change="changeHeartTag"
            >
              <SelectOption value="轻度">轻度</SelectOption>
              <SelectOption value="重度">重度</SelectOption>
              <SelectOption value="正常">正常</SelectOption>
              <SelectOption value="未知">未知</SelectOption>
            </Select>
          </div>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { Button, Modal, Input, Table, Select } from 'ant-design-vue';
  import { getPatientListApi } from '/@/api/docPatient/docPatient';
  import getAge from '/@/utils/getAgeWidthIdCard';
  import { usePatientInfoStore } from '/@/store/modules/patientInfo';

  const patientInfo = usePatientInfoStore();
  const SelectOption = Select.Option;
  const router = useRouter();
  const data = ref([]);
  onMounted(async () => {
    let res = await getPatientList();
  });

  const getPatientList = async () => {
    let res = await getPatientListApi();

    data.value = res.data.map((ele, i) => {
      return {
        order: i + 1,
        ...ele.health_doc,
        age: getAge(ele.health_doc['身份证号']),
      };
    });
  };

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
    },
    {
      title: '居住地址',
      dataIndex: '现居地址',
      key: '现居地址',
      ellipsis: true,
    },
    {
      title: '建档时间',
      dataIndex: '',
      key: '',
      ellipsis: true,
    },
    {
      title: '血压标签',
      dataIndex: 'bloodTag',
      key: 'bloodTag',
      ellipsis: true,
    },
    {
      title: '心率标签',
      dataIndex: 'heartTag',
      key: 'heartTag',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const toInfo = (val) => {
    patientInfo.setPatientInfo(val)

    router.push('/patientMag/index/patientInfo');
  };
  const handleRowClick = (record, index) => {
    return {
      onClick: (e) => {},
    };
  };

  const changeBloodTag = () => {};
  const changeHeartTag = () => {};
</script>

<style scoped lang="less">
  .doc-patient-wrapper {
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
</style>
