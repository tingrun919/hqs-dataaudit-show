<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts 主题

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
						text: '小区匹配率',
						bottom: '25%',
						left: '43%',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 13
						}
					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						containLabel: true,
						left: '1%',
						right: '1%',
						bottom: '35%',
						top: '5%'
					},
					xAxis: [
						{
							type: 'category',
							data: ['北京', '上海', '天津', '重庆', '海南', '广州']
						}
					],
					yAxis: [
						{
							type: 'value',
							axisLabel: {
								formatter: '{value} %'
							}
						}
					],
					series: [
						{
							name: '匹配率',
							type: 'bar',
							data: [20, 31, 39, 45, 55, 61],
							itemStyle: {
								normal: {
									// color: function (params) {
									// 	// build a color map as your need.
									// 	var colorList = [
									// 		'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
									// 		'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
									// 		'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
									// 	];
									// 	return colorList[params.dataIndex]
									// }, 
									label: {
										show: true,
										position: 'top',
										formatter: '{c}'
									}
								}
							}
						},
						{
							name: '匹配率1',
							type: 'bar',
							data: [22, 37, 42, 49, 58, 67],
							itemStyle: {
								normal: {
									// color: function (params) {
									// 	// build a color map as your need.
									// 	var colorList = [
									// 		'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
									// 		'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
									// 		'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
									// 	];
									// 	return colorList[params.dataIndex]
									// }, 
									label: {
										show: true,
										position: 'top',
										formatter: '{c}'
									}
								}
							}
						},
						{
							name: '匹配率2',
							type: 'bar',
							data: [25, 29, 30, 41, 52, 71],
							itemStyle: {
								normal: {
									// color: function (params) {
									// 	// build a color map as your need.
									// 	var colorList = [
									// 		'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
									// 		'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
									// 		'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
									// 	];
									// 	return colorList[params.dataIndex]
									// },
									label: {
										show: true,
										position: 'top',
										formatter: '{c}'
									}
								}
							}
						}
					]
				})
			}
		}
	}
</script>