<template>
    <div class="login">
       <div class="col-md-6 offset-md-3">
           <h2 class="display-4 text-center mt-5">Login Form</h2>

            <form action="#">
                <div class="form-group">
                    <label for="email">Email address</label> 
                    <input type="email" class="form-control" id="email"  v-model="email"  aria-describedby="emailHelp">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password"
                     class="form-control"  
                      v-model="password"  
                      id="password"
                    >
                    <div style="color:red"  v-if="error"> {{ error }} </div>
                </div>
                <button type="submit" class="btn btn-info btn-block"  @click.prevent="performLogin">login</button>
            </form><br/>

            <pulse-loader :loading="isLoading"></pulse-loader>



       </div>
    </div>
</template>

<script>

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name:"Login",
    components: {
       PulseLoader
    },
    data(){
        return {
            email:"",
            password:"",
            error:"",
            isLoading: false
        }
    },
    methods : {
        performLogin(){
            this.isLoading = true
            this.$store.dispatch('PerformLoginAction' , {
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
                this.error = "Error During Login Process"
                console.log(err.message)
            })
        }
    }
}
</script>

<style scoped>

</style>