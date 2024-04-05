import Vuex from 'vuex'
import Vue from 'vue'
import userOptions from './User'
import aiChat from './aiChat'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        userAbout: userOptions,
        aiChat
    }
})