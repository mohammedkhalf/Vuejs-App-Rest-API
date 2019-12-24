<template>
    <div class="d-flex" id="wrapper">
            <!-- Sidebar -->
            <div class="bg-light border-right" id="sidebar-wrapper">
                <div class="list-group list-group-flush">
                    <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
                    <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
                    <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
                    <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
                    <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
                    <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
                </div>
            </div>

            <div class="container">
                    <form><br/>
                         <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name"  v-model="user.name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="user.email">
                        </div>
                        <button type="submit" class="btn btn-primary"  @click.prevent="UpdateProfile">Update</button>
                    </form>              
            </div>


    </div>        
</template>

<script>
export default {
    computed:{
        user(){
            return this.$store.getters.GETuser;
        }
    },
    methods:{
        UpdateProfile(){
               this.$store.dispatch("PerformUpdateProfile" , {
                   name:this.user.name,
                   email:this.user.email
               })
                .then(res => {
                    console.log('profile updated Successfully')
                })
                .catch(err => {
                console.log(err)
                })
        }
    }
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

</style>