<template>
	<div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
	import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts 主题

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
			}
		},
		data() {
			return {
				chart: null,
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
				this.chart = echarts.init(this.$el, 'default')

				this.chart.setOption({
					title: {
						text: '无效手机号码数',
						x: 'center',
						y: 'bottom',
						textStyle: {
							fontWeight: 'normal',
							fontSize: 13
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{b}: {c}"
					},
					series: [{
						type: 'pie',
						selectedMode: 'single',
						// radius: ['0%', '70%'],
						color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],

						label: {
							normal: {
								position: 'inner',
								formatter: '{b}\n{c}'
							}
						},
						data: [{
							value: 1261,
							name: '北京'
						}, {
							value: 513,
							name: '重庆'
						}, {
							value: 938,
							name: '上海'
						}, {
							value: 623,
							name: '天津'
						}, {
							value: 2299,
							name: '广州'
						}]
					}]
				})
			}
		}
	}
</script>