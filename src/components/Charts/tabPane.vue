<template>
	<div class="components-container" style='height:500px;'>
		<div class='chart-container'>
			<span class="select-one">稽核范围</span>
			<el-select class="select-one" v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-select class="select-one" v-model="value2" placeholder="请选择">
				<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
				</el-option>
			</el-select>
			<mix-chart height='100%' width='100%' :id="setId" :options="value2"></mix-chart>
		</div>
	</div>
</template>

<script>
	import mixChart from '@/components/Charts/mixChart.vue'

	export default {
		props: ['setId'],
		components: { mixChart },
		data() {
			return {
				options: [{
					value: '选项1',
					label: '时间'
				}, {
					value: '选项2',
					label: '地域'
				}, {
					value: '选项3',
					label: '数据域'
				}],
				options2: [{
					value: 'one',
					label: '2017-10-03'
				}, {
					value: 'two',
					label: '2017-10-10'
				}, {
					value: 'three',
					label: '2017-10-17'
				}, {
					value: 'four',
					label: '2017-10-24'
				}],
				value: '选项1',
				value2: 'one',
			}
		}
	}
</script>

<style scoped>
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
		/* padding-bottom: 40px; */
	}
</style>