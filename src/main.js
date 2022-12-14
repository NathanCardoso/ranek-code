import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PageLoading from "@/components/PageLoading.vue"
import MistakesNotification from "@/components/MistakesNotification.vue"

Vue.config.productionTip = false
Vue.component('PageLoading', PageLoading)
Vue.component('MistakeNotification', MistakesNotification)

Vue.filter('priceNumber', value => {
	value = Number(value)
	if(!isNaN(value)) {
		return value.toLocaleString('pt-br', {
			style: "currency",
			currency: 'BRL'
		})
	} else {
		return ''
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
