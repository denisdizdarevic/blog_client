<template>
  <v-sheet class="pa-4">
    <h2 class="text-center">Post Filter</h2>
    <v-combobox
      label="Tags"
      multiple
      small-chips
      :items="tags"
      v-model="query.tag"
    ></v-combobox>
    <v-combobox
      label="Author"
      :items="authors"
      item-text="name"
      item-value="value"
      v-model="query.author"
    ></v-combobox>
    <v-text-field label="Title" v-model="query.title" />
    <v-text-field label="Description" v-model="query.description" />
    <v-dialog
      ref="lte_dialog"
      v-model="lte_modal"
      :return-value.sync="query.timestamp_created__date__lte"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="query.timestamp_created__date__lte"
          label="Posts before Date"
          :prepend-icon="mdiGreaterThanOrEqual"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="query.timestamp_created__date__lte" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="$refs.lte_dialog.save()"
          >Clear</v-btn
        >
        <v-btn text color="primary" @click="lte_modal = false">Cancel</v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.lte_dialog.save(query.timestamp_created__date__lte)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
    <v-dialog
      ref="gte_dialog"
      v-model="gte_modal"
      :return-value.sync="query.timestamp_created__date__gte"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="query.timestamp_created__date__gte"
          label="Posts after Date"
          :prepend-icon="mdiLessThanOrEqual"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="query.timestamp_created__date__gte" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="$refs.gte_dialog.save()"
          >Clear</v-btn
        >
        <v-btn text color="primary" @click="gte_modal = false">Cancel</v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.gte_dialog.save(query.timestamp_created__date__gte)"
          >OK</v-btn
        >
      </v-date-picker>
    </v-dialog>
    <v-row justify="space-around" class="my-2">
      <v-btn @click="clearClicked">Clear</v-btn>
      <v-btn @click="searchClicked">Search</v-btn>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapState } from "vuex";
import { mdiLessThanOrEqual, mdiGreaterThanOrEqual } from "@mdi/js";
import { authorName } from "@/util";

export default {
  name: "SideBar",
  data: () => ({
    query: {
      tag: [],
      author: null,
      title: null,
      description: null,
      timestamp_created__date__lte: null,
      timestamp_created__date__gte: null,
    },
    mdiLessThanOrEqual,
    mdiGreaterThanOrEqual,
    lte_modal: false,
    gte_modal: false,
  }),
  async mounted() {
    await this.loadQueryFromRoute();
  },
  watch: {
    $route: async function () {
      await this.loadQueryFromRoute();
    },
  },
  computed: {
    authors() {
      let authors = [];
      for (const author of this.$store.state.authors) {
        authors.push({
          name: authorName(author),
          value: author.id,
        });
      }
      return authors;
    },
    ...mapState(["tags"]),
  },
  methods: {
    async loadQueryFromRoute() {
      await this.$store.dispatch("loadFilterData");
      let query = {
        title: this.$route.query.title,
        description: this.$route.query.description,
        timestamp_created__date__lte:
          this.$route.query.timestamp_created__date__lte,
        titimestamp_created__date__gtetle:
          this.$route.query.timestamp_created__date__gte,
        tag: this.$route.query.tag,
      };
      if (this.$route.query.author) {
        query.author = this.authors.find(
          (author) => author.value === parseInt(this.$route.query.author)
        );
      }
      if (this.$route.query.tag) {
        if (typeof this.$route.query.tag == "string") {
          query.tag = [this.$route.query.tag];
        } else {
          query.tag = this.$route.query.tag;
        }
      }
      console.log(query);
      this.query = query;
    },
    async searchClicked() {
      let simplified_query = {};
      for (const [key, value] of Object.entries(this.query)) {
        if (value) {
          if (value.value) {
            simplified_query[key] = value.value;
          } else {
            simplified_query[key] = value;
          }
        }
      }
      await this.$router.push({ query: simplified_query });
    },
    async clearClicked() {
      this.query = {
        tag: [],
        author: null,
        title: null,
        description: null,
        timestamp_created__date__lte: null,
        timestamp_created__date__gte: null,
      };
      await this.$router.push({ query: {} });
    },
  },
};
</script>
