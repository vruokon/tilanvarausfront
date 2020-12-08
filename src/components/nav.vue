<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->

    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="Workspaces">Workspaces</el-menu-item>
      <el-menu-item v-if="userLoggedIn" index="Reservations"
        >Reservations</el-menu-item
      >
      <el-menu-item v-if="!userLoggedIn" index="Login">Login</el-menu-item>
      <el-menu-item v-if="!userLoggedIn" index="Register"
        >Register</el-menu-item
      >
      <el-menu-item v-if="userLoggedIn" index="Logout">Log out</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import router from "../router/index.js";
import axios from "axios";
import { LOGOUT } from "../api";

export default {
  name: "Nav",
  data() {
    return {
      activeIndex: "",
    };
  },
  methods: {
    handleSelect(key) {
      if (router.app._route.name != key && key != "Logout")
        router.push({ name: key });
      else if (key == "Logout") {
        axios.defaults.headers.common = {
          Authorization: `Bearer ${this.$store.state.user}`,
        };

        axios
          .post(`http://127.0.0.1:5000${LOGOUT}`)
          .then((response) => {
            this.$store.state.user = null;
            console.log(response);
            this.$notify({
              title: "Logged out",
              message: "Logged out successfully",
              type: "success",
            });
            this.activeIndex = "Workspaces";
            router.push({ name: "Workspaces" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    userLoggedIn() {
      return this.$store.state.user !== null;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-menu-item {
  float: none;
}
</style>
