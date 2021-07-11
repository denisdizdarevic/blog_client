import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: new OpenAPIClientAxios({
      definition: "http://127.0.0.1:8000/openapi",
    }).init(),
    posts: [],
    postCount: 0,
    postsPerPage: 10,
    apiError: false,
    tags: [],
    authors: [],
  },
  mutations: {
    setPostsAndCount(state, { count, posts }) {
      state.postCount = count;
      state.posts = posts;
    },
    apiError(state) {
      state.apiError = true;
    },
    setFilterData(state, { tags, authors }) {
      state.tags = tags;
      state.authors = authors;
    },
  },
  actions: {
    async loadFilterData({ commit, state }) {
      try {
        let api = await state.api;
        let response_tags = await api.listTags();
        let response_authors = await api.listUsers();
        commit("setFilterData", {
          tags: response_tags.data,
          authors: response_authors.data.results,
        });
      } catch {
        commit("apiError");
      }
    },
    async loadPosts({ commit, state }, filter) {
      try {
        let api = await state.api;
        let response = await api.listPosts(filter);
        commit("setPostsAndCount", {
          count: response.data.count,
          posts: response.data.results,
        });
      } catch {
        commit("apiError");
      }
    },
  },
});

import { OpenAPIClientAxios } from "openapi-client-axios";
