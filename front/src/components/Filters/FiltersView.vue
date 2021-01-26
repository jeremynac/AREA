<template>
    <b-container>
        <date-filter v-bind:available_equipments="equipments" v-on:onChange="onChange"/>
        <equipments-filter v-bind:available_equipments="equipments" v-on:onChange="onChange" ref="eq_filter"/>
        <capacity-filter v-on:onChange="onChange"/>
        <hr/>
        <b-button @click="onApply" variant="pink">
            Apply filters
        </b-button>
    </b-container>
</template>

<script>
import EquipmentsFilter from './EquipmentsFilter.vue'
import { available_equipments } from './choices_lists'
import CapacityFilter from './CapacityFilter.vue'
import DateFilter from './DateFilter.vue'
export default {
    name: "FiltersView",
    components: {
        CapacityFilter,
        EquipmentsFilter,
        DateFilter
    },
    data() {
        return {
            equipments: available_equipments
        }
    },
    created() {
        this.getEquipments()
    },
    methods: {
        async getEquipments() {
            await this.axios
                        .get(process.env.VUE_APP_SERVER_URL + '/' + process.env.VUE_APP_EQUIPMENTS_PATH)
                        .then(res=>{this.equipments = res.data.equipments})
                        .catch(e=>console.log(e))
            this.$refs.eq_filter.init_eq_array(this.equipments)
        },
        onChange(category, value) {
            this.$emit("onChange", category, value)
        },
        onApply() {
            this.$emit('onApply');
        }
    }
}
</script>
<style scoped>
    .btn-pink {
        background-color: #e83e8c;
        color: white;
    }
</style>