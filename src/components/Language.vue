<template>
  <div class="language">
    <div
      @mouseover="showLanguages"
      @mouseleave="showLanguages"
      class="showLanguages"
    ></div>
    <div class="language__container">
      <div
        :style="{ width: '48px', height: '48px' }"
        v-show="show"
        v-for="(language, i) in languages"
        :key="i"
        @click="changeLanguage(language.locale)"
        :class="language.class"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languages: [
        { locale: "es", class: "spanish" },
        { locale: "en", class: "english" },
      ],
      show: false,
    }
  },

  methods: {
    changeLanguage(locale) {
      this.$i18n.locale = locale
    },
    showLanguages(value) {
      this.show = !this.show
    },
  },
}
</script>
