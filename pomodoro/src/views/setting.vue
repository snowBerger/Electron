<template>
  <div class="setting">
    <label for="workDuration">
      工作时长：
      <input
        type="number"
        name="workDuration"
        id="work-duration"
        v-model="workDuration"
        @change="changeWorkDuration"
      >
    </label>
    <label for="restDuration">
      休息时长：
      <input
        type="number"
        name="restDuration"
        id="rest-duration"
        v-model="restDuration"
        @change="changeRestDuration"
      >
    </label>
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
  methods: {
    changeWorkDuration() {
      alert("change work duration: " + this.workDuration);
    },
    changeRestDuration() {
      alert("change rest duration: " + this.restDuration);
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
