<template>
  <div id="app">
    <div class="content">
      <router-view
        :startTimer="startTimer"
        :workDuration="workDuration"
        :countdownH="countdownH"
        :countdownS="countdownS"
      ></router-view>
    </div>
    <div class="menu">
      <svg
        class="icon"
        aria-hidden="true"
        v-for="(item, index) in menus"
        :key="index"
        @click="goPage(item.key)"
      >
        <use :xlink:href="'#' + item.icon"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { clearInterval } from 'timers';
export default {
  name: "app",
  data() {
    return {
      menus: [
        {
          key: "tasks",
          icon: "iconchazhaobiaodanliebiao"
        },
        {
          key: "timer",
          icon: "iconkaishi"
        },
        {
          key: "setting",
          icon: "iconshezhi"
        }
      ],
      timer: null,
      workDuration: 25,
      countdownH: 25,
      countdownS: 0
    };
  },
  methods: {
    startTimer() {
      this.countDown();
      this.$router.push("/timer");
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    /**
     * 开始计时
     */
    countDown() {
      this.countdown = this.workDuration;
      this.timer = setInterval(() => {
        if (this.countdownH === 0) return;
        if (this.countdownS > 0) this.countdownS -= 1;
        else {
          this.countdownH -= 1;
          this.countdownS = 59;
        }
      }, 1000);
    },
    goPage(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
  }
  // .content::before {
  //   content: '';
  //   display: block;
  //   width: 0;
  //   height: 0;
  //   border-top: none;
  //   border-bottom: 10px solid #0F0;
  //   border-left: 5px solid transparent;
  //   border-right: 5px solid transparent;
  //   top: -10px;
  // }
  .menu {
    height: 38px;
    background: #333a3f;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    & > .icon {
      color: #c6c9ca;
      font-size: 20px;
    }
    & > .icon:nth-child(2) {
      font-size: 16px;
    }
    & > .icon:hover {
      cursor: pointer;
    }
  }
}
</style>

