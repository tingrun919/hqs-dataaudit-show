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
							<!-- <li>
								<a href="#day" class="btn_snav" data-href="#day">
								日稽核报告
								</a>
							</li> -->
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
						<!-- <div slot="header" class="clearfix">
							<span style="line-height: 36px;">本期（9.29-10.1）报告指标概括</span>
						</div> -->
						<el-row :gutter="20">
							<el-col :span="15">
								<internet-Chart :xaxislist='dataXaxis' :legendlist='dataLegend' :serieslist='dataSeriesList' :yaxislist='dataYaxis' :screenlist='dataScreen'></internet-Chart>
							</el-col>
							<el-col :span="9">
								<score-Chart :quotalist='scoreQuotaList' :screenlist='scoreScreenList'></score-Chart>
							</el-col>
						</el-row>
						<el-row :gutter="20">
							<el-col :span="15">
								<matching-Chart :xaxislist='matchXaxis' :legendlist='matchLegend' :serieslist='matchSeriesList' :yaxislist='matchYaxis' :screenlist='matchScreen'></matching-Chart>
							</el-col>
							<el-col :span="9" style="margin-top: -25px;">
								<invalidNumber-Chart :xaxislist='numberXaxis' :legendlist='numberLegend' :serieslist='numberSeriesList' :yaxislist='numberYaxis'
								 :screenlist='numberScreen'></invalidNumber-Chart>
							</el-col>
						</el-row>
					</el-card>
				</el-col>
				<el-col :span="7">
					<el-card>
						<map-Chart :quotalist='scoreQuotaList'></map-Chart>
					</el-card>
					<el-card class="card-style">
						<span slot="header">本期评价</span>
						<div>
							<p>
								{{screenContent}}
							</p>
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
				<li>
					<a class="" href="#day">
						<span class="hover-text"></span>
					</a>
				</li>
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
		<section class="panel" data-section-name="day">
			<el-row :gutter="5">
				<el-col :span="12">
					<el-row class="day-row">
						<el-col :span="8" class="day-col">
							<span style="line-height:28px;font-size:14px;">稽核范围</span>
						</el-col>
						<el-col :span="8" class="day-col">
							<el-select v-model="internetSelect" size="mini" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="8" v-if="internetSelect != 1">
							<el-select v-model="internetProv" size="mini" placeholder="请选择">
								<el-option v-for="item in internetProvList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="8" v-else>
							<el-select v-model="internetAcct" size="mini" placeholder="请选择">
								<el-option v-for="item in internetAcctList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
								</el-option>
							</el-select>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<internetChart-Day :xaxislist='internetDataXaxis' :legendlist='internetDataLegend' :serieslist='internetDataSeriesList' :yaxislist='internetDataYaxis'></internetChart-Day>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="12">
					<el-row class="day-row">
						<el-col :span="6" class="day-col">
							<span style="line-height:28px;font-size:14px;">稽核范围</span>
						</el-col>
						<el-col :span="6" class="day-col">
							<el-select v-model="signalingSelect" size="mini" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="6" class="day-col" v-if="signalingSelect != 1">
							<el-select v-model="signalingProv" size="mini" placeholder="请选择">
								<el-option v-for="item in internetProvList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="6" class="day-col" v-else>
							<el-select v-model="signalingAcct" size="mini" placeholder="请选择">
								<el-option v-for="item in signalingAcctList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							<el-select v-model="signalingSatype" size="mini" placeholder="请选择">
								<el-option label="cs" value="cs"></el-option>
								<el-option label="lte" value="lte"></el-option>
								<el-option label="ps" value="ps"></el-option>
							</el-select>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<signalingChart-Day :xaxislist='signalingDataXaxis' :legendlist='signalingDataLegend' :serieslist='signalingDataSeriesList'
							 :yaxislist='signalingDataYaxis'></signalingChart-Day>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
			<el-row :gutter="5">
				<el-col :span="12">
					<el-row>
						<el-col :span="6" class="day-col">
							<span style="line-height:28px;font-size:14px;">稽核范围</span>
						</el-col>
						<el-col :span="5" class="day-col">
							<el-select v-model="internetTimelySelect" size="mini" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="5" v-if="internetTimelySelect != 1">
							<el-select v-model="internetTimelyProv" size="mini" placeholder="请选择">
								<el-option v-for="item in internetProvList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="5" v-else>
							<el-select v-model="internetTimelyAcct" size="mini" placeholder="请选择">
								<el-option v-for="item in internetTimelyAcctList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="8">
							<el-switch style="display: block" v-model="isTime" active-color="#e6a23c" inactive-color="#13ce66" active-text="最大时间" inactive-text="平均时间">
							</el-switch>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
							<internetTimelyChart-Day :xaxislist='internetTimelyDataXaxis' :legendlist='internetTimelyDataLegend' :serieslist='internetTimelyDataSeriesList'
							 :yaxislist='internetTimelyDataYaxis'></internetTimelyChart-Day>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="12">
					<dynamicData-Chart :xaxislist='signalingTimelyDataXaxis' :legendlist='signalingTimelyDataLegend' :serieslist='signalingTimelyDataSeriesList'
					:yaxislist='signalingTimelyDataYaxis'></dynamicData-Chart>
				</el-col>
			</el-row>
		</section>
		<section class="panel" data-section-name="signaling" style="padding:20px;">
			<el-tabs v-model="signalingActive" type="border-card">
				<el-tab-pane v-for="item in signalingOptions" :label="item.tabName" :key='item.tabName' :name="item.tabName">
					<keep-alive>
						<tab-pane v-if='signalingActive==item.tabName' :tabId='item.tabId'></tab-pane>
					</keep-alive>
				</el-tab-pane>
			</el-tabs>
		</section>
		<section class="panel" data-section-name="internet" style="padding:20px;">
			<el-tabs v-model="internetActive" type="border-card" @tab-click="handleClick">
				<el-tab-pane v-for="item in internetOptions" :label="item.tabName" :key='item.tabName' :name="item.tabName">
					<keep-alive>
						<tab-pane v-if='internetActive==item.tabName' :tabId='item.tabId'></tab-pane>
					</keep-alive>
				</el-tab-pane>
			</el-tabs>
		</section>
		<section class="panel" data-section-name="interface" style="padding:20px;">
			<el-tabs v-model="interfaceActive" type="border-card">
				<el-tab-pane v-for="item in interfaceOptions" :label="item.tabName" :key='item.tabName' :name="item.tabName">
					<keep-alive>
						<tab-pane v-if='interfaceActive==item.tabName' :tabId='item.tabId'></tab-pane>
					</keep-alive>
				</el-tab-pane>
			</el-tabs>
		</section>
		<div class="footer" data-section-name="footer">
		<!-- <div class="inner">
				<p>Footer</p>
			</div> -->
		<footer-View></footer-View>
		</div>
		<div style="display:none;">
			<input type="text" name="" data-greeting="header" ref="inputref" id="kkk">
			<el-button @click="test" id="1">默认按钮</el-button>
		</div>
	</div>
</template>

<script>
	import internetChart from '@/components/Charts/internetChart'
	import scoreChart from '@/components/Charts/scoreChart'
	import matchingChart from '@/components/Charts/matchingChart'
	import invalidNumberChart from '@/components/Charts/invalidNumberChart'
	import mapChart from '@/components/Charts/mapChart'
	import testChart2 from '@/components/Charts/testChart2'
	import tabPane from '@/components/Charts/tabPane'
	import dynamicDataChart from '@/components/Charts/dynamicDataChart'
	import internetChartDay from '@/components/Charts/internetChartDay'
	import matchingChartDay from '@/components/Charts/matchingChartDay'
	import signalingChartDay from '@/components/Charts/signalingChartDay'
	import internetTimelyChartDay from '@/components/Charts/internetTimelyChartDay'


	import headerView from '@/components/header/header'
	import footerView from '@/components/footer/footer'

	import * as Cookies from "js-cookie";
	import indexService from '../../service/indexService'

	import Vue from 'vue'

	export default {
		mixins: [indexService],
		components: { internetChart, scoreChart, matchingChart, invalidNumberChart, mapChart, headerView, tabPane, footerView, dynamicDataChart, internetChartDay, matchingChartDay, signalingChartDay, internetTimelyChartDay },
		data() {
			return {
				signalingOptions: [],
				signalingActive: '',
				signalingId: '',

				internetOptions: [],
				internetActive: '',
				internetId: '',

				interfaceOptions: [],
				interfaceActive: '',
				interfaceId: '',

				scoreQuotaList: [],
				scoreScreenList: [],

				dataYaxis: [],
				dataSeriesList: [],
				dataXaxis: [],
				dataLegend: [],
				dataScreen: [],

				matchYaxis: [],
				matchSeriesList: [],
				matchXaxis: [],
				matchLegend: [],
				matchScreen: [],

				numberYaxis: [],
				numberSeriesList: [],
				numberXaxis: [],
				numberLegend: [],
				numberScreen: [],

				screenContent: '',

				options: [{
					value: '1',
					label: '日期'
				}, {
					value: '2',
					label: '地域'
				}],

				internetSelect: '1',
				internetProv: '',
				internetAcct: '',

				signalingSelect: '1',
				signalingProv: '',
				signalingAcct: '',
				signalingSatype:'cs',

				internetTimelySelect: '1',
				internetTimelyProv: '',
				internetTimelyAcct: '',


				internetProvList: [],
				internetAcctList: [],
				signalingAcctList: [],
				internetTimelyAcctList: [],

				internetDataYaxis: [],
				internetDataSeriesList: [],
				internetDataXaxis: [],
				internetDataLegend: [],

				signalingDataYaxis: [],
				signalingDataSeriesList: [],
				signalingDataXaxis: [],
				signalingDataLegend: [],

				internetTimelyDataYaxis: [],
				internetTimelyDataSeriesList: [],
				internetTimelyDataXaxis: [],
				internetTimelyDataLegend: [],

				signalingTimelyDataYaxis: [],
				signalingTimelyDataSeriesList: [],
				signalingTimelyDataXaxis: [],
				signalingTimelyDataLegend: [],

				isTime:true,
				
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

						$("#kkk").attr("data-greeting", ref);//设置值为Hello World
						$("#1").trigger("click");

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
			this.getWeekScore()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if (Cookies.get('orgId') && Cookies.get('disSort')) {
					vm.$router.push('/')
				} else {
					vm.$router.push('/login')
				}
			})
		},
		watch: {
			internetProv: function () {
				this.getInternetData(1, this.internetProv, '', '','')
			},
			internetAcct: function () {
				this.getInternetData(1, '', this.internetAcct, '','')
			},
			signalingProv: function () {
				this.getInternetData(2, this.signalingProv, '', '',this.signalingSatype)
			},
			signalingAcct: function () {
				this.getInternetData(2, '', this.signalingAcct, '',this.signalingSatype)
			},
			signalingSatype: function(){
				this.getInternetData(2, this.signalingProv, this.signalingAcct, '',this.signalingSatype)
			},
			internetTimelyProv: function () {
				this.getInternetData(3, this.internetTimelyProv, '', this.isTime ? 1 : 0)
			},
			internetTimelyAcct: function () {
				this.getInternetData(3, '', this.internetTimelyAcct, this.isTime ? 1 : 0)
			},
			isTime:function(){
				this.getInternetData(3, this.internetTimelyProv, this.internetTimelyAcct, this.isTime ? 1 : 0)
			}
		},
		methods: {
			test() {
				var ref = $("#kkk").attr("data-greeting");
				if (ref == "internet") {
					this.internetOptions = [],
						this.internetActive = '',
						this.internetId = '',
						this.getInternetTab(Cookies.get('orgId'), "1");
				} else if (ref == "signaling") {
					this.signalingOptions = [],
						this.signalingActive = '',
						this.signalingId = '',
						this.getInternetTab(Cookies.get('orgId'), "2");
				} else if (ref == "interface") {
					this.interfaceOptions = [],
						this.interfaceActive = '',
						this.interfaceId = '',
						this.getInternetTab(Cookies.get('orgId'), "3");
				} else if (ref == 'week') {
					this.getWeekScore()
				} else if (ref == 'day') {
					this.getDayAcctDate(1)
					this.getDayAcctDate(2)
					this.getDayAcctDate(3)
					this.getDayProv()
					this.getSignalingTimely()
				}
			},
			handleClick(tab, event) {
				// console.log()
				// this.getRange(Cookies.get('orgId'), this.interfaceId)
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

	.header {
		background: #eef1f6;
	}

	.footer {
		background: #999999;
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

	.el-badge__content.is-fixed {
		right: 24px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.select-one {
		font-size: 14px;
		right: 21%;
		z-index: 99;
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
		width: 140px;
		position: relative;
		height: 45px;
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
		background-image: url("../../assets/black.png");
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
		background-image: url("../../assets/white.png");
	}

	/* .el-tabs--border-card>.el-tabs__content {
		padding-bottom: 80px;
	} */

	.card-style {
		margin-top: 5px;
		padding: 10px;
		/* height: 300px; */
	}

	.card-style span {
		position: relative;
		right: 30%;
		top: 10%;
	}

	.card-style div {
		padding-top: 5px;
	}

	.card-style div p {
		padding: 0 11px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 18;
		-webkit-box-orient: vertical;
		font-size: 15px;
	}

	.day-row {
		padding-right: 15%;
	}

	.day-col {
		text-align: right;
		padding-right: 10px;
		line-height: 27px;
	}
</style>