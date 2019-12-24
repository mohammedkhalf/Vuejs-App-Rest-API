import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

export default new Vuex.Store({
    state: {
        loggedIn: false,
        token : null,
        user : null
    },
    plugins: [new VuexPersistence().plugin],
    mutations:{
        SET_loggedIn(state , payload){
            state.loggedIn = payload
        },
        SET_token(state , payload){
            state.token = payload
        },
        SET_user(state , payload){
            state.user = payload
        }
    },
    getters:{
        GETloggedIn(state){
            return state.loggedIn
        },
        GETuser(state){
            return state.user
        }
    },
    actions:{
        //performLogin
        PerformLoginAction({commit} , payload){
            return new Promise( (resolve , reject) =>{
                axios.post('http://localhost:8000/api/auth/login' , {
                    email: payload.email,
                    password: payload.password
                })
                .then(res => {
                    commit('SET_loggedIn' , true)
                    commit('SET_token' , res.data.access_token)
                    commit('SET_user' , res.data.user)   
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })

            }) //promise
        },
        //performRegister
        PerformRegisterAction({commit} , payload){
            return new Promise( (resolve , reject) =>{
                axios.post('http://localhost:8000/api/auth/register' , {
                    name: payload.name,
                    email: payload.email,
                    password : payload.password
                })
                .then(res => {
                    commit('SET_loggedIn' , true)
                    commit('SET_token' , res.data.access_token)
                    commit('SET_user' , res.data.user)   
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })

            }) //promise
        },
        //performLogout
        PerformLogoutAction({commit , state}){
            return  new Promise ((resolve , reject) => {
                axios.post("http://localhost:8000/api/auth/logout" , {token:state.token})
                .then(res => {
                    commit('SET_token' , null)
                    commit('SET_user' , null)
                    commit('SET_loggedIn' , false)
                    resolve(res)
                })
                .catch(err => {
                    reject(err);   
                })

            })
           
        },
        //PerformUpdateProfile
        PerformUpdateProfile({commit , state} , payload){

            return  new Promise ((resolve , reject) => {
                axios.patch("http://localhost:8000/api/auth/update" , {
                    name:payload.name,
                    email:payload.email,
                    token:state.token
                })
                .then(res => {
                    commit('SET_user' , res.data.user)
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })

            })
        }
        


    }
})