<template>
	<div class="components-container" style='height:500px;'>
		<div class='chart-container'>
			<span class="select-one">稽核范围</span>
			<el-select class="select-one" v-model="value" placeholder="请选择">
				<el-option v-for="item in range" :key="item.rangeId" :label="item.rangeLabel" :value="item.rangeId">
				</el-option>
			</el-select>
			<el-select class="select-one" v-model="value2" placeholder="请选择">
				<el-option v-for="items in options2" :key="items.prov_id" :label="items.prov_name" :value="items.prov_id">
				</el-option>
			</el-select>
			<mix-chart height='100%' width='100%' :id="setId" :options="value2"></mix-chart>
		</div>
	</div>
</template>

<script>
	import mixChart from '@/components/Charts/mixChart.vue'

	import tabPaneService from '../../service/tabPaneService'
	export default {
		mixins: [tabPaneService],
		props: ['setId','range','rangeDefault'],
		components: { mixChart },
		watch:{
			rangeDefault:function(){
				this.value = this.rangeDefault
			},
			value:function(){
				if(this.value == 2){
					this.getProv();
				}else{
					console.log(this.value,'select-value')
				}
			}
		},
		data() {
			return {
				options2: [],
				value: '',
				value2: '',
			}
		},
		methods:{

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