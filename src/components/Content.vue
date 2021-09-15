<template>
  <div :class="{ className }">
    <h2>{{ $t(i18n) }}</h2>
    <hr />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["class", "i18n"],
}
</script>
