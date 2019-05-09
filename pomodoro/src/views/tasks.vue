<template>
  <div class="task">
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
          <svg class="icon icon-start" aria-hidden="true" @click="start(index)" v-if="item.status === TASK_STATUS.CREATED">
            <use xlink:href="#iconkaishi"></use>
          </svg>
          <svg class="icon icon-delete" aria-hidden="true" @click="del(index)">
            <use xlink:href="#iconshanchu"></use>
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { TASK_STATUS } from "../constants";

export default {
  name: "tasks",
  data() {
    return {
      task: "",
      TASK_STATUS,
      tasks: [
        {
          desc: "给你25分钟，专注做一件事",
          status: TASK_STATUS.CREATED
        }
      ]
    };
  },
  props: {
    startTimer: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    const _tasks = localStorage.getItem("tasks");
    if (_tasks) this.tasks = JSON.parse(_tasks);
  },
  methods: {
    add() {
      this.task &&
        this.tasks.push({
          desc: this.task,
          status: TASK_STATUS.CREATED
        });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.task = "";
    },
    del(index) {
      this.tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    start(index) {
      this.tasks[index].status = TASK_STATUS.RUNNING;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      this.startTimer();
    },
    finish(index) {
      this.tasks[index].status = TASK_STATUS.FINISHED;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>

