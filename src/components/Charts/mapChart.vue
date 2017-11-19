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
				this.chart = echarts.init(this.$el, 'roma')

				this.chart.setOption({
					tooltip: {
						trigger: 'item'
					},
					dataRange: {
						min: 0,
						show: false,
						max: 2500,
						calculable: true
					},
					toolbox: {
						show: true,
						orient: 'horizontal',
						// x: 'center',
						left:"15%",
						y: 'top',
						showTitle: false,
						feature: {
							myReport: {
								icon: 'image://../../dist/static/img/report.png',
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
							name: 'iphone3',
							type: 'map',
							mapType: 'china',
							roam: false,
							itemStyle: {
								normal: { label: { show: false } },
								emphasis: { label: { show: false } }
							},
							data: [
								{
									name: "南海诸岛", value: 0,
									itemStyle: {
										normal: { opacity: 0, label: { show: false } }
									}
								},
								{ name: '北京', value: Math.round(Math.random() * 1000) },
								{ name: '天津', value: Math.round(Math.random() * 1000) },
								{ name: '上海', value: Math.round(Math.random() * 1000) },
								{ name: '重庆', value: Math.round(Math.random() * 1000) },
								{ name: '河北', value: Math.round(Math.random() * 1000) },
								{ name: '河南', value: Math.round(Math.random() * 1000) },
								{ name: '云南', value: Math.round(Math.random() * 1000) },
								{ name: '辽宁', value: Math.round(Math.random() * 1000) },
								{ name: '黑龙江', value: Math.round(Math.random() * 1000) },
								{ name: '湖南', value: Math.round(Math.random() * 1000) },
								{ name: '安徽', value: Math.round(Math.random() * 1000) },
								{ name: '山东', value: Math.round(Math.random() * 1000) },
								{ name: '新疆', value: Math.round(Math.random() * 1000) },
								{ name: '江苏', value: Math.round(Math.random() * 1000) },
								{ name: '浙江', value: Math.round(Math.random() * 1000) },
								{ name: '江西', value: Math.round(Math.random() * 1000) },
								{ name: '湖北', value: Math.round(Math.random() * 1000) },
								{ name: '广西', value: Math.round(Math.random() * 1000) },
								{ name: '甘肃', value: Math.round(Math.random() * 1000) },
								{ name: '山西', value: Math.round(Math.random() * 1000) },
								{ name: '内蒙古', value: Math.round(Math.random() * 1000) },
								{ name: '陕西', value: Math.round(Math.random() * 1000) },
								{ name: '吉林', value: Math.round(Math.random() * 1000) },
								{ name: '福建', value: Math.round(Math.random() * 1000) },
								{ name: '贵州', value: Math.round(Math.random() * 1000) },
								{ name: '广东', value: Math.round(Math.random() * 1000) },
								{ name: '青海', value: Math.round(Math.random() * 1000) },
								{ name: '西藏', value: Math.round(Math.random() * 1000) },
								{ name: '四川', value: Math.round(Math.random() * 1000) },
								{ name: '宁夏', value: Math.round(Math.random() * 1000) },
								{ name: '海南', value: Math.round(Math.random() * 1000) },
								{ name: '台湾', value: Math.round(Math.random() * 1000) },
								{ name: '香港', value: Math.round(Math.random() * 1000) },
								{ name: '澳门', value: Math.round(Math.random() * 1000) }
							]
						}
					]
				})
			}
		}
	}
</script>