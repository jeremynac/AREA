<template>
  <body class="filter_style">
    <p class="title_style">
          When do you need it?
    </p>
    <div class="px-3">
      From: 
      <b-form-datepicker
        v-model="date.start"
        today-button
        reset-button
        close-button
        locale="fr"
        :min="min"
        :max="max"
        @input="onChange"
        size="lg"
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        placeholder="start date"
      ></b-form-datepicker>
      <div class="h2 mb-0 text-center">
        <b-icon-arrow-down />
      </div>
      To:
      <b-form-datepicker
        v-model="date.end"
        today-button
        reset-button
        close-button
        locale="fr"
        :min="min"
        :max="max"
        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
        @input="onChange"
        size="lg"
        
        placeholder="end date"
      ></b-form-datepicker>
    </div>
  </body>
</template>

<script>
  export default {
      name: "DateFilter",
      data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const maxDate = new Date(today)
        maxDate.setMonth(maxDate.getMonth() + 1)
        return {
          date: {start: '', end: ''},
          min: today,
          max: maxDate,
          prices: this.items,
          selected: []
        }
    },
    methods: {
      onChange() {
        console.log("date change")
        this.$emit('onChange', 'date', this.date)
      }
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