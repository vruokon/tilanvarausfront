<template>
  <div class="home">from here you can make reservations</div>
</template>

<script>
import axios from 'axios';
import {ME} from '../api'
export default {
  name: "Reservations",
  components: {},
  mounted(){
    axios
      .get(`http://127.0.0.1:5000${ME}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
</script>
