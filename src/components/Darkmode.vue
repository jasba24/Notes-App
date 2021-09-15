<template>
  <div class="darkMode">
    <div
      @click="changeDarkMode()"
      :style="{ width: '48px', height: '48px' }"
      :class="[darkMode ? 'sun' : 'moon']"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["darkMode"],

  methods: {
    changeDarkMode() {
      this.$emit("changeDarkMode")
    },
  },
}
</script>
