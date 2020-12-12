<template>
  <div class="home">
    <el-dialog title="Add Workspace" :visible.sync="dialogVisible" :show-close="false"  width="40%">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form label-position="left" label-width="200px" :model="registerForm">
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">Cancel</el-button>
        <el-button type="primary" @click="addWorkSpace">Confirm</el-button>
      </span>
    </el-dialog>
    <el-row type="flex" justify="end">
      <el-col :span="10">
        <el-button type="primary" @click="dialogVisible = true" v-if="isAdmin">Add Workspace</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="10">
        <el-card v-for="(space, index) in workspaces" :key="space.name" class="box-card">
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
              <el-image style="width: 200px; height: 200px" src="class_room.png" fit="scale-down"></el-image>
            </el-col>
          </el-row>
          <el-row type="flex" justify="end">
            <el-col :span="12">
              <el-button v-if="isAdmin" @click="publish(index)" :type="space.is_publish ? 'danger' : 'success'">
                {{space.is_publish ? 'Unpublish' : 'Publish'}}</el-button>
              <el-button v-if="isAdmin" @click="edit(index)">Edit</el-button>
              <el-button @click="openReservation(index)">Show Reservations</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="`${reservationTo} Reservations`" :show-close="false"  :visible.sync="showReservations" width="50%" :before-close="eraseComputedEvents">
      <vue-cal style="height: 250px" hide-weekends :events="computedEvents.concat(addEvent)" :time-from="16*60" :time-to="21*60"
        hide-view-selector active-view="week" :disable-views="['day', 'month', 'year']" @cell-click="createEvent" />
      <span slot="footer" class="dialog-footer">
        <el-button type="success" v-if="isLoggedIn" @click="confirmReservation" :disabled="addEvent.length<1">Confirm reservation</el-button>
        <el-button type="primary" @click="showReservations = false">Close</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import VueCal from 'vue-cal'
import moment from 'moment';
import 'vue-cal/dist/vuecal.css'
import { CREATE_WORKSPACE, GET_WORKSPACES, PUBLISH_WORKSPACE, CREATE_RESERVATION, GET_RESERVATIONS } from "../api";
export default {
  name: "Workspaces",
  components: {VueCal},
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
      showReservations: false, 
      reservationTo: '',
      reservationToId: null,
      showEventCreationDialog: false,
      events: [],
      computedEvents: [],
      addEvent: [],
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
    confirmReservation() {
      let reservation ={
        start_time: this.addEvent[0].start,
        end_time: this.addEvent[this.addEvent.length-1].end,
        classroom_id: this.reservationToId
      }
      axios
        .post(`http://127.0.0.1:5000${CREATE_RESERVATION}`, reservation)
        .then((response) => {
          console.log(response);
          this.$notify({
            title: 'Reservation Created',
            message: 'Reservation created successfully.',
            type: 'success'
          });
          this.showReservations = false
          this.addEvent = []
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createEvent(event) {
      if (this.$store.state.user == null) {
        return
      }
        let day = new Date(event)
        let _event = {
          start: moment(day).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DD HH:') + '00',
          end: moment(day).minutes(0).seconds(0).milliseconds(0).add(1, 'hour').format('YYYY-MM-DD HH:') + '00',
          title: this.reservationTo
        }
        this.addEvent.push(_event)
    },
    edit(index) {
      this.registerForm = this.workspaces[index];
      this.dialogVisible = true;
    },
    eraseComputedEvents() {
      this.computedEvents = []
    },
    openReservation(index) {
      console.log('open' , index)
      this.reservationTo = this.workspaces[index].name
      this.reservationToId = this.workspaces[index].id
      this.computedEvents = []
      this.events.forEach(x => {
        if (x.title == this.reservationToId || x.title == this.reservationTo) {
          x.title = this.reservationTo
          this.computedEvents.push(x)
        }
      })
      this.showReservations = true
    },
    publish(index) {
      this.workspaces[index].is_publish = !this.workspaces[index].is_publish
      let id = this.workspaces[index].id
      let url = PUBLISH_WORKSPACE.replace('<int:workspace_id>', id)
      if (this.workspaces[index].is_publish) {
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
    axios
      .get(`http://127.0.0.1:5000${GET_RESERVATIONS}`)
      .then((response) => {
        this.events = response.data.data.map(x => {
          return {
            title: x.classroom_id,
            start: moment(new Date(x.start_time.replace('T',' '))).subtract(2, 'hour').format('YYYY-MM-DD HH:')+ '00',
            end: moment(new Date(x.end_time.replace('T', ' '))).subtract(2, 'hour').format('YYYY-MM-DD HH:')+ '00'
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    isAdmin(){
      return this.$store.state.user_level >= 100;
    },
    isLoggedIn(){
      return this.$store.state.user != null;
    },
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
