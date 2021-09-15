<template>
  <div class="language">
    <div
      @click="changeLanguage()"
      :style="{ width: '48px', height: '48px' }"
      :class="[english ? 'spanish' : 'english']"
    ></div>
  </div>
</template>

<script>
export default {
  props: ["english"],

  methods: {
    changeLanguage() {
      this.$emit("changeLanguage")
    },
  },
}
</script>
