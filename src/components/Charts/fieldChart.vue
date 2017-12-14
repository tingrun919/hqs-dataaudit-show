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
				default: '1000px'
			},
			height: {
				type: String,
				default: '500px'
			},
			cs: {
				type: Array,
			},
			ps: {
				type: Array,
			},
			lte: {
				type: Array,
			},
			ss: {
				type: Array,
			},
			quota: {
				type: Array,
			}
		},
		data() {
			return {
				chart: null,
				xData: [],
				yData: [],
				option: {
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						right: '10%',
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
					},
					calculable: true,
					grid: { 
						y: 70, y2: 30, x2: 20 
					},
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0
						},
						data: []
					}],
					yAxis: [
						{
							splitLine:{  
                        　　　　show:false  
                        　　 },
							type: 'value',
							axisLabel: { formatter: '{value} ms' }
						}
					],
					series: [


					]
				}
			}
		},
		watch: {
			quota: function () {
				this.initChart()
			}
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
				this.chart.setOption(this.option)

				this.chart.setOption({
					xAxis:{
							data: this.xDataList()
						},
					legend:{
						data:this.legendList()
					},
					series: this.yDataList()
				})
			},
			xDataList() {
				this.xData = []
				for (var i = 0; i < this.ss.length; i++) {
					this.xData.push(this.ss[i].prov_name);
				}
				return this.xData
			},
			yDataList() {
				this.yData = []
				for (var i = 0; i < this.ss.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						var a = this.quota[j].muFieldname
						var item = {
							name: "全域"+this.quota[j].quotaName,
							type: 'bar',
							itemStyle: {
								normal: {label: {
										show: true,
										position: 'top',
										formatter: '{c}'
									}
								}
							},
							data: [this.ss[i][a]]
						}
						this.yData.push(item);
					}
				}
				for (var i = 0; i < this.cs.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						var a = this.quota[j].muFieldname
						var item = {
							name: this.cs[i].sa_type+"域"+this.quota[j].quotaName,
							type: 'bar',
							itemStyle: {
								normal: {label: {
										show: true,
										position: 'top',
										formatter: '{c}'
									}
								}
							},
							data: [this.cs[i][a]]
						}
						this.yData.push(item);
					}
				}
				for (var i = 0; i < this.lte.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						var a = this.quota[j].muFieldname
						var item = {
							name: this.lte[i].sa_type+"域"+this.quota[j].quotaName,
							type: 'bar',
							itemStyle: {
								normal: {label: {
										show: true,
										position: 'top',
										formatter: '{c}'
									}
								}
							},
							data: [this.lte[i][a]]
						}
						this.yData.push(item);
					}
				}
				for (var i = 0; i < this.ps.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						var a = this.quota[j].muFieldname
						var item = {
							name: this.ps[i].sa_type+"域"+this.quota[j].quotaName,
							type: 'bar',
							itemStyle: {
								normal: {label: {
										show: true,
										position: 'top',
										formatter: '{c}'
									}
								}
							},
							data: [this.ps[i][a]]
						}
						this.yData.push(item);
					}
				}
				return this.yData
			},
			legendList(){
				this.legend = []
				for (var i = 0; i < this.ss.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						this.legend.push("全域"+this.quota[j].quotaName);
					}
				}
				this.legend.push("",)
				for (var i = 0; i < this.cs.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						this.legend.push(this.cs[i].sa_type+"域"+this.quota[j].quotaName);
					}
				}
				this.legend.push("",)
				for (var i = 0; i < this.lte.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						this.legend.push(this.lte[i].sa_type+"域"+this.quota[j].quotaName);
					}
				}
				this.legend.push("",)
				for (var i = 0; i < this.ps.length; i++) {
					for (var j = 0; j < this.quota.length; j++) {
						this.legend.push(this.ps[i].sa_type+"域"+this.quota[j].quotaName);
					}
				}
				console.log(this.legend,'llll')
				return this.legend
			}
		}
	}
</script>