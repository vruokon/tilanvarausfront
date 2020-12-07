<template>
  <div class="home">
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-form
          label-position="left"
          label-width="200px"
          :model="registerForm"
        >
          <el-form-item label="Workspace Name">
            <el-input type="text" v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Location">
            <el-input type="text" v-model="registerForm.location"></el-input>
          </el-form-item>
          <el-form-item label="Type">
            <el-input type="text" v-model="registerForm.type"></el-input>
          </el-form-item>
          <el-form-item label="Capacity">
            <el-input type="number" v-model="registerForm.capacity"></el-input>
          </el-form-item>
          <el-form-item label="Equipment">
            <el-input type="text" v-model="registerForm.equipment"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="10">
        <el-button type="primary" @click="addWorkSpace">Register</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { CREATE_WORKSPACE } from "../api";
export default {
  name: "Workspaces",
  components: {},
  data() {
    return {
      registerForm: {
        name: "",
        location: "",
        type: "",
        capacity: "",
        equipment: "",
      },
    };
  },
  methods: {
    addWorkSpace() {
      let workspace = {
        name: this.registerForm.name,
        location: this.registerForm.location,
        type: this.registerForm.type,
        capacity: this.registerForm.capacity,
        equipment: this.registerForm.equipment,
        reservation_time: "16-21",
      };
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.$store.state.user}`,
      };

      axios
        .post(`http://127.0.0.1:5000${CREATE_WORKSPACE}`, workspace)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
