import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Browse from "@/views/Browse";
import SideBar from "@/components/SideBar";
import Post from "@/views/Post";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/browse",
    name: "Browse",
    components: {
      default: Browse,
      navbar: SideBar,
    },
  },
  {
    path: "/post/:post_id",
    name: "Post",
    component: Post,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
