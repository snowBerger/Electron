<template>
  <div class="todo-list">
    <div class="top">
      <svg class="icon icon-search" aria-hidden="true">
        <use xlink:href="#iconsousuo"></use>
      </svg>
      <input type="text" placeholder="搜索/创建任务" v-model="keywords" @keyup.enter="add">
      <svg class="icon icon-add" aria-hidden="true">
        <use xlink:href="#iconxinjian"></use>
      </svg>
    </div>
    <div class="tips">{{list.length}}个任务</div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div class="text">{{item}}</div>
        <span class="operate">
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
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      list: ["完成一个脚手架"]
    };
  },
  methods: {
    add() {
      this.keywords && this.list.push(this.keywords);
      this.keywords = '';
    },
    finish(index) {
      alert("finish" + index);
    },
    start(index) {
      alert("start" + index);
    },
    del(index) {
      this.list.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.todo-list {
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
