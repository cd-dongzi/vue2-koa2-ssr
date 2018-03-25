import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)


export const createStore = () => {
    const store = new Vuex.Store({
    	// modules: {
    	// 	app
    	// },
        getters
    }) 
    store.registerModule('app', app)
    return store
}
