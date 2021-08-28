<template>
  <div class="body">
    <div class="main">
      <div class="content">
        <!-- NEW NOTE CONTAINER -->
        <div class="new-notes">
          <h2>New notes</h2>
          <hr />
          <div v-if="flag_add" class="message-success">
            <p>Note added successfully!</p>  
          </div>
          <div v-if="flag_delete" class="message-delete">
            <p>Note successfully removed!</p>  
          </div>
          <form @submit.prevent="newTask()">
            <input type="text" v-model.trim="task.title" placeholder="Type a new note"/>
            <button type="submit">Add note</button>
          </form>
        </div>
        <!-- END NEW NOTE CONTAINER -->
        
        <!-- MY NOTES (LIST) -->
        <div class="my-notes">
          <h2>My notes</h2>
          <hr />
          <ul class="notes">
            <li :class="[task.done && 'task-done', 'note']" v-for="task in tasks" :key="task.id">
              <p>{{task.title}}</p> 
              <div>
                <i class="fas fa-minus-circle fa-2x" :style="{'color': '#f00' }" @click="deleteTask(task.id)"></i>
                <i class="fas fa-check-circle fa-2x" :style="{'color': '#32CD32' }" @click="doneTask(task.id)"></i>
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
      flag_delete: false
    }
  },
  methods: {
    loadData () {
      if ( localStorage.getItem('notes') ) {
        this.tasks = JSON.parse(localStorage.getItem('notes'))
      } else {
        localStorage.setItem('notes', JSON.stringify([]))
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
      localStorage.setItem('notes', JSON.stringify(this.tasks))
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

body
{
  background-image: url('./assets/background.jpg');
}

.body
{
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.main
{
  display: flex;
  justify-content: center;
  padding: 24px;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8));
}

.content
{
  width: 70%;
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
  letter-spacing: 1.25px;
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
  font-size: 32px;
  color: #FFF;
  letter-spacing: 5px;
}

.new-notes input
{
  width: 100%;
  padding: 12px;
  border: none;
  outline: none;
  border-radius: 16px 0 16px 0;
  transition: .4s;
  background-color: #BBB;
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

li.task-done
{
  text-decoration: line-through;
  background-color: #888;
}
</style>