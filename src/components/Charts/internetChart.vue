<template>
	<div :class="className" ref="pie" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	// require('echarts/theme/vintage') // echarts 主题

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
			},
			xaxislist: {
				type: Array,
			},
			legendlist: {
				type: Array,
			},
			serieslist: {
				type: Array,
			},
			yaxislist: {
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
						left: '31%',
						bottom: '25',
						// y: 'bottom',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 13
						}
					},
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						containLabel: true,
						bottom: '15%',
						right: '13%',
						left: '1%'
					},
					legend: {
						textStyle: {
							fontSize: '10'
						},
						data: []
					},
				}
			}
		},
		watch: {
			xaxislist: function () {
				this.initChart()
			},
		},
		mounted() {
			// this.initChart()
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
				// this.yAxisMethod()
				// this.yDataList()
				this.chart = echarts.init(this.$el, 'default')
				this.chart.setOption(this.option)
				this.chart.setOption({
					title: {
						text: this.screenlist[0].screenName,
					},
					xAxis: {
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0
						},
						data: this.xaxislist
					},
					yAxis: this.yAxisMethod(),
					legend: {
						data: this.legendlist
					},
					series: this.yDataList()
				})
			},
			yDataList() {
				this.yData = []
				for (var i = 0; i < this.serieslist.length; i++) {
					var item = {
						name: this.serieslist[i].name,
						type: this.serieslist[i].type,
						data: this.serieslist[i].data,
						yAxisIndex: this.serieslist[i].yAxisIndex,
						// itemStyle: {
						// 		normal: {
						// 			color: function (params) {
						// 				// build a color map as your need.
						// 				var colorList = [
						// 					'#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
						// 					'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
						// 					'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
						// 				];
						// 				return colorList[params.dataIndex]
						// 			}, label: {
						// 				show: true,
						// 				position: 'top',
						// 				formatter: '{c}'
						// 			}
						// 		}
						// 	}
					}
					this.yData.push(item);
				}
				return this.yData
			},
			yAxisMethod() {
				this.yAxisData = []
				for (var i = 0; i < this.yaxislist.length; i++) {
					var item = {
						type: 'value',
						position: i == 0 ? 'left' : 'right',
						axisLabel: {
							formatter: '{value} ' + this.yaxislist[i]
						}
					}
					this.yAxisData.push(item);
				}
				return this.yAxisData
			}
		}
	}
</script>