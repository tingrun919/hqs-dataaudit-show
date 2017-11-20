<template>
	<div :class="className" :id="id" :style="{height:height,width:width}" :data-test="options"></div>
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
			options: {
				type: String,
			}
		},
		data() {
			return {
				chart: null,
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
						containLabel: true
					},
					legend: {
						right: '10%',
						top: '-1%',
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
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0
						},
						data: ['北京', '上海', '天津', '山东', '陕西',
							'四川', '辽宁', '河北', '吉林', '黑龙江',
							'山西', '广东', '湖南', '湖北', '江西',
							'福建', '江苏', '浙江', '安徽', '内蒙古',
							'广西', '西藏', '宁夏', '新疆', '海南'],
					}],
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 25
					}, {
						type: 'inside',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 100
					}],
					yAxis: [{
						type: 'value',
						// name: '百分比',
						min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
						name: 'IMSI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}, {
						name: 'IMEI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					},
					{
						name: '无效手机号',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}]
				},
				option2: {
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
						containLabel: true
					},
					legend: {
						right: '10%',
						top: '-1%',
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
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0
						},
						data: ['北京', '上海', '天津', '山东', '陕西',
							'四川', '辽宁', '河北', '吉林', '黑龙江',
							'山西', '广东', '湖南', '湖北', '江西',
							'福建', '江苏', '浙江', '安徽', '内蒙古',
							'广西', '西藏', '宁夏', '新疆', '海南'],
					}],
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 25
					}, {
						type: 'inside',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 100
					}],
					yAxis: [{
						type: 'value',
						// name: '百分比',
						min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
						name: 'IMSI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}, {
						name: 'IMEI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					},
					{
						name: '无效手机号',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}]
				},
				option3: {
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
						containLabel: true
					},
					legend: {
						right: '10%',
						top: '-1%',
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
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0
						},
						data: ['北京', '上海', '天津', '山东', '陕西',
							'四川', '辽宁', '河北', '吉林', '黑龙江',
							'山西', '广东', '湖南', '湖北', '江西',
							'福建', '江苏', '浙江', '安徽', '内蒙古',
							'广西', '西藏', '宁夏', '新疆', '海南'],
					}],
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 25
					}, {
						type: 'inside',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 100
					}],
					yAxis: [{
						type: 'value',
						// name: '百分比',
						min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
						name: 'IMSI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}, {
						name: 'IMEI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					},
					{
						name: '无效手机号',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}]
				},
				option4: {
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
						containLabel: true
					},
					legend: {
						right: '10%',
						top: '-1%',
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
					xAxis: [{
						type: 'category',
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							interval: 0
						},
						data: ['北京', '上海', '天津', '山东', '陕西',
							'四川', '辽宁', '河北', '吉林', '黑龙江',
							'山西', '广东', '湖南', '湖北', '江西',
							'福建', '江苏', '浙江', '安徽', '内蒙古',
							'广西', '西藏', '宁夏', '新疆', '海南'],
					}],
					dataZoom: [{
						type: 'slider',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 25
					}, {
						type: 'inside',
						xAxisIndex: 0,
						filterMode: 'empty',
						start: 0,
						end: 100
					}],
					yAxis: [{
						type: 'value',
						// name: '百分比',
						min: 0,
						position: 'left',
						axisLabel: {
							formatter: '{value} %'
						}
					}],
					series: [{
						name: 'IMSI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}, {
						name: 'IMEI',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					},
					{
						name: '无效手机号',
						type: 'bar',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data: [Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100),
						Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100), Math.round(Math.random() * 100), Math.round(Math.random() * 100)
							, Math.round(Math.random() * 100)],
					}]
				}
			}
		},
		watch: {
			options: function () {
				this.chart = echarts.init(document.getElementById(this.id))
				if (this.options == 'one') {
					this.chart.setOption(this.option1, true)
				} else if (this.options == 'two') {
					this.chart.setOption(this.option2, true)
				}
				else if (this.options == 'three') {
					this.chart.setOption(this.option3, true)
				}
				else if (this.options == 'four') {
					this.chart.setOption(this.option4, true)
				}
			}
		},
		mounted() {
			this.initChart()
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

			}
		}
	}
</script>