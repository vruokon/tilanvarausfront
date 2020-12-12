<template>
  <el-row type="flex" justify="center">
    <el-col :span="10">
      <el-table v-if="tableDataLoaded && workspacesLoaded" :data="tableData" empty-text="No incoming reservations.">
        <el-table-column prop="start_time" label="Date" :formatter="formatTime">
        </el-table-column>
        <el-table-column label="Duration" :formatter="calculateDuration">
        </el-table-column>
        <el-table-column label="Workspace" :formatter="findWorkspace">
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
          <el-button @click="cancelReservation(scope.row.id)">Cancel Reservation</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios';
import {
  MY_RESERVATIONS,
  GET_WORKSPACES,
  DELETE_RESERVATION,
} from '../api'
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
    formatTime(time) {
      return moment(new Date(time.start_time.replace('T', ' '))).subtract(2, 'hour').format('YYYY-MM-DD HH:') + '00'
    },
    calculateDuration(time) {
      return moment(time.end_time).diff(moment(time.start_time), 'hours') + ' Hours'
    },
    cancelReservation(delete_id) {
      axios
        .delete(`http://127.0.0.1:5000${DELETE_RESERVATION}/${delete_id}` )
        .then(() => {
          this.$notify({
              title: 'Canceled',
              message: 'Reservation canceled..',
              type: 'info'
            });
          this.getMyReservations()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findWorkspace(reservation) {
      return this.workspaces.map(x => {
        if (reservation.classroom_id == x.id) {
          console.log(x)
          return x.name
        }
      })
    },
    getWorkspaces() {
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
    },
    getMyReservations() {
      axios
        .get(`http://127.0.0.1:5000${MY_RESERVATIONS}`)
        .then((response) => {
          this.tableData = response.data.data
          this.tableDataLoaded = true
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getWorkspaces()
    this.getMyReservations()
  }
};
</script>
