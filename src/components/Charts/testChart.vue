<template>
	<chart :options="polar" ref="pie"></chart>
</template>

<style>
	.echarts {
		width: 100%;
		height: 520px;
	}
</style>

<script>
	export default {
		props: ['parmars'],
		data: function () {
			let A
			let data = []
			let asyncData = {
				categories: ['北京', '上海', '天津', '山东', '陕西', '四川'],
				data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data1: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data2: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
			}
			let asyncData2 = {
				categories: ['北京', '上海', '天津', '山东', '陕西', '四川'],
				data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data1: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data2: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
			}
			let asyncData3 = {
				categories: ['北京', '上海', '天津', '山东', '陕西', '四川'],
				data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data1: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data2: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
			}
			let asyncData4 = {
				categories: ['北京', '上海', '天津', '山东', '陕西', '四川'],
				data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data1: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
				data2: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)],
			}

			return {
				polar: {
					legend: {
						right: '10%',
						data: ['IMSI', 'IMEI', '无效手机号']
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
						show: true,
						showTitle: false,
						orient: "vertical",
						right: '30px',
						top: '25%',
						feature: {
							myReport: {
								icon: 'image://../../static/charts/report.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myMail: {
								icon: 'image://../../static/charts/mail.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myRecording: {
								icon: 'image://../../static/charts/recording.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myFootprint: {
								icon: 'image://../../static/charts/footprint.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							magicType: {
								type: ['line', 'bar'],
								icon: {
									line: "image://../../static/charts/line.png",
									bar: "image://../../static/charts/pie.png"
								},
							},
							restore: {
								show: true,
								icon: 'image://../../static/charts/refesh.png'
							},
							saveAsImage: {
								show: true,
								icon: 'image://../../static/charts/save.png'
							},

						}
					},
					xAxis: {
						data: asyncData.categories
					},
					yAxis: {
						axisLabel: {
							show: true,
							formatter: '{value} %'
						}
					},
					series: [{
						name: 'IMSI',
						type: 'bar',
						data: asyncData.data,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: 'IMEI',
						type: 'bar',
						data: asyncData.data1,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: '无效手机号',
						type: 'bar',
						data: asyncData.data2,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}],
					animationDuration: 2000
				},
				polar2: {
					legend: {
						right: '10%',
						data: ['IMSI', 'IMEI', '无效手机号']
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
						show: true,
						showTitle: false,
						orient: "vertical",
						right: '30px',
						top: '25%',
						feature: {
							myReport: {
								icon: 'image://../../static/charts/report.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myMail: {
								icon: 'image://../../static/charts/mail.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myRecording: {
								icon: 'image://../../static/charts/recording.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myFootprint: {
								icon: 'image://../../static/charts/footprint.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							magicType: {
								type: ['line', 'bar'],
								icon: {
									line: "image://../../static/charts/line.png",
									bar: "image://../../static/charts/pie.png"
								},
							},
							restore: {
								show: true,
								icon: 'image://../../static/charts/refesh.png'
							},
							saveAsImage: {
								show: true,
								icon: 'image://../../static/charts/save.png'
							},

						}
					},
					xAxis: {
						data: asyncData2.categories
					},
					yAxis: {
						axisLabel: {
							show: true,
							formatter: '{value} %'
						}
					},
					series: [{
						name: 'IMSI',
						type: 'bar',
						data: asyncData2.data,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: 'IMEI',
						type: 'bar',
						data: asyncData2.data1,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: '无效手机号',
						type: 'bar',
						data: asyncData2.data2,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}],
					animationDuration: 2000
				},
				polar3: {
					legend: {
						right: '10%',
						data: ['IMSI', 'IMEI', '无效手机号']
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
						show: true,
						showTitle: false,
						orient: "vertical",
						right: '30px',
						top: '25%',
						feature: {
							myReport: {
								icon: 'image://../../static/charts/report.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myMail: {
								icon: 'image://../../static/charts/mail.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myRecording: {
								icon: 'image://../../static/charts/recording.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myFootprint: {
								icon: 'image://../../static/charts/footprint.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							magicType: {
								type: ['line', 'bar'],
								icon: {
									line: "image://../../static/charts/line.png",
									bar: "image://../../static/charts/pie.png"
								},
							},
							restore: {
								show: true,
								icon: 'image://../../static/charts/refesh.png'
							},
							saveAsImage: {
								show: true,
								icon: 'image://../../static/charts/save.png'
							},

						}
					},
					xAxis: {
						data: asyncData3.categories
					},
					yAxis: {
						axisLabel: {
							show: true,
							formatter: '{value} %'
						}
					},
					series: [{
						name: 'IMSI',
						type: 'bar',
						data: asyncData3.data,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: 'IMEI',
						type: 'bar',
						data: asyncData3.data1,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: '无效手机号',
						type: 'bar',
						data: asyncData3.data2,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}],
					animationDuration: 2000
				},
				polar4: {
					legend: {
						right: '10%',
						data: ['IMSI', 'IMEI', '无效手机号']
					},
					tooltip: {
						trigger: 'axis'
					},
					toolbox: {
						show: true,
						showTitle: false,
						orient: "vertical",
						right: '30px',
						top: '25%',
						feature: {
							myReport: {
								icon: 'image://../../static/charts/report.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myMail: {
								icon: 'image://../../static/charts/mail.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myRecording: {
								icon: 'image://../../static/charts/recording.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							myFootprint: {
								icon: 'image://../../static/charts/footprint.png',
								onclick: function (params) {
									console.log(params);
									alert('1');
								}
							},
							magicType: {
								type: ['line', 'bar'],
								icon: {
									line: "image://../../static/charts/line.png",
									bar: "image://../../static/charts/pie.png"
								},
							},
							restore: {
								show: true,
								icon: 'image://../../static/charts/refesh.png'
							},
							saveAsImage: {
								show: true,
								icon: 'image://../../static/charts/save.png'
							},

						}
					},
					xAxis: {
						data: asyncData4.categories
					},
					yAxis: {
						axisLabel: {
							show: true,
							formatter: '{value} %'
						}
					},
					series: [{
						name: 'IMSI',
						type: 'bar',
						data: asyncData4.data,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: 'IMEI',
						type: 'bar',
						data: asyncData4.data1,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}, {
						name: '无效手机号',
						type: 'bar',
						data: asyncData4.data2,
						label: {
							normal: {
								show: true,
								position: 'top',
								fontSize: '10'
							}
						},
					}],
					animationDuration: 2000
				}
			}
		},
		watch: {
			parmars: function () {
				if (this.parmars == 'one') {
					this.$refs.pie.chart.setOption(this.polar)
				} else if (this.parmars == 'two') {
					this.$refs.pie.chart.setOption(this.polar2)
				}
				else if (this.parmars == 'three') {
					this.$refs.pie.chart.setOption(this.polar3)
				}
				else if (this.parmars == 'four') {
					this.$refs.pie.chart.setOption(this.polar4)
				}


			}

		}
	}
</script>