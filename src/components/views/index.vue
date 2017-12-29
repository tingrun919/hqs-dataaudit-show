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
								<p style="padding-top:30px;font-size:12spx;">
									{{name}}
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
							<span style="line-height: 36px;">本期（{{dataFormat}}）稽核报告</span>
						</div>
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
						<div style="height:300px;">
							<span>本期评价</span>
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
					<!-- <dynamicData-Chart :xaxislist='signalingTimelyDataXaxis' :legendlist='signalingTimelyDataLegend' :serieslist='signalingTimelyDataSeriesList'
					 :yaxislist='signalingTimelyDataYaxis'></dynamicData-Chart> -->
				</el-col>
			</el-row>
		</section>
		<section class="panel" data-section-name="signaling">
			<div class="inner">
				<div class="title-panel">
					<p class="panel-title">
						<span>1</span>信令详单
					</p>
				</div>
				<el-tabs v-model="signalingActive" type="border-card">
					<el-tab-pane v-for="item in signalingOptions" :label="item.tabName" :key='item.tabName' :name="item.tabName">
						<keep-alive>
							<tab-pane v-if='signalingActive==item.tabName' :tabId='item.tabId'></tab-pane>
						</keep-alive>
					</el-tab-pane>
				</el-tabs>
			</div>
		</section>
		<section class="panel" data-section-name="internet">
			<div class="inner">
				<div class="title-panel">
					<p class="panel-title">
						<span>1</span>互联网详单
					</p>
				</div>
				<el-tabs v-model="internetActive" type="border-card">
					<el-tab-pane v-for="item in internetOptions" :label="item.tabName" :key='item.tabName' :name="item.tabName">
						<keep-alive>
							<tab-pane v-if='internetActive==item.tabName' :tabId='item.tabId'></tab-pane>
						</keep-alive>
					</el-tab-pane>
				</el-tabs>
			</div>
		</section>
		<section class="panel" data-section-name="interface">
			<div class="inner">
				<div class="title-panel">
					<p class="panel-title">
						<span>1</span>借口文件稽核
					</p>
				</div>
				<el-tabs v-model="interfaceActive" type="border-card">
					<el-tab-pane v-for="item in interfaceOptions" :label="item.tabName" :key='item.tabName' :name="item.tabName">
						<keep-alive>
							<tab-pane v-if='interfaceActive==item.tabName' :tabId='item.tabId'></tab-pane>
						</keep-alive>
					</el-tab-pane>
				</el-tabs>
			</div>
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
		<el-button @click="handleData" v-show="false" id="buttonDialog"></el-button>
		<el-button @click="handleWeelData" v-show="false" id="dialogs"></el-button>
		<el-button @click="handleWorkflow" v-show="false" id="workflow"></el-button>
		<el-dialog title="样例数据" fullscreen :visible.sync="dialogTableVisible">
			<span>时间</span>
			<el-select size="small" v-model="sampletime" placeholder="请选择时间">
				<el-option v-for="item in sampletimeList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
				</el-option>
			</el-select>
			<span>地域</span>
			<el-select size="small" v-model="sampleprov" placeholder="请选择地域">
				<el-option v-for="item in sampleprovList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
				</el-option>
			</el-select>
			<span>数据域</span>
			<el-select size="small" v-model="sampledata" placeholder="请选择数据域">
				<el-option label="cs" value="cs"></el-option>
				<el-option label="lte" value="lte"></el-option>
				<el-option label="ps" value="ps"></el-option>
			</el-select>
			<el-button @click="handleDataYl" size="small" type="primary">查询</el-button>
			<el-table v-for="tables in datalist" stripe border :key="tables.acct_date" style="width: 100%;margin-top:20px;" max-height="500"
			 :data="tables">
				<el-table-column show-overflow-tooltip align="center" v-for="item in columnsName" :key="item.COLUMN_NAME" :property="item.COLUMN_NAME"
				 :label="item.COLUMN_COMMENT"></el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog title="报告列表" fullscreen :visible.sync="outerVisible">
			<el-table :data="weekly" stripe border style="width: 100%;margin-top:20px;">
				<el-table-column align="center" prop="mailId" label="报告编号">
				</el-table-column>
				<el-table-column align="center" prop="mailName" label="报告名称">
				</el-table-column>
				<el-table-column align="center" prop="mailCycle" label="报告周期">
					<template scope="scope">
						{{ scope.row.mailCycle == 1 ? '周' : '日' }}
					</template>
				</el-table-column>
				<el-table-column align="center" prop="mailAcctdate" label="账期">
				</el-table-column>
				<el-table-column align="center" prop="mailTime" label="发送时间">
				</el-table-column>
				<el-table-column align="center" prop="date" label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog fullscreen title="报告预览" :visible.sync="innerVisible" append-to-body>
				<div v-html="mailcontent"></div>
			</el-dialog>
		</el-dialog>
		<el-dialog title="我的工作流" fullscreen :modal-append-to-body="appendBody" :visible.sync="outerVisible2">
			<el-table :data="workflow" stripe border @expand-change="handleTask">
				<el-table-column fixed="left" type="expand" accordion>
					<template slot-scope="props">
						<el-steps :active="tasklength" align-center>
							<el-step v-for="(item,index) in taskflow" :key='item.muQuotaid' :title="index === 0 ? item.flow_time+'从'+item.STAFF_NAME+item.flow_state : item.flow_time+item.flow_state+'给'+item.STAFF_NAME"
							 :description="item.flow_event">
							</el-step>
						</el-steps>
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="quotaName" label="稽核指标名称"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="muMetricname" label="度量名称"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="warnLevel" label="预警级别"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskAcctdata" label="帐期"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="provname" label="省份"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskSatype" label="数据域"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="nowperson" label="现流转人"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskBegintime" label="开始时间"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskEndtime" label="结束时间"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskCuttime" label="截止时间"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskState" label="任务状态">
					<template scope="scope">
						{{ scope.row.taskState == 0 ? '无效任务' : scope.row.taskState == 1 ? '开始' : scope.row.taskState == 2 ? '进行中' : '结束' }}
					</template>
				</el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskContent" label="任务内容"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskScore" label="预警值"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskUp" label="预警上限"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskDown" label="预警下限"></el-table-column>
				<el-table-column align="center" property="taskNowperson" label="操作" width="240">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="taskStaff(scope.row,'send')" v-if="scope.row.taskNowperson == userId">指派</el-button>
						<el-button size="mini" type="primary" @click="taskStaff(scope.row,'back')" v-if="scope.row.taskNowperson == userId">退回</el-button>
						<el-button size="mini" type="primary" @click="taskStaff(scope.row,'success')" v-if="scope.row.taskNowperson == userId">完成</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog width="80%" title="详情流转" :visible.sync="innerVisible2" append-to-body>
				<el-row v-if="isShow != 'back'">
					<el-col :span="2" class="dialog-col col-right" :offset="3">
						<span style="line-height:28px;">发送</span>
					</el-col>
					<el-col :span="6">
						<el-select v-model="sendPerson" filterable placeholder="请选择人员">
							<el-option v-for="item in taskStaffs" :key="item.staffId" :label="item.staffName+'-'+item.orgName" :value="item.staffId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;" v-if="isShow != 'back'">
					<el-col :span="2" class="dialog-col col-right" :offset="3">
						<span style="line-height:28px;">抄送</span>
					</el-col>
					<el-col :span="16">
						<el-select style="width:100%;" v-model="copyPerson" multiple filterable reserve-keyword placeholder="请选择人员">
							<el-option v-for="item in taskStaffs" :key="item.staffId" :label="item.staffName+'-'+item.orgName" :value="item.staffId">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;" v-if="isShow == 'send'">
					<el-col :span="2" class="dialog-col col-right" :offset="3">
						<span style="line-height:28px;">截止时间</span>
					</el-col>
					<el-col :span="16">
						<el-date-picker v-model="cuttime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-col>
				</el-row>

				<el-row style="margin-top:20px;">
					<el-col :span="2" class="dialog-col col-right" :offset="3">
						<span style="line-height:28px;">内容</span>
					</el-col>
					<el-col :span="16">
						<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="tasktextarea">
						</el-input>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col :span="12" class="col-right">
						<el-button type="success" @click="sendTask">确定</el-button>
					</el-col>
					<el-col :span="12">
						<el-button type="danger" @click="innerVisible2 = false">取消</el-button>
					</el-col>
				</el-row>
			</el-dialog>
		</el-dialog>
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
	import mixChartService from '../../service/mixChartService'

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
				signalingSatype: 'cs',

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

				isTime: true,

				dialogTableVisible: false,
				outerVisible: false,
				innerVisible: false,
				outerVisible2: false,
				innerVisible2: false,
				sampletime: '',
				sampletimeList: [],
				sampleprov: '',
				sampleprovList: '',
				sampledata: 'cs',
				datalist: '',
				weekly: [],
				workflow: [],
				tasktextarea: '',
				isShow: '',
				taskStaffs: [],
				sendPerson: '',
				copyPerson: '',
				appendBody: false,
				mailcontent: '',
				cuttime: '',
				userId: Cookies.get('userid'),
				tasklength: 0,
				taskflow: [],
				name: Cookies.get('username') + '-' + Cookies.get('orgname'),
				dataFormat: '',

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
		// beforeRouteEnter(to, from, next) {
		// 	next(vm => {
		// 		if (Cookies.get('orgId') && Cookies.get('disSort')) {
		// 			vm.$router.push('/')
		// 		} else {
		// 			vm.$router.push('/login')
		// 		}
		// 	})
		// },
		watch: {
			internetProv: function () {
				this.getInternetData(1, this.internetProv, '', '', '')
			},
			internetAcct: function () {
				this.getInternetData(1, '', this.internetAcct, '', '')
			},
			signalingProv: function () {
				this.getInternetData(2, this.signalingProv, '', '', this.signalingSatype)
			},
			signalingAcct: function () {
				this.getInternetData(2, '', this.signalingAcct, '', this.signalingSatype)
			},
			signalingSatype: function () {
				this.getInternetData(2, this.signalingProv, this.signalingAcct, '', this.signalingSatype)
			},
			internetTimelyProv: function () {
				this.getInternetData(3, this.internetTimelyProv, '', this.isTime ? 1 : 0)
			},
			internetTimelyAcct: function () {
				this.getInternetData(3, '', this.internetTimelyAcct, this.isTime ? 1 : 0)
			},
			isTime: function () {
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
			handleWorkflow() {
				this.getWorkFlow(Cookies.get('userid'))
			},
			handleWeelData() {
				this.getWeeksData(Cookies.get('userid'))
			},
			handleData() {
				this.getSampleTime(Cookies.get('orgId'), this.tabId)
			},
			sendTask(row) {
				if (this.isShow == 'send') {
					this.sendTasktoPerson(this.taskIds, this.sendPerson, this.tasktextarea, this.cuttime, this.copyPerson)
				} else if (this.isShow == 'success') {
					this.successTask(this.taskIds, this.sendPerson, this.tasktextarea, this.copyPerson)
				} else {
					this.backTask(this.taskIds, this.tasktextarea)
				}

			},
			handleDataYl() {
				this.getSampleData(Cookies.get('orgId'), this.tabId, this.sampletime, this.sampleprov, this.sampledata)
			},
			handleTask(row) {
				this.getTaskFlow(row.taskId)
			},
			taskStaff(row, type) {
				this.taskIds = row.taskId;
				this.isShow = type
				this.getStaff()
			},
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

	.el-tabs--border-card {
		text-align: center;
		position: absolute;
		top: 47%;
		transform: translateY(-47%);
		width: 100%;
	}

	.card-style {
		margin-top: 5px;
		padding: 10px;
		height: 371px;
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

	.col-right {
		text-align: right;
		padding-right: 5px;
		line-height: 40px;
	}

	.panel-title {
		font-size: 18px;
		color: #5e6d82;
		position: relative;
		margin: auto;
		right: 47%;
	}

	.panel-title>span {
		background: #DA140C;
		color: #DA140C;
		padding: 0;
		margin: 0 5px;
	}

	.title-panel {
		text-align: center;
		position: absolute;
		top: 3%;
		transform: translateY(-3%);
		width: 100%;
	}
</style>