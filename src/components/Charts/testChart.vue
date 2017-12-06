<template>
	<div :class="className" :id="id" :style="{height:height,width:width}" :data-test="options"></div>
</template>

<script>
	import echarts from 'echarts'

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			id: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '1000px'
			},
			height: {
				type: String,
				default: '500px'
			},
			options: {
				type: String,
			}
		},
		data() {
			return {
				chart: null,
				option: {
					title: {
						text: 'ECharts2 vs ECharts1',
						subtext: 'Chrome下测试数据'
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data: [
							'ECharts1 - 2k数据', 'ECharts1 - 2w数据', 'ECharts1 - 20w数据', '',
							'ECharts2 - 2k数据', 'ECharts2 - 2w数据', 'ECharts2 - 20w数据'
						]
					},
					toolbox: {
						show: true,
						feature: {
							mark: { show: true },
							dataView: { show: true, readOnly: false },
							magicType: { show: true, type: ['line', 'bar'] },
							restore: { show: true },
							saveAsImage: { show: true }
						}
					},
					calculable: true,
					grid: { y: 70, y2: 30, x2: 20 },
					xAxis: [
						{
							type: 'category',
							data: ['Line', 'Bar', 'Scatter', 'K', 'Map']
						},
						{
							type: 'category',
							axisLine: { show: false },
							axisTick: { show: false },
							axisLabel: { show: false },
							splitArea: { show: false },
							splitLine: { show: false },
							data: ['Line', 'Bar', 'Scatter', 'K', 'Map']
						}
					],
					yAxis: [
						{
							type: 'value',
							axisLabel: { formatter: '{value} ms' }
						}
					],
					series: [
						{
							name: 'ECharts2 - 2k数据',
							type: 'bar',
							itemStyle: { normal: { color: 'rgba(193,35,43,1)', label: { show: true } } },
							data: [40, 155, 95, 75, 181]
						},
						{
							name: 'ECharts2 - 2w数据',
							type: 'bar',
							itemStyle: { normal: { color: 'rgba(181,195,52,1)', label: { show: true, textStyle: { color: '#27727B' } } } },
							data: [100, 200, 105, 100, 156]
						},
						{
							name: 'ECharts2 - 20w数据',
							type: 'bar',
							itemStyle: { normal: { color: 'rgba(252,206,16,1)', label: { show: true, textStyle: { color: '#E87C25' } } } },
							data: [906, 911, 908, 778, 17]
						},
						{
							name: 'ECharts1 - 2k数据',
							type: 'bar',
							xAxisIndex: 1,
							itemStyle: { normal: { color: 'rgba(193,35,43,0.5)', label: { show: true, formatter: function (p) { return p.value > 0 ? (p.value + '\n') : ''; } } } },
							data: [96, 224, 164, 124, 223]
						},
						{
							name: 'ECharts1 - 2w数据',
							type: 'bar',
							xAxisIndex: 1,
							itemStyle: { normal: { color: 'rgba(181,195,52,0.5)', label: { show: true } } },
							data: [491, 235, 389, 955, 347]
						},
						{
							name: 'ECharts1 - 20w数据',
							type: 'bar',
							xAxisIndex: 1,
							itemStyle: { normal: { color: 'rgba(252,206,16,0.5)', label: { show: true, formatter: function (p) { return p.value > 0 ? (p.value + '+') : ''; } } } },
							data: [300, 300, 217, 300, 180]
						}
					]
				}
			}
		},
		mounted() {
			this.initChart()
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
				this.chart = echarts.init(document.getElementById(this.id))
				this.chart.setOption(this.option)

			}
		}
	}
</script>