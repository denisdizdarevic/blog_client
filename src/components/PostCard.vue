<template>
  <v-card tile elevation="0">
    <v-card-title>
      {{ post.name }}
    </v-card-title>
    <v-card-text>
      {{ post.desc }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
};
</script>
