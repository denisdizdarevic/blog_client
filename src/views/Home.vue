<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet>
          <hello-world />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: "Home",

  components: {
    HelloWorld,
  },
};
</script>
