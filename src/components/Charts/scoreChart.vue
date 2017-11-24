<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	//require('echarts/theme/macarons') // echarts 主题

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
				default: '330px'
			}
		},
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.initChart()
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

				this.chart.setOption({
					title: {
						text: '本期稽核扣分榜',
						x: 'center',
						bottom:'10%',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 13
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					grid: {
						bottom: '15%',
						right:'2%',
						left:'2%',
						containLabel: true
					},
					xAxis: {
						show: false
					},
					yAxis: {
						type: 'category',
						data: ['安徽', '河北', '河南', '山东', '广州', '上海', '北京']
					},
					series: [
						{
							name: '扣分情况',
							type: 'bar',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'insideRight'
								}
							},
							data: [301, 317, 330, 344, 361, 376, 390]
						}
					]
				})
			}
		}
	}
</script>