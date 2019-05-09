<template>
  <TodoList :data="tasks" :startTask="startTask"/>
</template>

<script>
import TodoList from "../components/TodoList.vue";

export default {
  name: "tasks",
  data () {
    return {
      tasks: [
        '完成一个vue脚手架'
      ]
    }
  },
  props: {
    startTimer: {
      type: Function,
      default: () => {}
    }
  },
  components: {
    TodoList
  },
  methods: {
    startTask () {
      this.startTimer()
    }
  }
};
</script>
