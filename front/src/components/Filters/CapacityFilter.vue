<template>
  <body class="filter_style">
    <p class="title_style">
      Room capacity
    </p>
    <div class="px-3">
      <b-form-input :type="'number'" v-model="capacity" @change="onChange"></b-form-input>
    </div>
  </body>
</template>

<script>
export default {
  name: "CapacityFilter",
  data() {
    return {
      capacity: 1
    }
  },
  methods: {
    onChange() {
        this.$emit('onChange', 'capacity', this.capacity)
      },
  }
}
</script>

<style scoped>
  .filter_style {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .title_style {
    font-weight: bold;
  }
</style>