<template>
  <div>
    <CircleProgress
      :diameter="240"
      :line-width="18"
      :percent="progress"
      :text="(countdownH + '').padStart(2, '0') + ':' + (countdownS + '').padStart(2, '0')"
    />
  </div>
</template>

<script>
import CircleProgress from "../components/CircleProgress";

export default {
  data() {
    return {
      // timer: null,
      // workDuration: 25,
      // countdownH: 25,
      // countdownS: 0
    };
  },
  props: {
    countdownH: {
      type: Number,
      default: 25
    },
    countdownS: {
      type: Number,
      default: 0
    },
    workDuration: {
      type: Number,
      default: 25
    }
  },
  components: {
    CircleProgress
  },
  computed: {
    progress() {
      return (
        1 - (this.countdownH * 60 + this.countdownS) / (this.workDuration * 60)
      );
    }
  },
  mounted() {
    // this.countdown = this.workDuration;
    // this.timer = setInterval(() => {
    //   if (this.countdownH === 0) return;
    //   if (this.countdownS > 0) this.countdownS -= 1;
    //   else {
    //     this.countdownH -= 1;
    //     this.countdownS = 59;
    //   }
    // }, 1000);
  }
};
</script>
