<template>
		<div :class="className" :style="{height:height,width:width}"></div>
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
					option:{
						title: {
							text: '信令数据量化环比同比',
							x:'center',
							top:'6%',
							textStyle: {
								fontWeight: 'normal',
								fontSize: 11
							}
						},
						tooltip: {
							trigger: 'axis',
						},
						grid: {
							containLabel: true,
							// bottom: '15%',
							// top:'15%',
							// right:'8%',
							// left:'1%'
						},
						legend: {
							textStyle:{
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
					this.chart = echarts.init(this.$el, 'default')
					this.chart.setOption(this.option)
					this.chart.setOption({
						dataZoom: [{
							type: 'slider',
							xAxisIndex: 0,
							// bottom:'20',
							filterMode: 'filter',
							// zoomLock:true,
							start: 0,
							end: 20,
							height: 8
						}, {
							// zoomLock:true,
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