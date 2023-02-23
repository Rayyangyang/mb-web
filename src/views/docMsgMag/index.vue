<template>
  <div class="msg-wrapper my-container">
    <div class="msg-list-wrapper">
      <div class="msg-search">
        <div class="mr-2">
          <Input v-model:value="userName" placeholder="请输入患者姓名" size="middle" />
        </div>

        <Button style="border-radius: 4px; padding: 0px 16px" type="primary" size="middle">
          查询
        </Button>
      </div>
      <div class="msg-list">
        <div v-for="(ele, i) in msgList" :key="i">
          <div class="img-box"></div>
          <div class="msg-info">
            <p class="msg-user-info">
              <span>{{ ele.userName }}</span>
              <span>{{ ele.time }}</span>
            </p>
            <p>{{ ele.msg }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="msg-send-wrapper">
      <div class="msg-list-box"> </div>
      <div class="send-msg-box">
        <TextArea
          v-model:value="value2"
          placeholder="请在此输入您的内容"
          :auto-size="{ minRows: 5, maxRows: 5 }"
        />
        <div style="text-align: right; margin-top: 14px; margin-right: 20px">
          <Button
            style="border-radius: 4px; padding: 0px 16px"
            type="primary"
            size="middle"
            @click="send"
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Button, Modal, Input, Table, Descriptions } from 'ant-design-vue';

  const TextArea = Input.TextArea;

  let msgList = ref([
    {
      userName: 'sunny',
      msg: '123',
      time: '2022-12-01 09:00',
    },
    {
      userName: 'sunny',
      msg: '123',
      time: '2022-12-01 09:00',
    },
    {
      userName: 'sunny',
      msg: '123',
      time: '2022-12-01 09:00',
    },
  ]);

  let userName = ref('');
</script>

<style lang="scss" scoped>
  p {
    margin-bottom: 0;
  }
  .msg-wrapper {
    display: flex;
    .msg-list-wrapper {
      width: 300px;
      margin-right: 20px;
      background-color: #fff;
      padding: 20px;

      .msg-search {
        display: flex;
      }
      .msg-list {
        .img-box {
          width: 40px;
          height: 40px;
          border: 1px solid red;
          margin-right: 16px;
        }
        > div {
          display: flex;
          margin-top: 12px;
          align-items: center;
          width: 100%;
          .msg-info {
            width: 100%;
          }
          .msg-user-info {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
        }
      }
    }
    .msg-send-wrapper {
      width: calc(100% - 300px);

      .msg-list-box {
        height: calc(100% - 220px);
        margin-bottom: 20px;
        background-color: #fff;
      }
      .send-msg-box {
        height: 200px;
        background-color: #fff;
        padding: 20px;
        .ant-input {
          border: none;
          outline: none;
        }
        .ant-input:focus {
          outline: none;
          box-shadow: none;
        }
      }
    }
  }
</style>
