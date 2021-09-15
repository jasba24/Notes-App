<template>
  <p>{{ task.title }}</p>
  <div>
    <i
      :class="[darkMode && 'dark', 'fas fa-minus-circle']"
      :style="{ 'font-size': '28px' }"
      @click="deleteTask(task.id)"
    ></i>
    <i
      :class="[darkMode && 'dark', 'fas fa-check-circle']"
      :style="{ color: '#32CD32', 'font-size': '28px' }"
      @click="doneTask(task.id)"
    ></i>
  </div>
</template>

<script>
export default {
  props: ["task", "darkMode"],

  methods: {
    deleteTask(id) {
      this.$emit("deleteTask", id)
    },
    doneTask(id) {
      this.$emit("doneTask", id)
    },
  },
}
</script>
