<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9" xl="6">
        <v-sheet class="pa-4">
          <div class="subtitle-2">
            {{ new Date(post.timestamp_created).toLocaleDateString() }}
          </div>
          <h1>
            {{ post.title }}
          </h1>
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
          <v-divider class="my-2" />
          <div v-html="content" />
          <v-divider class="my-2" />
          <v-container>
            <v-row align="center" justify="start">
              <v-col cols="auto">
                <div class="subtitle-1">
                  Author:
                  <v-chip link label class="ma-2" @click="clickAuthor()">{{
                    authorName
                  }}</v-chip>
                </div>
              </v-col>
              <v-divider vertical />
              <v-col cols="auto">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  :color="post.like_me ? 'blue' : 'pink'"
                  @click="clickLike"
                >
                  <v-icon dark v-if="!post.like_me"> {{ mdiThumbUp }} </v-icon>
                  <v-icon dark v-if="post.like_me"> {{ mdiThumbDown }} </v-icon>
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-chip>
                  {{ post.like_count }}
                </v-chip>
              </v-col>
              <v-divider vertical />
              <v-spacer />
              <v-col cols="auto">
                <v-btn @click="clickComment"> Comment </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
        <v-sheet
          class="mt-4 pa-4"
          v-for="comment in comments"
          :key="comment.id"
        >
          <div class="subtitle-2">
            {{ new Date(comment.timestamp).toLocaleDateString() }}
          </div>
          <div>{{ comment.content }}</div>
          <div class="subtitle-1">Author: {{ comment.author.username }}</div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="commentActive" max-width="600px">
      <v-sheet class="pa-4">
        <v-col class="text-center">
          <h2>New Comment</h2>
          <v-textarea outlined v-model="commentText" class="mt-4" />
          <v-btn
            :loading="processing"
            :disabled="processing"
            @click="postComment"
          >
            Post
          </v-btn>
        </v-col>
      </v-sheet>
    </v-dialog>
  </v-container>
</template>

<script>
import { authorName } from "@/util";
import { mdiThumbUp, mdiThumbDown } from "@mdi/js";

export default {
  name: "Post",
  data: () => ({
    post: {},
    content: "",
    comments: [],
    commentActive: false,
    commentText: "",
    processing: false,
    mdiThumbUp,
    mdiThumbDown,
  }),
  computed: {
    authorName() {
      if (this.post.author) {
        return authorName(this.post.author);
      }
      return "";
    },
  },
  watch: {
    "$store.state.loggedIn": async function () {
      await this.loadPost();
    },
  },
  async mounted() {
    await this.loadPost();
  },
  methods: {
    async loadPost() {
      try {
        let api = await this.$store.state.api;

        let post_response = await api.retrievePost({
          id: this.$route.params.post_id,
        });
        this.post = post_response.data;

        let content_response = await api.contentPost({
          id: this.$route.params.post_id,
        });
        this.content = content_response.data;
        let comment_response = await api.listPostComments({
          parent_lookup_post: this.$route.params.post_id,
        });
        this.comments = comment_response.data.results;
      } catch (error) {
        this.$store.commit("apiError", error);
      }
    },
    async clickLike() {
      try {
        if (this.$store.state.loggedIn) {
          let api = await this.$store.state.api;

          await api.likePost({
            id: this.$route.params.post_id,
          });
          await this.loadPost();
        } else {
          this.$emit("openLogin");
        }
      } catch (error) {
        this.$store.commit("apiError", error);
      }
    },
    clickComment() {
      if (this.$store.state.loggedIn) {
        this.commentActive = true;
      } else {
        this.$emit("openLogin");
      }
    },
    async postComment() {
      try {
        let api = await this.$store.state.api;

        await api.createPostComment(
          {
            parent_lookup_post: this.$route.params.post_id,
          },
          { content: this.commentText }
        );
        await this.loadPost();
        this.commentActive = false;
      } catch (error) {
        this.$store.commit("apiError", error);
      }
    },
    async clickAuthor() {
      await this.$router.push({
        path: "/browse",
        query: { author: this.post.author.id },
      });
    },
    async tagClicked(tag) {
      await this.$router.push({
        path: "/browse",
        query: { tag: [tag] },
      });
    },
  },
};
</script>

<style scoped></style>
