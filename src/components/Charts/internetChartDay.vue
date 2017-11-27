<template>
	<div :class="className" ref="pie" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	//require('echarts/theme/vintage') // echarts 主题

	const animationDuration = 3000
	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '115%'
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
						text: '互联网数据量化环比同比',
						left:'33%',
						bottom:'5%',
						// y: 'bottom',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 13
						}
					},
					tooltip: {
						trigger: 'axis',
						formatter: function (params, ticket, callback) {

							var res = params[0].name;

							for (var i = 0, l = params.length; i < l; i++) {
								if (params[i].seriesType === 'line') {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '%';
								} else {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + 'TB';
								}
							}
							return res;

						}
					},
					grid: {
						containLabel: true,
						bottom: '15%',
						top:'15%',
						right:'13%',
						left:'1%'
					},
					// legend: {
					// 	textStyle:{
					// 		fontSize: '10'
					// 	},
					// 	data: ['量化同比', '量化环比', '上月同期文件大小', '上月文件大小', '同期文件大小']
					// },
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						data: ['济南', '上海', '山东', '天津', '陕西', '四川'],
					}],
					yAxis: [{
						type: 'value',
						name: '量化环比同比',
						// min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value} %'
						}
					}, {
						type: 'value',
						name: '文件大小(TB)',
						// min: 0,
						position: 'right',
						axisLabel: {
							formatter: '{value} TB'
						}
					}],
					series: [{
						name: '量化同比',
						type: 'line',
						label: {
							normal: {
								// show: true,
								// position: 'top',
								fontSize: '10'
							},
						},
						lineStyle: {
							normal: {
								width: 1,
								shadowColor: 'rgba(0,0,0,0.4)',
								shadowBlur: 10,
								shadowOffsetY: 10,
							}
						},
						data: [38, -3, 47, 35, 43, 29]
					},
					{
						name: '量化环比',
						type: 'line',
						label: {
							normal: {
								// show: true,
								// position: 'top',
								fontSize: '10',
							}
						},
						lineStyle: {
							normal: {
								width: 1,
								shadowColor: 'rgba(0,0,0,0.7)',
								shadowBlur: 10,
								shadowOffsetY: 10
							}
						},
						data: [43, 24, 32, 46, 19, 25]
					}, {
						name: '上月同期文件大小',
						type: 'bar',
						yAxisIndex: 1,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
						data: [2.2, -1.5, 6.6, 7.7, 4.4, 5.5]
					}]
				})
			}
		}
	}
</script>