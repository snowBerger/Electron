<template>
  <div id="app">
    <div class="content">
      <div class="task" v-if="!timerFlag">
        <div class="top">
          <svg class="icon icon-search" aria-hidden="true">
            <use xlink:href="#iconsousuo"></use>
          </svg>
          <input type="text" placeholder="搜索/创建任务" v-model="task" @keyup.enter="add">
          <svg class="icon icon-add" aria-hidden="true">
            <use xlink:href="#iconxinjian"></use>
          </svg>
        </div>
        <div class="tips">{{tasks.length}}个任务</div>
        <ul>
          <li
            v-for="(item, index) in tasks"
            :key="index"
            :class="item.status === TASK_STATUS.FINISHED ? 'finished' : ''"
          >
            <div class="text">{{item.desc}}</div>
            <span class="operate" v-if="item.status !== TASK_STATUS.FINISHED">
              <svg class="icon icon-finish" aria-hidden="true" @click="finish(index)">
                <use xlink:href="#iconwancheng"></use>
              </svg>
              <svg class="icon icon-start" aria-hidden="true" @click="start(index)">
                <use xlink:href="#iconkaishi"></use>
              </svg>
              <svg class="icon icon-delete" aria-hidden="true" @click="del(index)">
                <use xlink:href="#iconshanchu"></use>
              </svg>
            </span>
          </li>
        </ul>
      </div>
      <div v-if="timerFlag">
        <CircleProgress
          :diameter="240"
          :line-width="18"
          :percent="progress"
          :text="(countdownM + '').padStart(2, '0') + ':' + (countdownS + '').padStart(2, '0')"
        />
        <button @click="stop">stop</button>
        <button
          @click="rest"
          v-if="timerFlag === 'task' && countdownM === 0 && countdownS === 0"
        >开始休息</button>
      </div>
    </div>
    <div class="menu">
      <svg
        class="icon"
        aria-hidden="true"
        v-for="(item, index) in menus"
        :key="index"
        @click="menuClick(item.key)"
      >
        <use :xlink:href="'#' + item.icon"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { TASK_STATUS } from "./constants";
import CircleProgress from "./components/CircleProgress";

export default {
  name: "app",
  data() {
    return {
      task: "",
      timerFlag: "", // 计时器标识：task-任务、rest-休息
      tasks: [], // 任务列表
      timer: null, // 计时器
      workDuration: 1, // 工作时长，默认25分钟
      restDuration: 5, // 休息时长，默认5分钟
      countdownM: 0, // 当前番茄分
      countdownS: 0, // 当前番茄秒
      TASK_STATUS, // 任务状态
      // 底部菜单
      menus: [
        {
          key: "finishList",
          icon: "iconchazhaobiaodanliebiao"
        },
        {
          key: "setting",
          icon: "iconshezhi"
        },
        {
          key: "quit",
          icon: "iconguanbi"
        }
      ]
    };
  },
  components: {
    CircleProgress
  },
  computed: {
    progress() {
      if (this.timerFlag === 'task') return 1 - (this.countdownM * 60 + this.countdownS) / (this.workDuration * 60)
      else return 1 - (this.countdownM * 60 + this.countdownS) / (this.restDuration * 60)
    }
  },
  mounted() {
    this.initApp();
  },
  methods: {
    /**
     * 初始化App
     */
    initApp() {
      // 获取任务列表
      const _tasks = localStorage.getItem("tasks");
      if (_tasks) {
        this.tasks = JSON.parse(_tasks);
      } else {
        this.tasks = [
          {
            desc: "给你25分钟，专注做一件事",
            status: TASK_STATUS.CREATED
          }
        ];
      }
      // 初始化计时器
      clearInterval(this.timer);
      this.timer = null;
      // 初始化数据
      this.workDuration =
        +localStorage.getItem("workDuration") || this.workDuration;
      this.restDuration =
        +localStorage.getItem("restDuration") || this.restDuration;
      // this.countdownM = this.workDuration;
      // this.countdownS = 0;
    },
    /**
     * 停止计时器
     */
    clearTimer() {
      this.initApp();
    },
    /**
     * 开始计时
     */
    countDown() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.timer = setInterval(() => {
        if (this.countdownM === 0 && this.countdownS === 0) {
          if (this.timerFlag === "task")
            alert("恭喜你完成了一个🍅任务，休息一下吧😁");
          else if (this.timerFlag === "rest")
            alert("恭喜你完成了一个🍅任务，休息一下吧😁");
          this.stop();
          return;
        }
        if (this.countdownS > 0) this.countdownS -= 1;
        else {
          this.countdownM -= 1;
          this.countdownS = 59;
        }
      }, 100);
    },
    /**
     * 新增任务
     */
    add() {
      this.task &&
        this.tasks.push({
          desc: this.task,
          status: TASK_STATUS.CREATED
        });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.task = "";
    },
    /**
     * 删除任务
     */
    del(index) {
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    /**
     * 开始任务
     */
    start() {
      // localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.timerFlag = "task";
      this.countdownM = this.workDuration;
      this.countdownS = 0;
      this.countDown();
    },
    /**
     * 开始休息
     */
    rest() {
      this.timerFlag = "rest";
      this.countdownM = this.restDuration;
      this.countdownS = 0;
      this.countDown();
    },
    /**
     * 暂停任务
     */
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    /**
     * 完成任务
     */
    finish(index) {
      this.tasks[index].status = TASK_STATUS.FINISHED;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    menuClick(key) {
      switch (key) {
        case "finishList":
          break;
        case "setting":
          break;
        case "quit":
          break;
        default:
          break;
      }
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
    .task {
      padding: 0 10px;
      background: #fefefe;
      font-size: 14px;
      .top {
        height: 30px;
        margin: 16px 0;
        border-radius: 4px;
        background: #edf0f1;
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon-search,
        .icon-add {
          color: #323232;
          margin: 0 10px;
          font-size: 16px;
        }
        & > input {
          flex: 1;
          // height: 100%;
          border: none;
          background: #edf0f1;
          color: #323232;
          font-size: 14px;
          outline: none;
        }
      }
      .tips {
        font-size: 12px;
        text-align: right;
        color: #c6c9ca;
      }
      & > ul {
        margin: 0;
        padding: 0;
        list-style: none;
        // & > li:last-child {
        //   border-bottom: none;
        // }
        & > li {
          position: relative;
          text-align: left;
          border-bottom: 1px solid #efefef;
          .text {
            padding: 6px 0;
          }
          .operate {
            height: 100%;
            position: absolute;
            display: none;
            right: 0;
            top: 0;
            background: #fefefe;
            & > .icon {
              display: inline-block;
              font-size: 16px;
              margin: 0 4px;
            }
            .icon-finish {
              color: #3fd74b;
            }
            .icon-start {
              color: #4791fe;
            }
            .icon-delete {
              color: #ff0000;
            }
          }
        }
        & > li.finished {
          text-decoration: line-through;
        }
        & > li:hover {
          background: #eaf4f9;
          .operate {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .operate:hover {
            cursor: pointer;
          }
        }
      }
    }
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
    justify-content: flex-end;
    & > .icon {
      color: #c6c9ca;
      font-size: 20px;
      margin: 0 10px;
    }
    & > .icon:last-child {
      font-size: 16px;
    }
    & > .icon:hover {
      cursor: pointer;
    }
  }
}
</style>

