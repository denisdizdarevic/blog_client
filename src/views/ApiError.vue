<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="9" md="6">
        <v-alert type="error">
          Error detected, please refresh the page!
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ApiError",
};
</script>

<style scoped></style>
