<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'

	const animationDuration = 3000
	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '100%'
			},
			height: {
				type: String,
			},
			quotalist: {
				type: Array,
			},
			screenlist: {
				type: Array,
			}
		},
		data() {
			return {
				chart: null,
				option: {
					title: {
						text: '',
						bottom: '25',
						x: 'center',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 16,
							color:'#0c8fcf',
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function (params, ticket, callback) {
							var res = params[0].name;
							for (var i = 0, l = params.length; i < l; i++) {
									res += '<br/> 本期稽核异常数: ' + (params[i].value ? params[i].value : '-') + '分';
							}
							return res;
						}
					},
					grid: {
						containLabel: true
					},
					xAxis: [
						{
							show: false
						}
					],
					yAxis: [],
					series: []
				}
			}
		},
		watch: {
			quotalist: function () {
				this.initChart()
			},
		},
		mounted() {
			this.chart = null
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				this.chart = echarts.init(this.$el, 'default')

				this.chart.setOption(this.option)

				this.chart.setOption({
						yAxis: this.yDataLists(),
						series: this.yAxisMethod(),
						title:{
							text: this.screenlist[0].screenName
						}
					})
			},
			yAxisMethod() {
				this.yAxisData = []
				this.score = this.yDatas()
				var item = {
					name: this.screenlist[0].screenName,
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: this.score.reverse()
				}
				this.yAxisData.push(item);
				return this.yAxisData
			},
			yDatas() {
				this.yDatass = []
				for (var i = 0; i < 7; i++) {
					this.yDatass.push(this.quotalist[i].score);
				}
				return this.yDatass
			},
			yDataLists() {
				this.yData = []
				this.yDataList = []
				for (var i = 0; i < 7; i++) {
					this.yData.push(this.quotalist[i].prov_name);
				}
				var item = {
					type: 'category',
					data: this.yData.reverse()
				}
				this.yDataList.push(item)
				return this.yDataList
			}
		}
	}
</script>