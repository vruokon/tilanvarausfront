<template>
  <div class="home">
    <el-dialog title="Add Workspace" :visible.sync="dialogVisible" width="40%">
      <el-row type="flex" justify="center">
        <el-col :span="20">
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
              <el-input
                type="number"
                v-model="registerForm.capacity"
              ></el-input>
            </el-form-item>
            <el-form-item label="Equipment">
              <el-input type="text" v-model="registerForm.equipment"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">Cancel</el-button>
        <el-button type="primary" @click="addWorkSpace"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
    <el-row type="flex" justify="end">
      <el-col :span="10">
        <el-button type="primary" @click="dialogVisible = true"
        v-if="isAdmin"
          >Add Workspace</el-button
        >
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-card
          v-for="(space, index) in workspaces"
          :key="space.name"
          class="box-card"
        >
          <div slot="header" class="clearfix">
            <span>{{ space.name }}</span>
          </div>
          <el-row>
            <el-col :span="10">
              <div class="text item">
                <p><span class="label">Location:</span>{{ space.location }}</p>
                <p><span class="label">Type:</span>{{ space.type }}</p>
                <p><span class="label">Capacity:</span>{{ space.capacity }}</p>
                <p>
                  <span class="label">Equipment:</span>{{ space.equipment }}
                </p>
              </div>
            </el-col>
            <el-col :span="10">
              <el-image
                style="width: 200px; height: 200px"
                src="class_room.png"
                fit="scale-down"
              ></el-image>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end" v-if="isAdmin">
            <el-col :span="7">
              <el-button @click="publish(index)" :type="space.is_publish ? 'danger' : 'success'">{{space.is_publish ? 'Unpublish' : 'Publish'}}</el-button>
              <el-button @click="edit(index)">Edit</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { CREATE_WORKSPACE, GET_WORKSPACES, PUBLISH_WORKSPACE } from "../api";
export default {
  name: "Workspaces",
  components: {},
  data() {
    return {
      registerForm: {
        id: null,
        name: "",
        location: "",
        type: "",
        capacity: "",
        equipment: "",
      },
      dialogVisible: false,
      workspaces: null,
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
      axios
        .post(`http://127.0.0.1:5000${CREATE_WORKSPACE}`, workspace)
        .then((response) => {
          console.log(response);
          this.$notify({
          title: 'Workspace Created',
          message: 'Workspace created successfully.',
          type: 'success'
        });
        this.dialogVisible = false
        this.registerForm = {
          id: null,
        name: "",
        location: "",
        type: "",
        capacity: "",
        equipment: "",
        }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelAdd() {
      this.registerForm = {
        id: null,
        name: "",
        location: "",
        type: "",
        capacity: "",
        equipment: "",
      };
      this.dialogVisible = false;
    },
    edit(index) {
      this.registerForm = this.workspaces[index];
      this.dialogVisible = true;
    },
    publish(index){
      this.workspaces[index].is_publish = !this.workspaces[index].is_publish 
      let id = this.workspaces[index].id
      let url = PUBLISH_WORKSPACE.replace('<int:workspace_id>', id)
      if(this.workspaces[index].is_publish){
      axios
      .put(`http://127.0.0.1:5000${url}`)
      .then(() => {
        this.$notify({
          title: 'Published',
          message: 'Workspace published successfully.',
          type: 'success'
        });
      })
      .catch((err) => {
        console.log(err);
      });
      } else {
      axios
      .delete(`http://127.0.0.1:5000${url}`)
      .then(() => {
        this.$notify({
          title: 'Unpublished',
          message: 'Workspace unpublished successfully.',
          type: 'info'
        });
      })
      .catch((err) => {
        console.log(err);
      });
      }

    }
  },
  mounted() {
    if (this.$store.state.user) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${this.$store.state.user}`,
      };
    } else {
      axios.defaults.headers.common = {};
    }
    axios
      .get(`http://127.0.0.1:5000${GET_WORKSPACES}`)
      .then((response) => {
        console.log(response);
        this.workspaces = response.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    isAdmin(){
      return this.$store.state.user_level >= 100;
    }
  },
};
</script>
<style scoped>
.label {
  font-weight: bold;
  margin-right: 10px;
}
.el-card {
  margin-bottom: 30px;
}
</style>
