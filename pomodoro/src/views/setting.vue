<template>
  <div class="setting">
    <!-- <div>
      番茄工作法：最简单有效的时间管理方式
      输入一个任务，将番茄时间设为25分钟点【开始工作】
      专注工作，中途不允许做任何与该任务无关的事，直到番茄时钟响起
      然后短暂休息一下，5分钟左右
    </div>-->
    <label for="workDuration">
      工作时长：
      <input type="number" name="workDuration" id="work-duration" v-model="workDuration">
    </label>
    <label for="restDuration">
      休息时长：
      <input type="number" name="restDuration" id="rest-duration" v-model="restDuration">
    </label>
    <button @click="settingConfig">确定</button>
  </div>
</template>

<script>
export default {
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
  mounted() {
    
  },
  methods: {
    settingConfig() {
      localStorage.setItem("workDuration", this.workDuration);
      localStorage.setItem("restDuration", this.restDuration);
      this.$router.push('/')
      this.initApp();
    }
  }
};
</script>

<style lang="less" scoped>
.setting {
  label {
    display: block;
  }
}
</style>
