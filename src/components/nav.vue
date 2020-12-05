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
      <el-menu-item index="Reservations">Reservations</el-menu-item>
      <el-menu-item index="Login">Login</el-menu-item>
      <el-menu-item index="Register">Register</el-menu-item>
      <el-menu-item index="Logout">Log out</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import router from "../router/index.js";

export default {
  name: "Nav",
  data() {
    return {
      activeIndex: "",
    };
  },
  methods: {
    handleSelect(key) {
      if (router.app._route.name != key) router.push({ name: key });
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
</style>
