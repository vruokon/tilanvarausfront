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
            <el-input type="email" v-model="registerForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="registerForm.region"></el-input>
          </el-form-item>
          <el-form-item label="Confirm Password">
            <el-input type="password" v-model="registerForm.type"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="end">
      <el-col :span="10">
        <el-button type="primary">Register</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        name: "",
        region: "",
        type: "",
      },
    };
  },
};
</script>
