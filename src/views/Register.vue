<template>
    <div class="register">
       <div class="col-md-6 offset-md-3">
           <h2 class="display-4 text-center mt-5">Register Form</h2>

            <form action="#">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name"   v-model="name">
                </div>
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email"  v-model="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password"  v-model="password">
                </div>

                     <div style="color:red"  v-if="error"> {{ error }} </div>

                <button type="submit" class="btn btn-info btn-block"  @click.prevent="performRegistration"> register</button>
            </form><br/>

             <pulse-loader :loading="isLoading"></pulse-loader>

       </div>
    </div>
</template>

<script>

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name:"Register",
     components: {
       PulseLoader
    },
    data(){
        return {
            name:"",
            email:"",
            password:"",
            error:"",
            isLoading: false
        }
    },
    methods: {
        performRegistration(){
            this.isLoading = true
            this.$store.dispatch('PerformRegisterAction' , {
                name:this.name,
                email:this.email,
                password:this.password
            })
            .then(res => {
                console.log(res)
                this.isLoading = false
                this.$router.push('/profile')
            })
            .catch(err =>{
                this.isLoading = false
                this.error = "Error During Registration Process"
                console.log(err.message)
            })
          
        }
    },
}
</script>

<style scoped>

</style>