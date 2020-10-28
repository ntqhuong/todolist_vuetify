<template>
<v-card>

  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My Students</v-toolbar-title>
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
            <v-btn color="warning" dark class="mb-2" v-bind="attrs" v-on="on">
              New Item
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
                      v-model="editedItem.ten"
                      label="Tên"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.lop"
                      label="Lớp"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.mssv"
                      label="Mssv"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.sdt"
                      label="Số điện thoại"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.ns"
                      label="Ngày sinh"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.k"
                      label="Khóa"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue"  @click="save">
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
              <v-btn color="secondary" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue" @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
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
    search: '',
    headers: [
      {
        text: "Tên",
        align: "start",
       
        value: "ten"
      },
      { text: "Lớp", value: "lop" },
      { text: "MSSV", value: "mssv" },
      { text: "Số ĐT", value: "sdt" },
      { text: "Ngày sinh", value: "ns" },
      { text: "Khóa", value: "k" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      ten: "",
      lop: 0,
      mssv: 0,
      sdt: 0,
      ns: 0,
      k: 0
    },
    defaultItem: {
      ten: "",
      lop: 0,
      mssv: 0,
      sdt: 0,
      ns: 0,
      k: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          ten: "Hiddleston",
          lop: 1,
          mssv: 62131,
          sdt: 2543454,
          ns: 15 / 2 / 2002,
          k: 2018
        },
        {
          ten: "Elizabeth",
          lop: 2,
          mssv: 54645,
          sdt: 120142,
          ns: 15 / 2 / 2002,
          k: 2018
        },
        {
          ten: "Emily",
          lop: 3,
          mssv: 34556,
          sdt: 54645,
          ns: 4.0,
          k: 2020
        },
        {
          ten: "Emma",
          lop: 4,
          mssv: 3245687,
          sdt: 167505,
          ns: 4.0,
          k: 2011
        },
        {
          ten: "Jessica",
          lop: 5,
          mssv: 24045,
          sdt: 542,
          ns: 245452,
          k: 1
        },
        {
          ten: "Jennifer",
          lop: 7,
          mssv: 74564,
          sdt: 244512,
          ns: 456,
          k: 452345
        },
        {
          ten: "Laura",
          lop: 8,
          mssv: 78654,
          sdt: 54645,
          ns: 321312,
          k: 56654
        },
        {
          ten: "Linda",
          lop: 5,
          mssv: 54353,
          sdt: 13424,
          ns: 324,
          k: 36546
        },
        {
          ten: "Rebecca",
          lop: 4,
          mssv: 86856,
          sdt: 643634,
          ns: 234,
          k: 765756
        },
        {
          ten: "Maria",
          lop: 10,
          mssv: 845,
          sdt: 5645645,
          ns: 546,
          k: 54353
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style >
.v-main__wrap {

    margin: 100px;
    margin-top: 40px;

}
.theme--light.v-data-table {
    background-color: rgb(248, 227, 200);
}
.v-toolbar__content, .v-toolbar__extension {
    background-color: indianred;
    border-radius: 5px;
}
.v-input--hide-details > .v-input__control > .v-input__slot {
    width: 95%;
    margin-bottom: 8px;
}
</style>