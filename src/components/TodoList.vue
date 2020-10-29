<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="desserts"
      @click="toggleTodo(desserts)"
      :search="search"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Todo List</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider> 
          <v-dialog v-model="dialog" max-width="500px">
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

            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn color="red" small class="mr-2" @click="editItem(item)">
          Edit
        </v-btn>
        <v-btn color="success" small @click="deleteItem(item)">
          Delete
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
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
    desserts: [],
    editedIndex: -1,
    editedItem: {
      description: "",
    },
    defaultItem: {
      description: "",
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
      this.desserts = [
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
 
  },
};
</script>

<style lang="sass">
.v-main__wrap
  margin: 100px
  margin-top: 40px
.theme--light
  &.v-data-table
    background-color: rgb(248, 227, 200)
.v-toolbar__content, .v-toolbar__extension
  background-color: indianred
  border-radius: 5px
.v-input--hide-details
  & > .v-input__control
    & > .v-input__slot
      width: 95%
      margin-bottom: 8px
</style>