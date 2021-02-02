<template>
  <div>
    <h2>
      Click here to login with a test username and password
    </h2>
    <b-button @click="login" size="lg">
      Log in
    </b-button>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    mounted() {
      this.login();
    },
    methods: {
      async login(){//only implemented with a preconfigured username and password, still connects securely to the backend
        await this.axios.post(process.env.VUE_APP_SERVER_URL + '/' + process.env.VUE_APP_LOGIN_PATH, {username: process.env.VUE_APP_USERNAME, password: process.env.VUE_APP_PASSWORD})
                    .then(res=>{
                        console.log(res);
                        this.$router.push('/');
                      })
                    .catch(e=>console.log(e))
      }
    }
  }
</script>
