import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/index'
import Chart from '@/components/Charts/testChart'
import Test from '@/components/testComp'
import dynamicData from '@/components/Charts/dynamicDataChart'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: '/dist/',
	routes: 
	[
		{
			path: '/',
			name: 'inedx',
			component: Index
		},
		{
			path:'/test',
			name: 'dynamicData',
			component: dynamicData
		}
	]
})
