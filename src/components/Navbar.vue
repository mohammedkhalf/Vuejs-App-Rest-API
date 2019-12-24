<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link class="navbar-brand" to="/"> APIDevelopment </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto"></ul>
    <form class="form-inline my-2 my-lg-0">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0"  >
          <li class="nav-item" v-if="!loggedIn">
            <router-link class="nav-link"  to="/register">
              <button class="btn btn-outline-success my-2 my-sm-0" type="button">Register</button>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"   to="/login"  v-if="!loggedIn">
              <button class="btn btn-outline-info my-2 my-sm-0" type="button">Login</button>
            </router-link>
          </li>
        </ul>

          
            <li class="nav-item" v-if="loggedIn">
              <router-link class="nav-link"   to="/login">
                <button  class="btn btn-outline-warning my-2 my-sm-0"  type="button"   @click.prevent="PerformLogout">Logout</button>
              </router-link>
            </li>

    </form>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',
    data(){
      return {
        token : null
      }
    },
    mounted(){
      this.checkUserStatus();
    },
    computed:{
      loggedIn(){
        return this.$store.getters.GETloggedIn;
      }
    },
    methods: {
      checkUserStatus (){
        if(localStorage.getItem("token") != null){
          this.token = localStorage.getItem("token")
          this.$router.push('/profile')
        }
      },
      
      //performLogout
      PerformLogout(){
        this.$store.dispatch("PerformLogoutAction")
        .then(res => {
           this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
}

</script>

<style scoped>

</style>
