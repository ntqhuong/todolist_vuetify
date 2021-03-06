<template>
  <v-card class="col-12">
    <v-data-table
      :headers="headers"
      :items="todos"
      :search="search"
      :sort-by="['title']"
      class="elevation-2"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      @page-count="pageCount = $event"
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
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>

                    <template>
                      <v-col cols="12" sm="6" md="4">
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="datePicker"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.date"
                              label="Todo Date"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="editedItem.date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(editedItem.date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                    </template>
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
      <template v-slot:item.title="{ item }">
        <v-list-item-content>
          <v-list-item-title
            class="todo-title"
            @click="toggleTodo(item)"
            :class="{
              done: item.completed,
            }"
            >{{ item.title }}</v-list-item-title
          >
          <v-list-item-subtitle class="todoDay"
            >Added on: {{ item.date }}</v-list-item-subtitle
          >
        </v-list-item-content>
      </template>
      <template v-slot:item.description="{ item }">
        <v-list-item-content class="todo-desc">
          {{item.description}}
        </v-list-item-content>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="blue darken-1" small class="mr-2" @click="editItem(item)">
          <b>Edit</b>
        </v-btn>
        <v-btn color="red" small @click="deleteItem(item)">
          <b>Delete</b>
        </v-btn>
      </template>
    </v-data-table>

    <!-- PAGINATION -->
    <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <v-text-field
        class="itemsPerPage"
        :value="itemsPerPage"
        label="Todos per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    search: "",
    headers: [
      { text: "Title", align: "start", value: "title" },
      { text: "Description", align: "start", value: "description", sortable: false },
      { text: "Actions", value: "actions", sortable: false },
    ],
    todos: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      description: "",
      date: "",
      completed: false,
    },
    defaultItem: {
      title: "",
      description: "",
      date: "",
      completed: false,
    },
    datePicker: new Date().toISOString().substr(0, 10),
    modal: false,
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
          title: "Do the dishes",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          date: this.datePicker,
          completed: false,
        },
        {
          title: "Take out the trash",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          date: this.datePicker,
          completed: false,
        },
        {
          title: "Finish doing laundry",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
          date: this.datePicker,
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
.todo-title {
  cursor: pointer;
  display: block;
  width: 200px;
}
.todoDay {
  font-size: 12px;
  color: rgb(197, 187, 187);
}
.itemsPerPage {
  width: 20%;
  margin-left: 80%;
  margin-top: -45px;
}
.todo-desc {
  display: block;
  width: 500px;
}
</style>
