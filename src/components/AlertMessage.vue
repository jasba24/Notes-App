<template>
  <p>
    {{ english ? englishDescription : spanishDescription }}
  </p>
</template>

<script>
export default {
  props: ["english", "englishDescription", "spanishDescription"],
}
</script>
