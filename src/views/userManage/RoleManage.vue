<template>
  <div class="role-wrapper my-container">
    <div class="left-wrapper">
      <div class="title">
        <span>角色</span>
        <p @click="addNew"> + 新增角色 </p>
      </div>
      <div class="role-list-wrapper">
        <div v-for="(ele, i) in roleList" :key="i" class="role-list-item">
          <p>{{ ele.title }}</p>
          <div class="control-wrapper">
            <div style="display: flex; align-items: center">
              <div>
                <img src="../../assets/icons/edit.png" alt="" @click="edit" />
              </div>
              <div>
                <img src="../../assets/icons/del.png" alt="" @click="del" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-wrapper">
      <div class="title mb-4">
        <span class="mr-2">管理角色权限</span>
        <Checkbox
          v-model:checked="state.checkAll"
          :indeterminate="state.indeterminate"
          @change="onCheckAllChange"
        />
      </div>

      <div class="all-roles-wrapper">
        <CheckboxGroup
          v-model:value="state.checkedList"
          ref="columnListRef"
          :options="plainOptions"
        />
      </div>
      <div class="footer-btns">
        <Button style="border-radius: 8px; background-color: #29a5ff; color: #fff; border: none"
          >保存</Button
        >
      </div>
    </div>

    <Modal v-model:visible="visible" title="新增/修改角色">
      <div class="edit-role-wrapper">
        <span class="mr-4">
          <i style="color: red">*</i>
          角色名称</span
        >
        <div style="width: 70%">
          <Input v-model:value="roleName" placeholder="请输入角色名称" />
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
  import { Checkbox, Button, Modal, Input, message } from 'ant-design-vue';

  const CheckboxGroup = Checkbox.Group;

  const roleList = ref([
    {
      title: '角色名称1',
    },
    {
      title: '角色名称1',
    },
    {
      title: '角色名称1',
    },
  ]);
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const state = reactive({
    indeterminate: true,
    checkAll: false,
    checkedList: ['Apple', 'Orange'],
  });

  const onCheckAllChange = (e: any) => {
    Object.assign(state, {
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
    });
  };
  watch(
    () => state.checkedList,
    (val) => {
      state.indeterminate = !!val.length && val.length < plainOptions.length;
      state.checkAll = val.length === plainOptions.length;
    },
  );

  let visible = ref(false);
  let isAdd = ref(false);
  let roleName = ref('');
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

  const handleOk = () => {
    if (roleName.value.length == 0) {
      message.error('角色名称必填');
      return;
    }
    visible.value = false;
  };

  const del = () => {};
</script>

<style scoped lang="scss">
  p {
    margin: 0;
  }
  .role-wrapper {
    display: flex;
  }
  .left-wrapper {
    width: 30%;
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
    .role-list-wrapper > div {
      padding: 8px 15px;
      display: flex;
      justify-content: space-between;
      p {
        cursor: pointer;
      }
      .control-wrapper {
        img {
          cursor: pointer;
          margin: 0 4px;
        }
      }
    }
    .control-wrapper {
      display: none;
    }
    .role-list-item {
      align-items: center;
    }
    .role-list-item:hover {
      background-color: #d8efff;
      .control-wrapper {
        display: block !important;
      }
    }
  }
  .right-wrapper {
    width: 70%;
    height: 100%;
    background-color: #fff;
    padding: 15px;
  }

  .footer-btns {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }

  .edit-role-wrapper {
    display: flex;
    align-items: center;
    padding: 20px;
  }
</style>
