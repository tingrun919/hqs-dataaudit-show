<template>
	<div class="headerWrapper">
		<header-View></header-View>
		<ul class="nav-menu">
			<li data-href="#week">周稽核报告</li>
			<li data-href="#day">日稽核报告</li>
			<li data-href="#signaling">信令详单</li>
			<li data-href="#internet">互联网详单</li>
			<li data-href="#interface">接口文件稽核</li>
		</ul>
		<div class="nav-header">
			<ul class="nav-list">
				<li class="nav-li">
					<span class="btn-nav"><i class="icon"></i>更多</span>
					<div class="more-nav">
						<ul>
							<li>
								<p>国庆节</p>
								<p>
									10月1日
								</p>
								<p>
									12:32
								</p>
								<div class="line"></div>
							</li>
							<li>
								<a href="#week" class="btn_snav" data-href="#week">
								周稽核报告
								</a>
							</li>
							<li>
								<a href="#day" class="btn_snav" data-href="#day">
								日稽核报告
								</a>
							</li>
							<li>
								<a href="#signaling" class="btn_snav" data-href="#signaling">
								信令详单
								</a>
							</li>
							<li>
								<a href="#internet" class="btn_snav" data-href="#internet">
								互联网详单
							</a>
							</li>
							<li>
								<a href="#interface" class="btn_snav" data-href="#interface">
								接口文件稽核
							</a>
							</li>
							<li>
								<div class="line"></div>
								<p style="padding-top:30px;font-size:18px;">
									admin(2)
								</p>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<section class="panel" data-section-name="week">
			<el-row :gutter="5">
				<el-col :span="17">
					<el-card>
						<div slot="header" class="clearfix">
							<span style="line-height: 36px;">本期（9.29-10.1）报告指标概括</span>
						</div>
						<el-row :gutter="20">
							<el-col :span="15">
								<internet-Chart></internet-Chart>
							</el-col>
							<el-col :span="9">
								<score-Chart></score-Chart>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="15">
								<matching-Chart></matching-Chart>
							</el-col>
							<el-col :span="9" style="margin-top: -25px;">
								<invalidNumber-Chart></invalidNumber-Chart>
							</el-col>
						</el-row>
					</el-card>
				</el-col>
				<el-col :span="7">
					<el-card>
						<div slot="header" class="clearfix clearspan">
							<map-Chart></map-Chart>
							<span>本期评价</span>
						</div>

						<div style="padding:15px;">
							数据采集(DAQ)，是指从传感器和其它待测设备等模拟和数字被测单元中自动采集非电量或者电量信号,送到上位机中进行分析，处理。数据采集系统是结合基于计算机或者其他专用测试平台的测量软硬件产品来实现灵活的、用户自定义的测量系统。 数据采集(DAQ)，是指从传感器和其它待测设备等模拟和数字被测单元中自动采集非电量或者电量信号,送到上位机中进行分析，处理。数据采集系统是结合基于计算机或者其他专用测试平台的测量软硬件产品来实现灵活的、用户自定义的测量系统。
						</div>
					</el-card>
				</el-col>
			</el-row>
			<ul class="pagination">
				<li>
					<a class="active" href="#header">
						<span class="hover-text"></span>
					</a>
				</li>
				<li>
					<a class="" href="#week">
						<span class="hover-text"></span>
					</a>
				</li>
				<!-- <li>
					<a class="" href="#day">
						<span class="hover-text"></span>
					</a>
				</li> -->
				<li>
					<a class="" href="#signaling">
						<span class="hover-text"></span>
					</a>
				</li>
				<li>
					<a class="" href="#internet">
						<span class="hover-text"></span>
					</a>
				</li>
				<li>
					<a class="" href="#interface">
						<span class="hover-text"></span>
					</a>
				</li>
				<li>
					<a class="" href="#footer">
						<span class="hover-text"></span>
					</a>
				</li>
			</ul>
		</section>
		<!-- <section class="panel" data-section-name="day">
			<el-row :gutter="5">
				<el-col :span="17">
					<el-card>
						<div slot="header" class="clearfix">
							<span style="line-height: 36px;">本期（9.29-10.1）报告指标概括</span>
						</div>
						<el-row :gutter="20">
							<el-col :span="15">
								<internet-Chart></internet-Chart>
							</el-col>
							<el-col :span="9">
								<score-Chart></score-Chart>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="15">
								<matching-Chart></matching-Chart>
							</el-col>
							<el-col :span="9" style="margin-top: -25px;">
								<invalidNumber-Chart></invalidNumber-Chart>
							</el-col>
						</el-row>
					</el-card>
				</el-col>
				<el-col :span="7">
					<el-card>
						<div slot="header" class="clearfix clearspan">
							<map-Chart></map-Chart>
							<span>本期评价</span>
						</div>

						<div style="padding:15px;">
							数据采集(DAQ)，是指从传感器和其它待测设备等模拟和数字被测单元中自动采集非电量或者电量信号,送到上位机中进行分析，处理。数据采集系统是结合基于计算机或者其他专用测试平台的测量软硬件产品来实现灵活的、用户自定义的测量系统。 数据采集(DAQ)，是指从传感器和其它待测设备等模拟和数字被测单元中自动采集非电量或者电量信号,送到上位机中进行分析，处理。数据采集系统是结合基于计算机或者其他专用测试平台的测量软硬件产品来实现灵活的、用户自定义的测量系统。
						</div>
					</el-card>
				</el-col>
			</el-row>
		</section> -->
		<!-- <section class="panel" data-section-name="signaling" style="height: 150px;padding:20px;">
			<el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
				<el-tab-pane label="信令自身稽核" name="first">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="规范性稽核" name="second">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="用户漂移率" name="third">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="小区匹配率" name="four">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="小区工参" name="five">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="BO侧差异率" name="six">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
			</el-tabs>
		</section> -->
		<!-- <section class="panel" data-section-name="internet" style="height: 150px;padding:20px;">
			<el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
				<el-tab-pane label="自身稽核" name="first">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<testChart2 :parmars="value2"></testChart2>
				</el-tab-pane>
			</el-tabs>
		</section> -->
		<!-- <section class="panel" data-section-name="interface" style="height: 150px;padding:20px;">
			<el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
				<el-tab-pane label="信令延时性" name="first">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="互联网延时性" name="second">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="详单空包率" name="third">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="详单碎文件率" name="four">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="接口文件数据量环同比" name="five">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
				<el-tab-pane label="综采话单数据量环同比" name="six">
					<span class="select-one">稽核范围</span>
					<el-select class="select-one" v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<el-select class="select-one" v-model="value2" placeholder="请选择">
						<el-option v-for="items in options2" :key="items.value" :label="items.label" :value="items.value">
						</el-option>
					</el-select>
					<test-Chart :parmars="value2"></test-Chart>
				</el-tab-pane>
			</el-tabs>
		</section> -->
		<section class="panel" style="height: 150px;padding:20px;">
			<el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
				<el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
					<keep-alive>
						<tab-pane v-if='activeName==item.key' :type='item.key'></tab-pane>
					</keep-alive>
				</el-tab-pane>
			</el-tabs>
		</section>
		<div class="footer" data-section-name="footer">
			<div class="inner">
				<p>Footer</p>
			</div>
		</div>
	</div>
</template>

<script>
	import internetChart from '@/components/Charts/internetChart'
	import scoreChart from '@/components/Charts/scoreChart'
	import matchingChart from '@/components/Charts/matchingChart'
	import invalidNumberChart from '@/components/Charts/invalidNumberChart'
	import mapChart from '@/components/Charts/mapChart'
	import testChart from '@/components/Charts/testChart'
	import testChart2 from '@/components/Charts/testChart2'
	import tabPane from '@/components/Charts/tabPane'


	import headerView from '@/components/header/header'

	export default {
		components: { internetChart, scoreChart, matchingChart, invalidNumberChart, mapChart, headerView, testChart, tabPane },
		data() {
			return {
				activeName2: 'first',
				options: [{
					value: '选项1',
					label: '时间'
				}, {
					value: '选项2',
					label: '地域'
				}, {
					value: '选项3',
					label: '数据域'
				}],
				options2: [{
					value: 'one',
					label: '2017-10-03'
				}, {
					value: 'two',
					label: '2017-10-10'
				}, {
					value: 'three',
					label: '2017-10-17'
				}, {
					value: 'four',
					label: '2017-10-24'
				}],
				value: '',
				value2: '',
				tabMapOptions: [
					{ label: '中国', key: 'CN' },
					{ label: '美国', key: 'US' },
					{ label: '日本', key: 'JP' },
					{ label: '欧元区', key: 'EU' }
				],
				activeName: 'CN',
			}
		},
		watch: {
			value2: function () {
				// console.log(this.value2)
			}
		},
		beforeMount() {
			$(function () {
				$.scrollify({
					section: ".panel",
					scrollbars: false,
					interstitialSection: ".header,.footer",
					before: function (i, panels) {

						var ref = panels[i].attr("data-section-name");

						$(".pagination .active").removeClass("active");

						$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
						if (ref != 'header') {
							$(".nav-header").addClass("show-nav");
						} else {
							$(".nav-header").removeClass("show-nav");
						}
					},
					afterRender: function () {
						$(".pagination a").on("click", function () {
							$.scrollify.move($(this).attr("href"));
						});
						$(".nav-menu li").on("click", function () {
							$.scrollify.move($(this).attr("data-href"));
						});
						$(".nav-list li a").on("click", function () {
							$.scrollify.move($(this).attr("href"));
						});
					}
				});
				$(".nav-list").on({
					mouseover: function () {
						$(".more-nav").addClass("show");
						$(".btn-nav").addClass("btn-show");
						$(".icon").addClass("icon-show");
					},
					mouseout: function () {
						$(".more-nav").removeClass("show");
						$(".btn-nav").removeClass("btn-show");
						$(".icon").removeClass("icon-show");
					}
				});
			});
		},
		methods: {
			handleClick(tab, event) {
				this.$nextTick(() => {
					setTimeout(function () {
						console.log(tab.$children[2].$refs)
						console.log(tab, '22222222222')
						tab.$children[2].$refs.pie.chart.resize();
					}, 1000);
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.pagination {
		position: fixed;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		font-size: 5px;
		z-index: 10;
		background: rgba(245, 245, 245, 0.9);
		border-radius: 9px;
	}

	.pagination a {
		display: block;
		height: 20px;
		margin-bottom: 5px;
		color: #3a5169;
		position: relative;
		padding: 4px;
	}

	.pagination a.active:after {
		box-shadow: inset 0 0 0 5px;
	}

	/* .pagination a .hover-text {
		position: absolute;
		right: 15px;
		top: 7px;
		opacity: 0;
		-webkit-transition: opacity 0.5s ease;
		transition: opacity 0.5s ease;
		padding-right: 15px;
	}

	.pagination a:hover .hover-text {
		opacity: 1;
	} */

	.pagination a:after {
		-webkit-transition: box-shadow 0.5s ease;
		transition: box-shadow 0.5s ease;
		width: 10px;
		height: 10px;
		display: block;
		border: 1px solid;
		border-radius: 50%;
		content: '';
		position: absolute;
		margin: auto;
		top: 0;
		right: 4px;
		bottom: 0;
	}

	.header,
	.footer {
		background: #eef1f6;
	}

	.inner {
		position: relative;
		height: 100%;
		width: 80%;
		margin: 0 auto;
	}

	p {
		font-size: 4em;
		line-height: 1.3;
	}

	.text {
		font-size: 14px;
	}

	.item {
		padding: 18px 0;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.clearspan {
		border-bottom: 1px solid #3a3a3a;
		padding: 10px 0;
	}

	.clearspan span {
		position: relative;
		right: 30%;
	}

	.components-container {
		margin: 30px 50px;
		position: relative;
	}

	.chart-container {
		/* position: relative; */
		width: 100%;
		height: 100%;
	}

	.select-one {
		top: 23px;
		right: 20%;
		z-index: 9999;
		position: relative;
		padding-right: 5px;
	}

	.nav-header {
		display: none;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 100;
	}

	.nav-li {
		float: right;
		width: 156px;
		position: relative;
		height: 84px;
	}

	.btn-nav {
		display: block;
		width: 136px;
		height: 38px;
		text-align: center;
		line-height: 38px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin: -19px 0 0 -68px;
		font-size: 16px;
		color: #2e2e2e;
		z-index: 6;
	}

	.more-nav {
		position: absolute;
		top: 0;
		right: -162px;
		width: 156px;
		height: 9999px;
		padding-top: 100px;
		background: rgba(0, 0, 0, .8);
		transition: right .3s;
		-webkit-transition: right .3s;
	}

	.more-nav ul {
		position: relative;
		z-index: 5;
	}

	.more-nav li {
		padding-bottom: 45px;
		position: relative;
	}

	.more-nav li p {
		font-size: 12px;
		color: #edf3ff;
	}

	.more-nav a {
		color: #c5c8d0;
		text-decoration: none;
	}

	.more-nav a:hover {
		color: #edf3ff;
		text-decoration: none;
	}

	.btn_snav {
		font-size: 18px;
		line-height: 24px;
		height: 24px;
		text-align: center;
		position: relative;
		display: block;
		color: #edf3ff;
	}

	.show-nav {
		display: block;
	}

	.show {
		right: 0;
	}

	.icon {
		background-image: url("../../../static/charts/black.png");
		display: inline-block;
		position: relative;
		background-repeat: no-repeat;
		cursor: pointer;
		height: 20px;
		width: 30px;
		top: 5px;
		right: 5px;
	}

	.line {
		height: 1px;
		width: 100%;
		background: #edf3ff;
		overflow: hidden;
		margin-top: 20px;
	}

	.btn-show {
		color: #edf3ff;
	}

	.icon-show {
		background-image: url("../../../static/charts/white.png");
	}
</style>