<template>
      <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-card key="itsMe" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ me.email }}</span>
          </div>
          <el-row>
            <el-col :span="24">
              <div class="text item">
                <span class="label">Member Since: </span><span>{{formatTime(me.created_at)}}</span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
import axios from 'axios';
import {ME} from '../api'
import moment from 'moment'
export default {
  name: "Me",
  components: {},
  data() {
    return {
      me: ''
    }
  },
  methods: {
    formatTime(time){
      return moment(time).format('YYYY.MM.DD')
    }
  },
  mounted(){
    axios
      .get(`http://127.0.0.1:5000${ME}`)
      .then((response) => {
        this.me = response.data
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.label {
  font-weight: bold;
  margin-right: 10px;
}
</style>