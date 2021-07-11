import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const SCHEMA_URL = "/openapi";

export default new Vuex.Store({
  state: {
    api: new OpenAPIClientAxios({
      definition: SCHEMA_URL,
    }).init(),
    loggedIn: false,
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
    apiError(state, error) {
      console.error(error);
      state.apiError = true;
    },
    setFilterData(state, { tags, authors }) {
      state.tags = tags;
      state.authors = authors;
    },
    setApi(state, { api, loggedIn }) {
      state.loggedIn = loggedIn;
      state.api = api;
    },
  },
  actions: {
    logIn({ commit }, { username, password }) {
      commit("setApi", {
        api: new OpenAPIClientAxios({
          definition: SCHEMA_URL,
          axiosConfigDefaults: {
            withCredentials: true,
            auth: {
              username,
              password,
            },
          },
        }).init(),
        loggedIn: true,
      });
    },
    logOut({ commit }) {
      commit("setApi", {
        api: new OpenAPIClientAxios({
          definition: SCHEMA_URL,
        }).init(),
        loggedIn: false,
      });
    },
    async loadFilterData({ commit, state }) {
      try {
        let api = await state.api;
        let response_tags = await api.listTags();
        let response_authors = await api.listUsers();
        commit("setFilterData", {
          tags: response_tags.data,
          authors: response_authors.data.results,
        });
      } catch (error) {
        commit("apiError", error);
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
      } catch (error) {
        commit("apiError", error);
      }
    },
  },
});

import { OpenAPIClientAxios } from "openapi-client-axios";
