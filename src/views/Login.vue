<template>
  <div @keyup.enter="login">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-form
          label-position="left"
          label-width="200px"
          :model="registerForm"
        >
          <el-form-item label="Email">
            <el-input type="email" v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              type="password"
              v-model="registerForm.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="10">
        <el-button type="primary" @click="login">Login</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index.js";

import { LOGIN } from "../api";
export default {
  name: "Login",
  data() {
    return {
      registerForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`http://127.0.0.1:5000${LOGIN}`, {
          email: this.registerForm.email,
          password: this.registerForm.password,
        })
        .then((response) => {
          this.$store.state.user = response.data.access_token;
          this.$store.state.user_level = response.data.user_level;
          router.push({ name: "Workspaces" });
          this.$notify({
            title: 'Logged In',
            message: 'Logged In successfully.',
            type: 'success'
          });
        })
        .catch((err) => {
          console.log(err);
          this.$notify({
            title: 'Invalid credentials.',
            message: 'Invalid email or password.',
            type: 'error'
          });
        });
    },
  },
};
</script>
