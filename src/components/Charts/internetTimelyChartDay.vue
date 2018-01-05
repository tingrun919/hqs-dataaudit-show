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
				default: '350%'
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
			}
		},
		data() {
			return {
				chart: null,
				option: {
					title: {
						text: '互联网及时性',
						x: 'center',
						top: '8%',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 14
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
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
						formatter: function (params, ticket, callback) {
							var res = params[0].name;
							for (var i = 0, l = params.length; i < l; i++) {
								res += '<br/>' + params[i].seriesName.split("-")[0] + ' : ' + (params[i].value ? params[i].value : '-') + params[i].seriesName.split("-")[1];
							}
							return res;
						}
					},
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						filterMode: 'filter',
						zoomLock: true,
						start: 0,
						end: 20,
						height: 12
					}, {
						zoomLock: true,
						type: 'inside',
						xAxisIndex: 0,
						filterMode: 'filter',
						start: 0,
						end: 20
					}],
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
						textStyle: {
							fontSize: '10'
						},
						data: this.legendlist,
						formatter: function (name) {
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
						splitNumber: 4,
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