<template>
	<div class="headerWrapper">
		<header-View></header-View>
		<ul class="nav-menu">
			<li data-href="#third">周稽核报告</li>
			<li>日稽核报告</li>
			<li>信令详单</li>
			<li>互联网详单</li>
			<li>接口文件稽核</li>
		</ul>
		<section class="panel" data-section-name="home">
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
						<span class="hover-text">Header</span>
					</a>
				</li>
				<li>
					<a class="" href="#home">
						<span class="hover-text">Home</span>
					</a>
				</li>
				<li>
					<a class="" href="#second">
						<span class="hover-text">Second</span>
					</a>
				</li>
				<li>
					<a class="" href="#third">
						<span class="hover-text">Third</span>
					</a>
				</li>
				<li>
					<a class="" href="#fourth">
						<span class="hover-text">Fourth</span>
					</a>
				</li>
				<li>
					<a class="" href="#footer">
						<span class="hover-text">Footer</span>
					</a>
				</li>
			</ul>
		</section>
		<section class="panel" data-section-name="second" style="height: 150px;padding:20px;">
			<el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">

						<el-tab-pane label="用户管理" name="first">
										<internet-Chart></internet-Chart>
						</el-tab-pane>
						<el-tab-pane label="配置管理" name="second">
										<internet-Chart></internet-Chart>
						</el-tab-pane>
					  </el-tabs>

			</el-tabs>
		</section>
		<section class="panel panel2" data-section-name="third" style="height: 150px;">
		</section>
		<section class="panel panel3" data-section-name="fourth" style="height: 150px;">
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

	import headerView from '@/components/header/header'

	export default {
		components: { internetChart, scoreChart, matchingChart, invalidNumberChart, mapChart, headerView },
		data() {
			return {
				activeName2: 'first'
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
					},
					afterRender: function () {
						$(".pagination a").on("click", function () {
							$.scrollify.move($(this).attr("href"));
						});
						$(".nav-menu li").on("click", function () {
							$.scrollify.move($(this).attr("data-href"));
						});
					}
				});
			});
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.panel2 {
		background: #64a0d4;
		background: hsl(200, 60%, 55%);
	}

	.panel3 {
		background: #e14456;
		background: hsl(350, 92%, 59%);
	}

	.pagination {
		position: fixed;
		right: 20px;
		top: 50%;
		transform: translateY(-50%);

		font-size: 5px;
		z-index: 10;
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

	.pagination a .hover-text {
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
	}

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
</style>