import Vue from "vue"
import Router from "vue-router"

import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Profile from '@/views/Profile'
import store from './store'

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { guest: true }
      },
      {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { guest: true }
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: { secure: true }
      },
    ]
  });

    router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.secure)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.that here loggedIn == true
        if (!store.state.loggedIn) {
          next({
             path: '/login',
          })
        }
        else {
          next();
        }
      }  //end secure


      else if(to.matched.some(record => record.meta.guest)){
        if (!store.state.loggedIn) {
          //where i have not token that redirect to login route or register route
          next()
        }
        else {
          console.log("there is token")
          next({
            path: '/profile',
         });
        }
      }//else if

      
      else {
        next(); // make sure to always call next()!
      } //end guest
     
    });  //beforeEach

  export default router
