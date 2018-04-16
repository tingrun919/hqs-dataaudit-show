<template>
	<div :class="className" :style="{height:height,width:width}">
	</div>
</template>

<script>
	import echarts from 'echarts'
	import * as Cookies from "js-cookie";
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
			},
			quotalist: {
				type: Object,
			},
			screenlist: {
				type: Array,
			},
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
						left: 1,
					},
					// toolbox: {
					// 	show: true,
					// 	orient: 'horizontal',
					// 	left: "right",
					// 	top: 'top',
					// 	showTitle: true,
					// 	itemGap: 18,
					// 	itemSize: 25,
					// 	feature: {
					// 		myReport: {
					// 			title: '稽核报告',
					// 			icon: 'image://../../data_audit/static/img/report.png',
					// 			onclick: function (params) {
					// 				$("#dialogs").trigger("click");
					// 			}
					// 		},
					// 		myRecording: {
					// 			title: '工作流',
					// 			icon: 'image://../../data_audit/static/img/recording.png',
					// 			onclick: function (params) {
					// 				$("#workflow").trigger("click");
					// 			}
					// 		},
					// 		myFootprint: {
					// 			icon: 'image://../../data_audit/static/img/footprint.png',
					// 			onclick: function (params) {
					// 				console.log(params);
					// 				alert('1');
					// 			}
					// 		},
					// 	}
					// },
				}
			}
		},
		watch: {
			quotalist: function () {
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
				this.chart = echarts.init(this.$el, 'default')
				this.chart.setOption(this.option)
				this.chart.on('click', function (params) {
					if (params.seriesId.length > 0) {
						Cookies.set('cityName', params.name)
						$("#mapDetail").trigger("click");
					}
				});
				this.chart.setOption({
					title: {
						text: this.screenlist[0].screenName,
						bottom: '25',
						x: 'center',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 16,
							color: '#0c8fcf',
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function (params, ticket, callback) {
							var res = params[0].name;
							for (var i = 0, l = params.length; i < l; i++) {
								res += '<br/> 本期稽核异常数量: ' + (params[i].value ? params[i].value : '-') + '个';
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
							interval: 0,
							formatter: function (value) {
								return value.split("").join("\n");
							},
							textStyle: {
								color: '#0c8fcf'
							},
						},
						axisLine: {
							lineStyle: {
								color: '#0c8fcf' //坐标轴线颜色
							}
						},
						data: this.quotalist.xaxis
					},
					yAxis: [
						{
							type: 'value',
							axisLabel: {
								textStyle: {
									color: '#0c8fcf'
								},
							},
							axisLine: {
								lineStyle: {
									color: '#0c8fcf' //坐标轴线颜色
								}
							},
						},

					],
					// yAxis: this.yAxisMethod(),
					series: this.yDataList()
				})
			},
			yDataList() {
				this.yData = []
				// for (var i = 0; i < this.quotalist.length; i++) {
				var item = {
					name: "123123132",
					type: "bar",
					data: this.quotalist.ydata,
					markPoint: {
						data: [{
							type: 'max',
							name: '最大值'
						}, {
							type: 'min',
							name: '最小值'
						}]
					},
					yAxisIndex: 0,
				}
				this.yData.push(item);
				// }
				return this.yData
			},
			// yAxisMethod() {
			// 	this.yAxisData = []
			// 	for (var i = 0; i < this.yaxislist.length; i++) {
			// 		var item = {
			// 			type: 'value',
			// 			position: i == 0 ? 'left' : 'right',
			// 			splitNumber:4,
			// 			axisLabel: {
			// 				formatter: '{value} ' + this.yaxislist[i]
			// 			}
			// 		}
			// 		this.yAxisData.push(item);
			// 	}
			// 	return this.yAxisData
			// }
		}
	}
</script>