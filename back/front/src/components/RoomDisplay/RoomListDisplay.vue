<template>
      <b-container fluid	class="mx-auto">
        <b-row class="mx-auto">
          <b-card-group class="col-md-4" v-for="(room, index) in results" :key="room._id">
          
            <b-card
                v-bind:title="room.name"
                v-bind:img-src="room.img || img_default"
                img-alt="Image"
                img-top
                class="my-3"
                footer-class="card_footer"
            >
              <div slot="footer">
                <b-button  class="mx-4" v-b-modal="room._id" variant="pink">Book</b-button>
              </div>
              <b-modal v-bind:id="room._id" :title="'Confirm your reservation'" @ok="(event)=>addReservation(event, index)" :ref="'modal' + index">
                <room-view v-bind:roomID="room._id" v-bind:date="date" :ref="'room' + index" v-on:onClose="closeModal(index)" />
              </b-modal>
            </b-card>
          </b-card-group>
        </b-row>
      </b-container>
</template>

<script>
import {room_img_default} from 'src/data/img_data'
import RoomView from './RoomView.vue'
export default {
  components: { RoomView },
    name: "RoomListDisplay",
    props: {
      results: {
        type: Array,
      },
      date: {
        type: Object
      }
    },
    data() {
      return {
        img_default: room_img_default
      }
    },
    methods: {
      addReservation(event, index) {
        event.preventDefault()
        console.log(index);
        this.$refs["room" + index][0].addReservation()
      },
      closeModal(index) {
        this.$refs['modal' + index][0].hide()
      }
    }
}
</script>

<style scoped>
.btn-pink {
    background-color: #d91a72;
    color: white;
}
.card-card_footer {
  background-color: red;
  color: red;
}
</style>

