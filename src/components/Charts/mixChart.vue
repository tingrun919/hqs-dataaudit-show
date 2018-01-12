<template>
	<div :class="className" :style="{height:height,width:width}">

	</div>

</template>

<script>
	import echarts from 'echarts'
	import * as Cookies from "js-cookie";

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
				default: '100%'
			},
			height: {
				type: String,
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
			tabrange: {
				type: String
			}
		},
		data() {
			return {

				chart: null,
				yData: [],
				option1: {
					grid: {
						containLabel: true,
						left: '1%',
					},
					legend: {
						right: '10%',
						top: '13px',
						data: []
					},
					toolbox: {
						show: true,
						showTitle: true,
						orient: "vertical",
						right: '3%',
						top: 'middle',
						itemGap: 18,
						itemSize: 25,
						feature: {
							myReport: {
								//样例数据
								title: '样例数据',
								icon: 'image://../../dist/static/img/report.png',
								onclick: function (params) {
									$("#buttonDialog").trigger("click");
								}
							},
							myMail: {
								//周报
								title: '稽核报告',
								icon: 'image://../../dist/static/img/mail.png',
								onclick: function (params) {
									$('#dialogs').trigger("click")
								}
							},
							myRecording: {
								//工作流
								title: '工作流',
								icon: 'image://../../dist/static/img/recording.png',
								onclick: function (params) {
									$("#workflow").trigger("click");
								}
							},
							// myFootprint: {
							// 	icon: 'image://../../dist/static/img/footprint.png',
							// 	onclick: function (params) {
							// 		console.log(params);
							// 		alert('1');
							// 	}
							// },
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
				this.chart.setOption(this.option1)
				this.chart.setOption({
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
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						bottom: '20',
						filterMode: 'filter',
						start: 0,
						end: this.tabrange == 2 ? 100 : 50
					}, {
						type: 'inside',
						xAxisIndex: 0,
						filterMode: 'filter',
						start: 0,
						end: this.tabrange == 2 ? 100 : 50
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
			},
		}
	}
</script>