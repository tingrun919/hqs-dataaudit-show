<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	import 'echarts/map/js/china.js';
	require('echarts/theme/roma') // echarts 主题

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
				default: '300px'
			},
			quotalist: {
				type: Array,
			},
		},
		data() {
			return {
				chart: null,
				option: {
					tooltip: {
						trigger: 'item'
					},
					dataRange: {
						min: 0,
						show: false,
						max: 100,
						calculable: true
					},
					toolbox: {
						show: true,
						orient: 'horizontal',
						// x: 'center',
						left: "15%",
						y: 'top',
						showTitle: false,
						feature: {
							myReport: {
								icon: 'image://../../dist/static/img/report.png',
								onclick: function (params) {
									$("#buttonDialog").trigger("click");
								}
							},
							myRecording: {
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
							restore: {
								show: true,
								icon: 'image://../../dist/static/img/refesh.png'
							},
							saveAsImage: {
								show: true,
								icon: 'image://../../dist/static/img/save.png'
							},

						}
					},
					series: [
						{
							name: '稽核情况',
							type: 'map',
							mapType: 'china',
							roam: false,
							zoom: 1.2,
							itemStyle: {
								normal: { label: { show: false } },
								emphasis: { label: { show: false } }
							},
							data: []
						}
					]
				}
			}
		},
		watch: {
			quotalist: function () {
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
				this.chart = echarts.init(this.$el, 'roma')

				this.chart.setOption(this.option)

				this.chart.setOption({
					series: [{
						data: this.getSeriesList(),
					}]
				})
			},
			getSeriesList() {
				this.result = [
					{
						name: "南海诸岛", value: 0,
						itemStyle: {
							normal: { opacity: 0, label: { show: false } }
						}
					},
				]
				for (var i = 0; i < this.quotalist.length; i++) {
					var item={
						name:this.quotalist[i].prov_name.replace('省','').replace('市','').replace('自治区','').replace('维吾尔','').replace('壮族','').replace('回族',''),
						value:this.quotalist[i].score
					}
				this.result.push(item)	
				}
				return this.result
			}
		}
	}
</script>