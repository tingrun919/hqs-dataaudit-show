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
				default: '100%'
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
		},
		data() {
			return {
				chart: null,
				timer: 0,
				dataindex:0,
				option: {
					title: {
						text: '动态数据',
						x: 'center',
						bottom: '10%',
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
						left: '2%',
						right: '7%',
						bottom: '11%',
						top: '5%'
					},
					// yAxis: [{
					// 	type: 'category',
					// 	axisTick: {
					// 		alignWithLabel: true
					// 	},
					// 	boundaryGap: true,
					// 	data: (function () {
					// 		var now = new Date();
					// 		var res = [];
					// 		var len = 5;
					// 		while (len--) {
					// 			res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
					// 			now = new Date(now - 3000);
					// 		}
					// 		return res;
					// 	})()
					// }],
					xAxis: [{
						type: 'value',
						scale: true,
						name: '价格',
						show: false
					}],
					// series: [
					// 	{
					// 		name: '预购队列',
					// 		type: 'bar',
					// 		yAxisIndex: 0,
					// 		label: {
					// 			normal: {
					// 				show: true,
					// 				position: 'insideRight'
					// 			}
					// 		},
					// 		data: (function () {
					// 			var res = [];
					// 			var len = 5;
					// 			while (len--) {
					// 				res.unshift(Math.round(Math.random() * 100));
					// 			}
					// 			return res;
					// 		})()
					// 	},
					// 	{
					// 		name: '预购队列2',
					// 		type: 'bar',
					// 		yAxisIndex: 0,
					// 		label: {
					// 			normal: {
					// 				show: true,
					// 				position: 'insideRight'
					// 			}
					// 		},
					// 		data: (function () {
					// 			var res = [];
					// 			var len = 5;
					// 			while (len--) {
					// 				res.unshift(Math.round(Math.random() * 100));
					// 			}
					// 			return res;
					// 		})()
					// 	},
					// 	{
					// 		name: '预购队列3',
					// 		type: 'bar',
					// 		yAxisIndex: 0,
					// 		label: {
					// 			normal: {
					// 				show: true,
					// 				position: 'insideRight'
					// 			}
					// 		},
					// 		data: (function () {
					// 			var res = [];
					// 			var len = 5;
					// 			while (len--) {
					// 				res.unshift(Math.round(Math.random() * 100));
					// 			}
					// 			return res;
					// 		})()
					// 	}
					// ]
				}
			}
		},
		watch: {
			xaxislist: function () {
				this.initChart()
				this.testTimer()
			},
		},
		mounted() {
			// this.initChart()
			// this.testTimer()
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
					yAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						boundaryGap: true,
						data: this.xDataList()
					}],
					series: this.yDataList()
				})
			},
			testTimer() {
				setInterval(() => {
					this.dataindex++

					this.chart.setOption({
						yAxis: [{
							type: 'category',
							axisTick: {
								alignWithLabel: true
							},
							boundaryGap: true,
							data: this.xDataList()
						}],
						series: this.yDataList()
					})
					if(this.dataindex > 25){
						this.dataindex = 0
					}
					// let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
					// var data0 = this.option.series[0].data;
					// data0.pop();
					// data0.unshift(Math.round(Math.random() * 100));
					// this.option.yAxis[0].data.pop();
					// this.option.yAxis[0].data.unshift(axisData);
					// this.chart.setOption(this.option);
				}, 3000)
			},
			xDataList() {
				this.xData = []
				var index = this.dataindex;
				for (var i = 0; i < 5; i++) {
					this.xData.unshift(this.xaxislist[i + index])
				}
				return this.xData
			},
			yDataList() {
				this.yData = []
				var index = this.dataindex;
				for (var i = 0; i < this.serieslist.length; i++) {
					this.everyData = []
					for (var j = 0; j < 5; j++) {
						this.everyData.unshift(this.serieslist[i].data[j + index])
					}
					var item = {
						name: this.serieslist[i].name,
						type: this.serieslist[i].type,
						data: this.everyData,
						yAxisIndex: this.serieslist[i].yAxisIndex,
					}
					this.yData.push(item);
				}
				return this.yData
			},
		}
	}
</script>