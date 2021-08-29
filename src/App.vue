<template>
  <div :class="[ darkMode && 'dark', 'body']">
    <div :class="[darkMode && 'dark', 'main']">

      <!-- OPTIONS (DARKMODE - LANGUAGE) -->
      <div class="options">
        <div class="darkMode">
          <div @click="changeDarkMode()" :style="{'width': '48px', 'height': '48px'}" :class="[darkMode ? 'sun' : 'moon']"></div>
        </div>
        <div class="language">
          <div @click="changeLanguage()" :style="{'width': '48px', 'height': '48px'}" :class="[english ? 'spanish' : 'english']"></div>
        </div>
      </div>
      <!-- END OPTIONS (DARKMODE - LANGUAGE) -->

      <div class="content">
        <!-- NEW NOTE CONTAINER -->
        <div class="new-notes">
          <h2>{{ english ? 'New notes' : 'Nuevas notas'}}</h2>
          <hr />
          <div v-if="flag_add" class="message-success">
            <p>{{ english ? 'Note added successfully!' : '¡Nota añadida con éxito!'}}</p>  
          </div>
          <div v-if="flag_delete" class="message-delete">
            <p>{{ english ? 'Note successfully removed!' : '¡Nota eliminada con éxito!'}}</p>  
          </div>
          <form @submit.prevent="newTask()">
            <input type="text" v-model.trim="task.title" :class="[darkMode && 'dark']" :placeholder='[ english ? "Type a new note" : "Escribe una nueva nota"]'/>
            <button type="submit">{{ english ? 'Add note' : 'Añadir nota'}}</button>
          </form>
        </div>
        <!-- END NEW NOTE CONTAINER -->
        
        <!-- MY NOTES (LIST) -->
        <div class="my-notes">
          <h2>{{ english ? 'My notes' : 'Mis notas'}}</h2>
          <hr />
          <ul class="notes">
            <li :class="[task.done && 'task-done', darkMode && 'dark', 'note']" v-for="task in tasks" :key="task.id">
              <p>{{task.title}}</p> 
              <div>
                <i :class="[darkMode && 'dark', 'fas fa-minus-circle']" :style="{'font-size': '28px' }" @click="deleteTask(task.id)"></i>
                <i :class="[darkMode && 'dark', 'fas fa-check-circle']" :style="{'color': '#32CD32', 'font-size': '28px' }" @click="doneTask(task.id)"></i>
              </div>
            </li>
          </ul>
        </div>
        <!-- END MY NOTES (LIST) -->
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      tasks: [],
      task: {
        id: '',
        title: '',
        done: false
      },
      flag_add: false,
      flag_delete: false,
      darkMode: false,
      english: true
    }
  },
  methods: {
    loadData () {
      if ( localStorage.getItem('notes') ) {
        this.tasks = JSON.parse(localStorage.getItem('notes'))
      } else {
        localStorage.setItem('notes', JSON.stringify([]))
      }

      if ( localStorage.getItem('darkMode') ) {
        this.darkMode = JSON.parse(localStorage.getItem('darkMode'))
      } else {
        localStorage.setItem('darkMode', JSON.stringify([]))
      }

      if ( localStorage.getItem('english') ) {
        this.english = JSON.parse(localStorage.getItem('english'))
      } else {
        localStorage.setItem('english', JSON.stringify([]))
      }
    },
    newTask () {
      if ( this.task.title ) {
        this.task.id = this.uuidv4()
        this.tasks.push({...this.task})
        setTimeout(() => {
          this.flag_add = !this.flag_add
        }, 3000);
        localStorage.setItem('notes', JSON.stringify(this.tasks))
        this.task.title = ''
        this.task.id = ''
        this.flag_add = !this.flag_add
      }
    },
    deleteTask (id) {
      this.tasks = this.tasks.filter( task => task.id !== id )
      setTimeout(() => {
        this.flag_delete = !this.flag_delete
      }, 3000);
      localStorage.setItem('notes', JSON.stringify(this.tasks, this.darkMode, this.english))
      this.flag_delete = !this.flag_delete
    },
    doneTask (id) {
      this.tasks = this.tasks.map( task => {
        if ( task.id === id ) {
          return {
            title: task.title,
            id: task.id,
            done: !task.done
          }
        }
        return task
      })
      localStorage.setItem('notes', JSON.stringify(this.tasks))
    },
    changeDarkMode () {
      this.darkMode = !this.darkMode
      localStorage.setItem('darkMode', JSON.stringify(this.darkMode))
    },
    changeLanguage () {
      this.english = !this.english      
      localStorage.setItem('english', JSON.stringify(this.english))
    },
    uuidv4 () {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style>
*
{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

.body
{
  background-image: url('./assets/background.jpg');
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.body.dark
{  
  background-image: url('./assets/background-dark.jpg');
}

.options div
{
  cursor: pointer;
}

div.sun
{
  background-image: url('./assets/sun.png');
}

div.moon
{
  background-image: url('./assets/moon.png');
}

div.spanish
{
  background-image: url('./assets/spanish.png');
}

div.english
{
  background-image: url('./assets/english.png');
}

.main
{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.1));
}

.main.dark
{
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
}

.options
{ 
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.content
{
  width: 50%;
}

@media only screen and (max-width: 600px) {
  .content {
    width: 100%;
  }
}

.message-success, .message-delete
{
  margin-top: 10px;
  width: 100%;
  text-align: center;
  padding: 10px;
  border: 1px solid #7ACBCD;
  background-color: #229395;
  font-weight: 600;
  color: #FFF;
}

.message-delete
{  
  border: 1px solid #ffacac;
  background-color: #fd5e5e;
}

.new-notes, .my-notes
{
  margin-bottom: 20px;
  text-align: center;
}

.new-notes h2, .my-notes h2
{
  font-size: 30px;
  color: #FFF;
  letter-spacing: 3px;
}

.new-notes input
{
  width: 100%;
  padding: 12px;
  border: none;
  outline: none;
  border-radius: 16px 0 16px 0;
  transition: .4s;
  background-color: #DDD;
  font-weight: 600;
  margin-top: 10px;
  box-shadow: 2px 2px 2px #666;
  font-size: 16px;
  margin-bottom: 10px;
}

.new-notes input:focus
{  
  border-radius: 0 16px 0 16px;
}

input.dark
{
  background-color: #333;
  color: #FFF;
}

.new-notes button
{
  cursor: pointer;
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
  background-color: #7ACBCD;
  font-weight: 600;
  font-size: 16px;
}

.my-notes
{
  color: #FFF;
}

.notes
{
  margin-top: 10px;
}

.my-notes li
{
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  background-color: #FFF;
  color: #222;
  padding: 10px;
  margin-bottom: 10px;
  font-weight: 600;
}

.my-notes li.dark
{
  color: #FFF;
  background-color: #222;
}

.my-notes li:nth-child(even)
{
  border-radius: 0 16px 0 16px;
}

.my-notes li:nth-child(odd)
{
  border-radius: 16px 0 16px 0;
}

.my-notes div i
{
  margin-right: 8px;
}

.my-notes div i:first-child
{
  color: #f00;
}

.my-notes div i.dark
{
  color: #fd5e5e;
}

li.task-done, li.task-done.dark
{
  text-decoration: line-through;
  background-color: #888;
}

li.task-done.dark
{
  background-color: #555;
}
</style>