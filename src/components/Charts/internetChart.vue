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
				// default: '440%'
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
						bottom: '25',
						x: 'center',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 16
						}
					},
					grid: {
						containLabel: true,
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
				this.chart = echarts.init(this.$el, 'macarons')
				this.chart.setOption(this.option)
				this.chart.setOption({
					title: {
						text: this.screenlist[0].screenName,
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						textStyle: {
							align: 'left'
						},
						formatter: function (params, ticket, callback) {
							var res = params[0].name;
							for (var i = 0, l = params.length; i < l; i++) {
								if (params[i].value == '-') {
									res += ''
								} else {
									res += '<br/>' + params[i].seriesName.split("-")[0] + ' : ' + (params[i].value ? params[i].value : '-') + params[i].seriesName.split("-")[1];
								}

							}
							return res;
						}
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
						data: this.legendlist,
						formatter:function (name) {
							return name.split("-")[0];
						}
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
						markPoint: {
							data: [{
								type: 'max',
								name: '最大值'
							}, {
								type: 'min',
								name: '最小值'
							}]
						},
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
						splitNumber:4,
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