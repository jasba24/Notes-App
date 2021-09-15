<template>
  <form @submit.prevent="newTask()">
    <input
      type="text"
      v-model.trim="task.title"
      :class="[darkMode && 'dark']"
      :placeholder="$t('placeholder')"
    />
    <button type="submit">
      {{ $t("addNote") }}
    </button>
  </form>
</template>

<script>
export default {
  props: ["darkMode", "task"],

  methods: {
    newTask() {
      this.$emit("newTask")
    },
  },
}
</script>
