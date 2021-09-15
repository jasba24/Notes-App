<template>
  <div :class="{ className }">
    <h2>{{ english ? englishDescription : spanishDescription }}</h2>
    <hr />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["class", "english", "englishDescription", "spanishDescription"],
}
</script>
