<template>
  <div>
    <CircleProgress
      :diameter="240"
      :line-width="18"
      :percent="progress"
      :text="(countdownM + '').padStart(2, '0') + ':' + (countdownS + '').padStart(2, '0')"
    />
  </div>
</template>

<script>
import CircleProgress from "../components/CircleProgress";

export default {
  props: {
    countdownM: {
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
        1 - (this.countdownM * 60 + this.countdownS) / (this.workDuration * 60)
      );
    }
  },
};
</script>
