<template>
  <div :class="[darkMode && 'dark', 'body']">
    <main :class="[darkMode && 'dark', 'main']">
      <!-- OPTIONS (DARKMODE - LANGUAGE) -->
      <section class="options">
        <Darkmode :darkmode="darkmode" @changeDarkMode="changeDarkMode" />
        <Language @changeLanguage="changeLanguage" />
      </section>
      <!-- END OPTIONS (DARKMODE - LANGUAGE) -->

      <section class="content">
        <!-- NEW NOTE CONTAINER -->
        <Content className="new-notes" i18n="description1">
          <div v-if="flag_add" class="message-success">
            <AlertMessage i18n="success" />
          </div>
          <div v-if="flag_delete" class="message-delete">
            <AlertMessage i18n="failed" />
          </div>
          <CreateNoteForm
            @newTask="newTask"
            :task="task"
            :darkMode="darkMode"
          />
        </Content>
        <!-- END NEW NOTE CONTAINER -->

        <!-- MY NOTES (LIST) -->
        <Content className="my-notes" i18n="description2">
          <ul class="notes">
            <li
              :class="[task.done && 'task-done', darkMode && 'dark', 'note']"
              v-for="task in tasks"
              :key="task.id"
            >
              <Note
                :task="task"
                :darkMode="darkMode"
                @deleteTask="deleteTask(task.id)"
                @doneTask="doneTask(task.id)"
              />
            </li>
          </ul>
        </Content>
        <!-- END MY NOTES (LIST) -->
      </section>
    </main>
  </div>
</template>

<script>
import Darkmode from "@/components/Darkmode"
import Language from "@/components/Language"
import CreateNoteForm from "@/components/CreateNoteForm"
import AlertMessage from "@/components/AlertMessage"
import Note from "@/components/Note"
import Content from "@/components/Content"

export default {
  name: "App",

  components: {
    Darkmode,
    Language,
    CreateNoteForm,
    AlertMessage,
    Note,
    Content,
  },

  data() {
    return {
      tasks: [],
      task: {
        id: "",
        title: "",
        done: false,
      },
      flag_add: false,
      flag_delete: false,
      darkMode: false,
    }
  },
  methods: {
    loadData() {
      if (localStorage.getItem("notes")) {
        this.tasks = JSON.parse(localStorage.getItem("notes"))
      } else {
        localStorage.setItem("notes", JSON.stringify([]))
      }

      if (localStorage.getItem("darkMode")) {
        this.darkMode = JSON.parse(localStorage.getItem("darkMode"))
      } else {
        localStorage.setItem("darkMode", JSON.stringify([]))
      }
    },
    newTask() {
      if (this.task.title) {
        this.task.id = this.uuidv4()
        this.tasks.push({ ...this.task })
        setTimeout(() => {
          this.flag_add = !this.flag_add
        }, 3000)
        localStorage.setItem("notes", JSON.stringify(this.tasks))
        this.task.title = ""
        this.task.id = ""
        this.flag_add = !this.flag_add
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
      setTimeout(() => {
        this.flag_delete = !this.flag_delete
      }, 3000)
      localStorage.setItem(
        "notes",
        JSON.stringify(this.tasks, this.darkMode, this.english)
      )
      this.flag_delete = !this.flag_delete
    },
    doneTask(id) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) {
          return {
            title: task.title,
            id: task.id,
            done: !task.done,
          }
        }
        return task
      })
      localStorage.setItem("notes", JSON.stringify(this.tasks))
    },
    changeDarkMode() {
      this.darkMode = !this.darkMode
      localStorage.setItem("darkMode", JSON.stringify(this.darkMode))
    },
    uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style>
@import url("./index.css");
</style>
