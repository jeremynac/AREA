<template>
      <b-container fluid>
        <b-card
            v-bind:title="room.name"
            v-bind:img-src="room.img || img_default"
            img-alt="Image"
            img-top
          >
            <b-card-text>
              {{this.room.description}}
            </b-card-text>
        </b-card>
        <p class="font-weight-bold mt-3">
          Capacity: {{room.capacity}}
        </p>
        <p class="font-weight-bold">
          Equipments in this room:
        </p>
        <b-list-group v-for="item in room.equipments" v-bind:key="item._id">
          <b-list-group-item>{{item.name}}</b-list-group-item>
        </b-list-group>
        <date-filter v-on:onChange="changeDate" />
      </b-container>
</template>

<script>
import {room_details_default} from 'src/data/room_data'
import {room_img_default} from 'src/data/img_data'
import DateFilter from '../Filters/DateFilter.vue'
export default {
    name: "RoomView",
    components: {
      DateFilter
    },
    props: {
      date: Object,
      roomID: String
    },
    data() {
      return {
        room: room_details_default,
        reservation_date: this.date,
        img_default: room_img_default
      }
    },
    mounted() {
      this.getroomData()
    },
    methods: {
        async getdefaultDate() {
          const now = new Date()
          const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          const maxDate = new Date(today)
          maxDate.setMonth(maxDate.getMonth() + 1)
          this.reservation_date = {start: now, end: maxDate}
        },
        async getroomData() {
            try{
              await this.axios
                .get(process.env.VUE_APP_SERVER_URL + '/' + process.env.VUE_APP_ROOM_PATH + "?roomID=" + this.roomID)
                .then( res => {this.room = res.data.room})
                .catch(e => console.log(e))
            } catch{
                console.log("error")
            }
        },
        async addReservation() {
          try{
              console.log({start_time: this.reservation_date.start, end_time: this.reservation_date.end, roomID: this.roomID})
              await this.axios
                .post(process.env.VUE_APP_SERVER_URL + '/' + process.env.VUE_APP_ADD_RESERVATION_PATH, {start_time: this.reservation_date.start, end_time: this.reservation_date.end, roomID: this.roomID})
                .then( res => console.log(res))
                .catch(e => console.log(e))
            } catch{
                console.log("error")
            }
            this.$emit('onClose')
        },
        changeDate(category, value) {
          console.log(value)
          this.reservation_date = value
        },
        test(){

        }
    }
}
</script>

