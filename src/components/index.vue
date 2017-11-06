<template>
	<div class="headerWrapper">
		<header class="header" data-section-name="header">
			<div class="logo">
				<img src="../assets/logo.png" class="nav-logo">
				<span style="padding-left:5px;">
					<span style="padding-right:8px;">|</span>数据稽核应用平台</span>
			</div>
			<ul class="nav">
				<li class="nav-item"><a href="#/zh-CN/guide" class="">国庆节</a></li>
				<li class="nav-item">|</li>
				<li class="nav-item"><a href="#/zh-CN/component" class="">10月1日 星期二</a></li>
				<li class="nav-item">|</li>
				<li class="nav-item"><a href="#/zh-CN/resource" class="">12:00</a></li>
				<li class="nav-item">|</li>
				<li class="nav-item"><a href="#/zh-CN/resource" class="nav-link"></a>admin</a>
					<span class="arrow"></span>
					<ul class="nav-dropdown">
						<li><a href="https://vuejs.org/v2/guide/installation.html" class="nav-link" target="_blank">退出</a></li>
						<li><a href="https://br.vuejs.org/v2/guide/installation.html" class="nav-link" target="_blank">个人中心</a></li>
						<li><a href="https://fr.vuejs.org/v2/guide/installation.html" class="nav-link" target="_blank">二维码</a></li>
					</ul>
				</li>
			</ul>
		</header>
		<ul class="nav-menu">
			<li data-href="#third">周稽核报告</li>
			<li>日稽核报告</li>
			<li>信令详单</li>
			<li>互联网详单</li>
			<li>接口文件稽核</li>
		</ul>
		<section class="panel home" data-section-name="home" style="height: 150px;">

			<el-row :gutter="5">
				<el-col :span="17">
					<el-card class="weekly-report">
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
					<el-card class="evaluation-map">
						<div slot="header" class="clearfix">
								<map-Chart></map-Chart>
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
		<section class="panel panel1" data-section-name="second" style="height: 150px;">
				<!-- <map-Chart></map-Chart> -->
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

	export default {
		components: { internetChart, scoreChart, matchingChart, invalidNumberChart, mapChart },
		data() {
			return {

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
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.home {
		background: #6dcb94;
		background: hsl(158, 58%, 52%);
	}

	.panel1 {
		background: #ec8200;
		background: hsl(28, 100%, 52%);
	}

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

	.weekly-report {
		/* width: 60%; */
	}

	.evaluation-map {
		/* width: 30%; */
	}

	.chart-container {
		/* position: relative; */
		width: 100%;
		height: 100%;
	}
</style>