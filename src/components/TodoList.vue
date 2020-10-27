<template>
  <div class="container">
    <v-row>
      <v-col>
        <create-todo @on-new-todo="addTodo($event)" />
      </v-col>
      <v-col>
        <v-form>
          <v-text-field
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Search to-do..."
          />
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-list-item-group>
          <todo
            v-for="(todo, index) in paginate"
            :key="index"
            :description="todo.description"
            :completed="todo.completed"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </v-list-item-group>
        <v-pagination
          color="yellow darken-4"
          class="mt-5 "
          v-model="currentPage"
          :length="totalPages"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
    <br />
  </div>
</template>

<script>
import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
export default {
  data() {
    return {
      search: "",
      todos: [
        { description: "Do the dishes", completed: false },
        { description: "Take out the trash", completed: false },
        { description: "Finish doing laundry", completed: false },
      ],
      currentPage: 1,
      itemsPerPage: 3,
      resultCount: 1,
    };
  },
  methods: {
    addTodo(newTodo) {
      this.todos.push({ description: newTodo, completed: false });
    },
    toggleTodo(todo) {
      todo.completed = !todo.completed;
    },
    deleteTodo(deletedTodo) {
      this.todos = this.todos.filter((todo) => todo !== deletedTodo);
    },
    editTodo(todo, newTodoDescription) {
      todo.description = newTodoDescription;
    }
  },
  components: { Todo, CreateTodo },
  computed: {
    filteredTodoList: function() {
      var self = this;
      return this.todos.filter(function(todo) {
        return (
          todo.description.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        );
      });
    },
    totalPages: function() {
      return Math.ceil(this.filteredTodoList.length / this.itemsPerPage);
    },
    paginate: function() {
      var index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.filteredTodoList.slice(index, index + this.itemsPerPage);
    },
  },
};
</script>
