import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/index'

Vue.use(Router)

export default new Router({
	mode: 'history',
	// base: '/dist/',
	routes: [
		{
			path: '/',
			name: 'inedx',
			component: Index
		}
	]
})
