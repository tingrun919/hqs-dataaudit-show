import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/index'
import Chart from '@/components/Charts/test'
import Test from '@/components/testComp'
import dynamicData from '@/components/Charts/dynamicDataChart'
import login from '@/components/views/login/login'



import NotFoundComponent from '@/components/views/notFound/404'
Vue.use(Router)

export default new Router({
	mode: 'history',
	base: '/data_audit/',
	routes:
		[
			{
				path: '/',
				redirect: '/login',
			},
			{
				path: '/index',
				name: 'INDEX',
				component: Index
			},
			{
				path: '/test',
				name: 'DYNAMICDATA',
				component: Chart
			},
			{
				path: '/login',
				name: 'LOGIN',
				component: login
			},
			{
				path: '*',
				component: NotFoundComponent
			}
		]
})
