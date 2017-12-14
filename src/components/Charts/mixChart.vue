<template>
	<div :class="className" :id="id" :style="{height:height,width:width}"></div>
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
				default: '200px'
			},
			height: {
				type: String,
				default: '200px'
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
				yData: [],
				option1: {
					tooltip: {
						trigger: 'axis',
						formatter: function (params, ticket, callback) {

							var res = params[0].name;

							for (var i = 0, l = params.length; i < l; i++) {
								if (params[i].seriesType === 'line') {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + 'h';
								} else {
									res += '<br/>' + params[i].seriesName + ' : ' + (params[i].value ? params[i].value : '-') + '个';
								}
							}
							return res;

						}
					},
					grid: {
						containLabel: true,
						left: '0',
						right: '5'
					},
					legend: {
						right: '10%',
						top: '13px',
						data: []
					},
					toolbox: {
						show: true,
						showTitle: false,
						orient: "vertical",
						right: '30px',
						top: '25%',
						feature: {
							myReport: {
								icon: 'image://../../dist/static/img/report.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myMail: {
								icon: 'image://../../dist/static/img/mail.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myRecording: {
								icon: 'image://../../dist/static/img/recording.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myFootprint: {
								icon: 'image://../../dist/static/img/footprint.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							magicType: {
								type: ['line', 'bar'],
								icon: {
									line: "image://../../dist/static/img/line.png",
									bar: "image://../../dist/static/img/pie.png"
								},
							},
							restore: {
								show: true,
								icon: 'image://../../dist/static/img/refesh.png'
							},
							saveAsImage: {
								show: true,
								icon: 'image://../../dist/static/img/save.png'
							},

						}
					}
				},

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
				this.chart = echarts.init(document.getElementById(this.id))
				this.chart.setOption(this.option1)
				this.chart.setOption({
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						bottom:'20',
						filterMode: 'filter',
						start: 0,
						end: 25
					}, {
						type: 'inside',
						xAxisIndex: 0,
						filterMode: 'filter',
						start: 0,
						end: 25
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