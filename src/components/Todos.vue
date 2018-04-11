<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" @keyup.enter="addList" placeholder="What needs to be done?" v-model="tempValue" autofocus>
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main" v-show="todoList.length" >
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="show">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <li v-for="item in filteredTodos" :class="{completed:item.completed, editing: todo === item}">
            <div class="view">
              <input class="toggle" type="checkbox"  v-model="item.completed">
              <label @dblclick.prevent.stop="edited(item)">{{item.value}}</label>
              <button class="destroy" @click.stop="removeItem(item)"></button>
            </div>
            <!--<edit-input :value="item.value"></edit-input>-->
            <input class="edit" v-model="item.value"
                   @blur="todo = null"
                   @keyup.enter="todo = null"
                   v-todoFocus="item === todo">
          </li>

        </ul>
      </section>
      <!-- This footer should hidden by default and shown when there are todos -->
      <footer class="footer" v-show="todoList.length">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>{{filteredTodos.length}}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <a :class="{selected:$route.path == '/all' }" href="#/all">All</a>
          </li>
          <li>
            <a :class="{selected:$route.path == '/active' }" href="#/active">Active</a>
          </li>
          <li>
            <a :class="{selected:$route.path == '/completed' }" href="#/completed">Completed</a>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed" v-show="completed > 0" @click="clearTodo">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <span>{{filteredTodos}}11</span>
      <p>Double-click to edit a todo</p>
      <!-- Remove the below line ↓ -->
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
      <!-- Change this out with your name and url ↓ -->
      <p>Created by <a href="http://todomvc.com">you</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </div>
  <!-- Scripts here. Don't remove ↓ -->
</template>

<script>
    export default {
      name: "todos",
      data(){
        return {
          tempValue: '',
          todoList : [
            {
              completed: false,
              value: 'Taste JavaScript'
            },
            {
              completed: false,
              value: 'Taste Css'
            },
            {
              completed: false,
              value: 'Taste Html'
            }
          ],
          todo: null
        }
      },
      directives: {
        todoFocus (el, binding) {
          if( binding.value ){
              el.focus();
          }
        }
      },
      methods:{
        //清除已选择的todo
        clearTodo(){
          this.todoList = this.todoList.filter(item => !item.completed);
        },
        //移除单个todo
        removeItem(todo){
          this.todoList = this.todoList.filter(item => item !== todo)
        },
        //添加todo
        addList(){
          if( this.tempValue === '' )return;
          this.todoList.unshift({
            completed: false,
            value : this.tempValue
          });
          this.tempValue = '';
        },
        //编辑todo
        edited(todo){
          this.todo = todo;
        }
      },
      computed:{
        completed(){
          return this.todoList.filter( item => item.completed ).length;
        },
        remaning(){
          return this.todoList.filter( item => !item.completed ).length;
        },
        filteredTodos(){
          var path = this.$route.path;
          if( path === '/active' ){
            return this.todoList.filter(item => {
              return !item.completed;
            })
          }else if( path === '/completed' ){
            return this.todoList.filter(item => {
              return item.completed;
            })
          }
          return this.todoList;
        },
        show:{
          get(){
            return this.remaning == 0;
          },
          set (val){
            this.todoList.forEach(item => {
              item.completed = val;
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
