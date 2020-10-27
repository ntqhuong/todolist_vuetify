<template>
  <v-form @submit.prevent="addTodo()">
    <v-text-field
      v-model="newTodo"
      type="text"
      class="form-control"
      placeholder="Create a new to-do..."
    />
    <v-btn dark type="submit" color="yellow darken-4" elevation="1" x-small class="mt-0"
      >Add new todo</v-btn
    >
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.length > 0) {
        this.$emit("on-new-todo", this.newTodo);
      }
      this.newTodo = "";
    },
  },
};
</script>

<style>
button {
  float: right;
  margin-top: 10px;
  border: 0.5px solid #b5c7da;
  border-radius: 5px;
  background-color: #fff;
}
</style>
