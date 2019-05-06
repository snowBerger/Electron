<template>
  <div id="app">
    <div class="content">
      <TodoList/>
      <router-view></router-view>
    </div>
    <div class="menu">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconchazhaobiaodanliebiao"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPage('timer')">
        <use xlink:href="#iconkaishi"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#iconshezhi"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  name: "app",
  components: {
    TodoList
  },
  methods: {
    goPage(name) {
      alert(this.$route.path);
      this.$router.push({ name: name });
      alert(this.$route.path);
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
  }
}
</style>

