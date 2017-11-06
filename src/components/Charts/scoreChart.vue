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
				default: '300px'
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
						// y: 'bottom',
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
						right: '1%',
						containLabel: true
					},
					xAxis: {
						// type: 'value'
						show: false
					},
					yAxis: {
						type: 'category',
						data: ['北京', '上海', '广州', '山东', '河南', '河北', '安徽']
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
							data: [320, 302, 301, 334, 390, 330, 320]
						}
					]
				})
			}
		}
	}
</script>