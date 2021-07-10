<template>
  <v-card tile elevation="0">
    <div class="subtitle-2 pt-2 pl-4">
      {{ new Date(post.timestamp_created).toLocaleDateString() }}
    </div>
    <v-card-title class="pt-0">
      {{ post.title }}
    </v-card-title>
    <v-card-text>
      {{ post.description }}
    </v-card-text>
    <v-subheader> Author: {{ authorName }} </v-subheader>
    <v-chip
      link
      label
      class="ma-2 mr-0"
      v-for="tag in post.tags"
      :key="tag"
      @click="tagClicked(tag)"
    >
      {{ tag }}
    </v-chip>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",
  props: ["post"],
  computed: {
    authorName() {
      if (this.post.author.first_name || this.post.author.last_name) {
        return `${this.post.author.first_name} ${this.post.author.last_name}`;
      } else {
        return this.post.author.username;
      }
    },
  },
  methods: {
    async tagClicked(tag) {
      await this.$router.push({ query: { tags__name: tag } });
    },
  },
};
</script>
