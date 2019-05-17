<template>
  <div class="home">
    <div class="content">
      <div class="task-list" v-if="!timerFlag">
        <div class="top">
          <!-- <svg class="icon icon-search" aria-hidden="true">
            <use xlink:href="#iconsousuo"></use>
          </svg>-->
          <input type="text" placeholder="创建任务" v-model="task" @keyup.enter="newTask">
          <svg class="icon icon-add" aria-hidden="true" @click="newTask">
            <use xlink:href="#iconxinjian"></use>
          </svg>
        </div>
        <div class="tips">
          <span @click="tabKeyChange(TASK_STATUS.CREATED)" style="color: #158fea">
            <span>{{tasks.length}}</span>项未完成
          </span> |
          <span @click="tabKeyChange(TASK_STATUS.FINISHED)" style="color: #86dd49">
            <span>{{finishedTasks.length}}</span>项已完成
          </span>
        </div>
        <draggable v-model="taskList" group="task" tag="ul" @start="drag=true" @end="drag=false">
          <li
            v-for="task in taskList"
            :key="task.id"
            :class="tabKey === TASK_STATUS.FINISHED ? 'finished' : ''"
          >
            <div class="task">
              <div>{{task.desc}}</div>
              <span v-if="task.pomodoro">
                <svg class="icon icon-finish" aria-hidden="true">
                  <use xlink:href="#iconfanqie"></use>
                </svg>
                x {{task.pomodoro}}
              </span>
            </div>
            <span class="operate">
              <svg
                class="icon icon-finish"
                aria-hidden="true"
                @click="finish(task.id)"
                v-if="tabKey === TASK_STATUS.CREATED"
              >
                <use xlink:href="#iconwancheng"></use>
              </svg>
              <svg
                class="icon icon-start"
                aria-hidden="true"
                @click="start(task.id)"
                v-if="tabKey === TASK_STATUS.CREATED"
              >
                <use xlink:href="#iconkaishi"></use>
              </svg>
              <svg class="icon icon-delete" aria-hidden="true" @click="del(task.id)">
                <use xlink:href="#iconshanchu"></use>
              </svg>
            </span>
          </li>
        </draggable>
      </div>
      <div v-if="timerFlag" class="timer">
        <CircleProgress
          :diameter="220"
          :line-width="16"
          :font-size="52"
          :percent="progress"
          :text="(countdownM + '').padStart(2, '0') + ':' + (countdownS + '').padStart(2, '0')"
        />
        <div>
          <button @click="stop">stop</button>
          <button
            @click="rest"
            v-if="timerFlag === 'task' && countdownM === 0 && countdownS === 0"
          >rest</button>
        </div>
      </div>
    </div>
    <div class="menu">
      <svg
        class="icon"
        aria-hidden="true"
        v-for="(menu, index) in menus"
        :key="index"
        @click="menuClick(menu.key)"
      >
        <use :xlink:href="'#' + menu.icon"></use>
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import draggable from "vuedraggable";
import { TASK_STATUS } from "@/constants";
import CircleProgress from "@/components/CircleProgress";
import { getUUID } from "@/utils";

import { ipcRenderer } from "electron";

export default {
  name: "home",
  data() {
    return {
      task: "",
      timerFlag: "", // 计时器标识：task-任务、rest-休息
      timerTask: "", // 当前番茄任务
      tabKey: TASK_STATUS.CREATED, // 当前任务状态
      tasks: [], // 任务列表
      finishedTasks: [], // 已完成任务列表
      timer: null, // 计时器
      workDuration: 25, // 工作时长，默认25分钟
      restDuration: 5, // 休息时长，默认5分钟
      countdownM: 0, // 当前番茄分
      countdownS: 0, // 当前番茄秒
      TASK_STATUS, // 任务状态
      // 底部菜单
      menus: [
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
    CircleProgress,
    draggable
  },
  computed: {
    taskList: {
      get() {
        return this.tabKey === TASK_STATUS.CREATED
          ? this.tasks
          : this.finishedTasks;
      },
      set(value) {
        if (this.tabKey === TASK_STATUS.CREATED)
          localStorage.setItem("tasks", JSON.stringify(value));
        else localStorage.setItem("finishedTasks", JSON.stringify(value));
        this.initApp();
      }
    },
    progress() {
      if (this.timerFlag === "task")
        return (
          1 -
          (this.countdownM * 60 + this.countdownS) / (this.workDuration * 60)
        );
      else
        return (
          1 -
          (this.countdownM * 60 + this.countdownS) / (this.restDuration * 60)
        );
    }
  },
  mounted() {
    this.initApp();
    ipcRenderer.on("initApp", (event, data) => {
      this.initApp();
    });
  },
  methods: {
    /**
     * 初始化App
     */
    initApp() {
      // 获取任务列表
      const _tasks = localStorage.getItem("tasks");
      if (_tasks) this.tasks = JSON.parse(_tasks);
      // 获取已完成任务列表
      const _finishedTasks = localStorage.getItem("finishedTasks");
      if (_finishedTasks) this.finishedTasks = JSON.parse(_finishedTasks);
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
          if (this.timerFlag === "task") {
            this.tasks.find(task => task.id === this.timerTask).pomodoro += 1;
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            ipcRenderer.send();
            new window.Notification("Pomodoro", {
              title: "",
              body: "恭喜你完成了一个🍅任务，休息一下吧😁"
            });
          } else if (this.timerFlag === "rest") {
            new window.Notification("Pomodoro", {
              title: "",
              body: "休息好了，继续完成任务吧💪"
            });
            this.timerFlag = "";
          }
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
        if (this.countdownS > 0) this.countdownS -= 1;
        else {
          this.countdownM -= 1;
          this.countdownS = 59;
        }
      }, 1000);
    },
    /**
     * 新增任务
     */
    newTask() {
      this.task &&
        this.tasks.push({
          id: getUUID(8, 16),
          desc: this.task,
          pomodoro: 0
        });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.task = "";
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
      this.timerFlag = "";
    },
    /**
     * 完成任务
     */
    finish(id) {
      const _task = this.tasks.find(task => task.id === id);
      _task && this.finishedTasks.push(_task);
      this.tasks.splice(this.tasks.findIndex(task => task.id === id), 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("finishedTasks", JSON.stringify(this.finishedTasks));
    },
    /**
     * 开始任务
     */
    start(id) {
      // localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.initApp();
      this.timerFlag = "task";
      this.timerTask = id;
      this.countdownM = this.workDuration;
      this.countdownS = 0;
      this.countDown();
    },
    /**
     * 删除任务
     */
    del(id) {
      const _index = this.taskList.findIndex(task => task.id === id);
      this.taskList.splice(_index, 1);
      if (this.tabKey === TASK_STATUS.CREATED)
        localStorage.setItem("tasks", JSON.stringify(this.taskList));
      else localStorage.setItem("finishedTasks", JSON.stringify(this.taskList));
    },
    tabKeyChange(key) {
      this.tabKey = key;
    },
    menuClick(key) {
      switch (key) {
        case "setting":
          ipcRenderer.send("open-setting");
          break;
        case "quit":
          ipcRenderer.send("on-quit");
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    .task-list {
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
        overflow: hidden;
        .icon-search,
        .icon-add {
          color: #323232;
          margin: 0 10px;
          font-size: 16px;
        }
        & > input {
          flex: 1;
          height: 100%;
          padding: 0 10px;
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
        & > span:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      & > ul {
        height: 260px;
        margin: 10px 0 0;
        padding: 0;
        list-style: none;
        overflow-x: hidden;
        overflow-y: auto;
        // & > li:last-child {
        //   border-bottom: none;
        // }
        & > li:hover {
          cursor: grab;
        }
        & > li {
          position: relative;
          text-align: left;
          border-bottom: 1px solid #efefef;
          display: flex;
          flex-direction: row;
          align-items: center;
          .task {
            padding: 6px 0;
            & > span {
              font-size: 12px;
              color: #c6c9ca;
            }
          }
          // .task:hover {
          //   cursor: text;
          // }
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
          .task > div:first-child {
            text-decoration: line-through;
          }
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
    .timer {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      & > div:last-child {
        margin-top: 10px;
        & > button {
          margin: 10px 5px;
          padding: 4px 10px;
          border-radius: 12px;
          cursor: pointer;
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
