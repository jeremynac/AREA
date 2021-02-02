<template>
    <body>
      <b-row class="mx-0"> 
        <b-col cols="3">
          <filters-view v-on:onChange="onChange" v-on:onApply="launchSearch"/>
        </b-col>
        <div class="vertical_divider">
        </div>
        <b-col class="mx-auto" cols="8">
          <room-list-display v-bind:results="rooms" v-bind:date="chosen_date" />
        </b-col>
      </b-row>
    </body>
</template>

<script>
import FiltersView from 'src/components/Filters/FiltersView.vue'
import RoomListDisplay from 'src/components/RoomDisplay/RoomListDisplay.vue'
export default {
    name: "SearchView",
    data() {
      return {
        filter_obj: {},
        chosen_date: {},
        equipments: [],
        rooms: []
      }
    },
    components: { 
      FiltersView,
      RoomListDisplay
    },
    mounted() {
      this.launchSearch()
    },
    methods: {
      onChange(filter_category, value) {
        this.filter_obj[filter_category] = value
        if (filter_category === "date") {
          this.chosen_date = value;
        }
      },
      async launchSearch() {
        await this.axios
          .post(process.env.VUE_APP_SERVER_URL + '/' + process.env.VUE_APP_SEARCH_PATH, {filters: this.filter_obj})
          .then( res => {this.rooms = res.data.rooms})
          .catch(e => console.log(e))
      }
    }
}
</script>
<style scoped>
.vertical_divider {
    margin-top: 20px;
    border-right: 1px solid black;
}
</style>