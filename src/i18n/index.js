import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    language: 'en',
    success: "Note added successfully!",
    failed: "Note successfully removed!",
    description1: "New notes",
    description2: "My notes",
    addNote: "Add note",
    placeholder: "Type a new note",
  },
  es: {
    language: 'es',
    success: "¡Nota añadida con éxito!",
    failed: "¡Nota eliminada con éxito!",
    description1: "Nuevas notas",
    description2: "Mis notas",
    addNote: "Añadir nota",
    placeholder: "Escribe una nueva nota",
  }
}

export const i18n = createI18n({
  locale: window.navigator.language.split('-')[0],
  fallbackLocale: 'es',
  messages
})
