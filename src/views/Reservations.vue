<template>
  <el-row type="flex" justify="center">
    <el-col :span="10">
      <el-table v-if="tableDataLoaded && workspacesLoaded" :data="tableData" empty-text="No incoming reservations.">
        <el-table-column prop="start_time" label="Date" :formatter="formatTime">
        </el-table-column>
        <el-table-column label="Duration" :formatter="getDuration">
        </el-table-column>
        <el-table-column label="Workspace" :formatter="getWorkspace">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import {MY_RESERVATIONS, GET_WORKSPACES} from '../api'
import moment from 'moment'
export default {
  name: "Reservations",
  components: {},
  data() {
    return {
      tableData: '',
      tableDataLoaded: false,
      workspaces: '',
      workspacesLoaded: false
    }
  },
methods: {
  formatTime(time){
   return moment(new Date(time.start_time.replace('T',' '))).subtract(2, 'hour').format('YYYY-MM-DD HH:')+ '00'
  },
  getDuration(time){
    return moment(time.end_time).diff(moment(time.start_time), 'hours') + ' Hours'
  },
  getWorkspace(reservation){
    return this.workspaces.map(x => {
      if(reservation.classroom_id == x.id) {
        console.log(x)
        return x.name
      }
    })
  }
},
  mounted(){
    axios
      .get(`http://127.0.0.1:5000${MY_RESERVATIONS}`)
      .then((response) => {
          this.tableData = response.data.data
          this.tableDataLoaded = true
      })
      .catch((err) => {
        console.log(err);
      });
      axios
      .get(`http://127.0.0.1:5000${GET_WORKSPACES}`)
      .then((response) => {
        console.log(response);
        this.workspaces = response.data.data;
        this.workspacesLoaded = true
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>
