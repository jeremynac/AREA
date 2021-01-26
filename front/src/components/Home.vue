<template>
  <div>
    <div v-html="html_view">
    </div>
    <b-button @click="fb" variant="pink">
        login fb
    </b-button>
    <b-button @click="google" variant="pink">
        login google
    </b-button>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        html_view: null
      }
    },
    methods: {
      async fb() {
        await this.axios.get(process.env.VUE_APP_SERVER_URL + '/' + process.env.VUE_APP_FBLOGIN_PATH )
                    .then(res=>{
                        console.log(res.data);
                        this.html_view = res.data
                      })
                    .catch(e=>console.log(e))
      },
      async google() {
        await this.axios.get(process.env.VUE_APP_SERVER_URL + '/auth/go-login' )
                    .then(res=>{
                        console.log(res.data);
                        this.html_view = res.data
                      })
                    .catch(e=>console.log(e))
      }
    }
  }
</script>
<style scoped>
  .jumbotron {
    background-image: url("https://image.freepik.com/free-photo/blurred-co-working-space-background_1439-6.jpg");
    background-size: cover;
    min-height: 150vh;
  }
  .btn-pink {
    background-color: #e83e8c;
    color: white;
  }
</style>
