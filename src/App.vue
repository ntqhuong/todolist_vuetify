<template>
  <v-app>
    <v-main>
      <v-theme-provider root light>
        <v-container>
          <v-row justify="center" class="ma-5">
            <v-col xs="12" sm="8">
              <v-card>
                <v-toolbar color="yellow darken-4" dark>
                  <v-toolbar-title class="headline">Todo App</v-toolbar-title>

                  <v-spacer></v-spacer>
                </v-toolbar>
              </v-card>
              <todo-list />
            </v-col>
          </v-row>
        </v-container>
      </v-theme-provider>
    </v-main>
  </v-app>
</template>

<script>
import TodoList from "./components/TodoList";
export default {
  name: "App",

  components: {
    TodoList,
  },
};
</script>
<style lang="scss">
  
</style>
