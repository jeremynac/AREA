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
    <b-button @click="office" variant="pink">
        login office
    </b-button>
    <b-button @click="intra" variant="pink">
        login intra
    </b-button>
    <b-button @click="discord" variant="pink">
        login discord
    </b-button>
    <!-- <window-portal>
    </window-portal> -->
  </div>
</template>

<script>
// import WindowPortal from './WindowPortal.vue';
  export default {
  // components: { WindowPortal },
    name: 'home',
    data() {
      return {
        html_view: null
      }
    },
    methods: {
      async fb() {
        window.open(process.env.VUE_APP_SERVER_URL + '/' + process.env.VUE_APP_FBLOGIN_PATH )
                    // .then(res=>{
                    //     console.log(res.data);
                    //     this.html_view = res.data
                    //   })
                    // .catch(e=>console.log(e))
      },
      async google() {
        window.open(process.env.VUE_APP_SERVER_URL + '/auth/go-login/' + localStorage.user_id)
      },
      async office() {
        window.open(process.env.VUE_APP_SERVER_URL + '/auth/off-login')
      },
      async intra() {
        window.open(process.env.VUE_APP_SERVER_URL + '/auth/intra')
      },
      async discord() {
        window.open(process.env.VUE_APP_SERVER_URL + '/auth/di-login/' + localStorage.user_id)
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