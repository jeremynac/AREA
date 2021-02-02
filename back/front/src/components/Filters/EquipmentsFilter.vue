<template>
  <body>
      <div id="equipment-filter" class='equipment_filter_style'>
        <p class="title_style">
          Equipments
        </p>
        <div class="px-3">
          <b-row>
            <b-col cols="12" sm="6" v-for="item in equipments" v-bind:key="item.name">
              <div>
              <b-form-checkbox @change="onChange(item)" v-model="item.checked"> 
                {{item.name}}
              </b-form-checkbox>
              </div>
            </b-col>
          </b-row>  
        </div>
      </div>
  </body>
</template>

<script>
export default {
    name: "EquipmentFilter",
    props: {
      available_equipments: Array,
    },
    data() {
      return {
        equipments: [],
        selected: []
      }
    },
    methods: {
      onChange(item) {
        var index = this.equipments.findIndex(i => i.name === item.name);
        if (item.checked) {
          this.selected.push(item.name)
        } else {
          var index_selected = this.selected.findIndex(i => i === item.name);
          this.selected.splice(index_selected, 1)
        }
        //this.equipments[index].checked = !this.equipments[index].checked
        console.log(JSON.stringify(this.equipments), JSON.stringify(this.selected), index, !this.equipments[index].checked)
        this.$emit('onChange', 'equipments', this.selected)
      },
      init_eq_array(available_equipments) {
        this.equipments = available_equipments.map(
          eq => {
              if (eq) {
                  console.log()
                  return {name: eq.name, checked: false}
              }
          }
        )
      }
    }
}
</script>
<style scoped>
  .equipment_filter_style {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .title_style {
    font-weight: bold;
  }
</style>