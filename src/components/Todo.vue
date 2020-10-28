<template>
  <v-list-item>
    <v-btn dark
      class="flex-grow-1 text-left mr-5"
      :class="{ completed }"
      @click="$emit('on-toggle')"
      v-if="!isEditing"
      color="yellow darken-4"
      small
    >
      <v-list-item-title>{{ description }}</v-list-item-title>
    </v-btn>
    <v-form v-else class="flex-grow-1" @submit.prevent="finishEditing()">
      <v-text-field
        type="text"
        class="form-control"
        v-model="newTodoDescription"
        @blur="finishEditing()"
        ref="newTodo"
      />
    </v-form>
    <v-btn dark
      class="mr-5"
      @click="startEditing()"
      fab
      ripple
      small
      color="yellow darken-4"
    >
      <v-icon>mdi-border-color</v-icon>
    </v-btn>
    <v-btn dark @click="$emit('on-delete')" fab ripple small color="red">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-list-item>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      newTodoDescription: "",
    };
  },
  props: {
    description: String,
    completed: Boolean,
  },
  methods: {
    startEditing() {
      if (this.isEditing) {
        this.finishEditing();
      } else {
        this.newTodoDescription = this.description;
        this.isEditing = true;
        this.$nextTick(() => this.$refs.newTodo.focus());
      }
    },
    finishEditing() {
      this.isEditing = false;
      this.$emit("on-edit", this.newTodoDescription);
    },
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
