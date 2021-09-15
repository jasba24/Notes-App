<template>
  <form @submit.prevent="newTask()">
    <input
      type="text"
      v-model.trim="task.title"
      :class="[darkMode && 'dark']"
      :placeholder="[english ? 'Type a new note' : 'Escribe una nueva nota']"
    />
    <button type="submit">
      {{ english ? "Add note" : "Añadir nota" }}
    </button>
  </form>
</template>

<script>
export default {
  props: ['darkMode', 'english', 'task'],

  methods: {
    newTask() {
      this.$emit('newTask')
    }
  },
}
</script>
