<template>
  <v-card class="col-12">
    <v-data-table
      :headers="headers"
      :items="todos"
      :search="search"
      sort-by="description"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Todo List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" light class="mb-2" v-bind="attrs" v-on="on">
                New Todo
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="red" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.description="{ item }">
          <v-chip
            color="white"
            class="todo-item"
            @click="toggleTodo(item)"
            :class="{
              done: item.completed,
            }"
          >
            {{ item.description }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="blue darken-1"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            <b>Edit</b>
          </v-btn>
          <v-btn color="red" small @click="deleteItem(item)">
            <b>Delete</b>
          </v-btn>
        </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "Description", align: "start", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    todos: [],
    editedIndex: -1,
    editedItem: {
      description: "",
      completed: false
    },
    defaultItem: {
      description: "",
      completed: false
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.todos = [
        {
          description: "Do the dishes",
          completed: false,
        },
        {
          description: "Take out the trash",
          completed: false,
        },
        {
          description: "Finish doing laundry",
          completed: false,
        },
      ];
    },
    toggleTodo(todo) {
      todo.completed = !todo.completed;
    },
    editItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.todos.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.todos[this.editedIndex], this.editedItem);
      } else {
        this.todos.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style lang="scss">
.v-main__wrap {
  margin: 100px;
  margin-top: 40px;
}
.theme--light {
  &.v-data-table {
    background-color: #fff;
  }
}
.v-toolbar__content,
.v-toolbar__extension {
  background-color: rgb(112, 147, 243);
  border-radius: 5px;
}
.v-input--hide-details {
  & > .v-input__control {
    & > .v-input__slot {
      width: 95%;
      margin-bottom: 8px;
    }
  }
}
.done {
  text-decoration: line-through;
}
.todo-item {
  cursor: pointer;
}
</style>
