<template>
  <div>
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
          <el-form-item label="Confirm Password">
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="10">
        <el-button type="primary" @click="register">Register</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { REGISTER } from "../api";

export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        emai: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    register() {
      if (this.registerForm.password === this.registerForm.confirmPassword) {
        axios
          .post(`http://127.0.0.1:5000${REGISTER}`, {
            email: this.registerForm.email,
            password: this.registerForm.password,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
