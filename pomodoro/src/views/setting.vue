<template>
  <div class="setting">
    <label for="workDuration">
      <span>work duration:</span>
      <input type="number" name="workDuration" id="work-duration" v-model="workDuration">
    </label>
    <label for="restDuration">
      <span>rest duration:</span>
      <input type="number" name="restDuration" id="rest-duration" v-model="restDuration">
    </label>
    <div>
      <button @click="cancle">cancle</button>
      <button @click="settingConfig">ok</button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "setting",
  data() {
    return {
      workDuration: 25,
      restDuration: 5
    };
  },
  props: {
    initApp: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {},
  methods: {
    settingConfig() {
      localStorage.setItem("workDuration", this.workDuration);
      localStorage.setItem("restDuration", this.restDuration);
      ipcRenderer.send("setting");
    },
    cancle() {
      ipcRenderer.send("cancle");
    }
  }
};
</script>

<style lang="less" scoped>
.setting {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    display: block;
    margin: 10px;
    & > span {
      display: inline-block;
      min-width: 100px;
      text-align: right;
      font-weight: 300;
    }
    & > input {
      width: 120px;
      height: 20px;
      padding: 2px 5px;
      margin-left: 6px;
      border-radius: 4px;
      border: 1px solid #ccc;
      outline: none;
    }
  }
  & > div > button {
    min-width: 56px;
    margin: 10px 5px;
    padding: 4px 10px;
    border-radius: 12px;
    outline: none;
    cursor: pointer;
  }
}
</style>
