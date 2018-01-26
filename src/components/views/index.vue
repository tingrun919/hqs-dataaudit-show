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
							<!-- <li>
								<div class="line"></div>
								<p style="padding-top:30px;font-size:12spx;">
									{{name}}
								</p>
							</li> -->
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<section class="panel" data-section-name="week" element-loading-text="数据加载中" v-loading="loadingWeek">
			<div class="inner">
				<el-row style="padding:0;">
					<el-col :span="24">
						<span class="current-report">本期（
							<span> {{dataFormat}} </span>）稽核报告</span>
					</el-col>
				</el-row>
				<el-row style="padding:0;" :gutter="10">
					<el-col :span="12">
						<el-card>
							<internet-Chart :xaxislist='dataXaxis' :height="viewHeight" :legendlist='dataLegend' :serieslist='dataSeriesList' :yaxislist='dataYaxis'
							 :screenlist='dataScreen'></internet-Chart>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card>
							<score-Chart :quotalist='scoreQuotaList' :height="viewHeight" :screenlist='scoreScreenList'></score-Chart>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card style="padding-right:10px;">
							<map-Chart :quotalist='scoreQuotaList' :height="viewHeight"></map-Chart>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-card>
							<matching-Chart :xaxislist='matchXaxis' :height="viewHeight" :legendlist='matchLegend' :serieslist='matchSeriesList' :yaxislist='matchYaxis'
							 :screenlist='matchScreen'></matching-Chart>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card>
							<invalidNumber-Chart :xaxislist='numberXaxis' :height="viewHeight" :legendlist='numberLegend' :serieslist='numberSeriesList'
							 :yaxislist='numberYaxis' :screenlist='numberScreen'></invalidNumber-Chart>
						</el-card>
					</el-col>
					<el-col :span="6">
						<el-card class="card-style">
							<span>【本期评价】</span>
							<div :style="{height:viewHeight}" style="overflow-y: auto;margin-bottom:-25px;margin-top:10px;padding-right:10px;">
								<p v-html="screenContent">
								</p>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</div>
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
			</ul>
		</section>
		<section class="panel" data-section-name="day" element-loading-text="数据加载中" v-loading="loadingDay">
			<div class="inner">
				<el-row :gutter="10">
					<el-col :span="12">
						<el-card>
							<el-row class="day-row">
								<el-col :span="8" class="day-col">
									<span style="line-height:28px;font-size:15px;">稽核范围:</span>
								</el-col>
								<el-col :span="8" class="day-col">
									<el-select v-model="internetSelect" size="mini" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="8" class="day-col" v-if="internetSelect != 1">
									<el-select v-model="internetProv" size="mini" placeholder="请选择">
										<el-option v-for="item in internetProvList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="8" class="day-col" v-else>
									<el-select v-model="internetAcct" size="mini" placeholder="请选择">
										<el-option v-for="item in internetAcctList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
										</el-option>
									</el-select>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<internetChart-Day :xaxislist='internetDataXaxis' :height="viewHeightDay" :tabrange="internetSelect" :legendlist='internetDataLegend'
									 :serieslist='internetDataSeriesList' :yaxislist='internetDataYaxis'></internetChart-Day>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span="12">
						<el-card>
							<el-row class="day-row">
								<el-col :span="6" class="day-col-satype">
									<span style="line-height:28px;font-size:14px;">稽核范围:</span>
								</el-col>
								<el-col :span="6" class="day-col-satype">
									<el-select v-model="signalingSelect" size="mini" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="6" class="day-col-satype" v-if="signalingSelect != 1">
									<el-select v-model="signalingProv" size="mini" placeholder="请选择">
										<el-option v-for="item in internetProvList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="6" class="day-col-satype" v-else>
									<el-select v-model="signalingAcct" size="mini" placeholder="请选择">
										<el-option v-for="item in signalingAcctList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="6">
									<el-select class="day-col-satype" v-model="signalingSatype" size="mini" placeholder="请选择">
										<el-option label="cs" value="cs"></el-option>
										<el-option label="lte" value="lte"></el-option>
										<el-option label="ps" value="ps"></el-option>
									</el-select>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<signalingChart-Day :xaxislist='signalingDataXaxis' :height="viewHeightDay" :tabrange="signalingSelect" :legendlist='signalingDataLegend'
									 :serieslist='signalingDataSeriesList' :yaxislist='signalingDataYaxis'></signalingChart-Day>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="12">
						<el-card>
							<el-row class="day-row">
								<el-col :span="4" class="day-col-switch">
									<span style="line-height:28px;font-size:14px;">稽核范围:</span>
								</el-col>
								<el-col :span="5" class="day-col-switch">
									<el-select v-model="internetTimelySelect" size="mini" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="5" class="day-col-switch" v-if="internetTimelySelect != 1">
									<el-select v-model="internetTimelyProv" size="mini" placeholder="请选择">
										<el-option v-for="item in internetProvList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="5" class="day-col-switch" v-else>
									<el-select v-model="internetTimelyAcct" size="mini" placeholder="请选择">
										<el-option v-for="item in internetTimelyAcctList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="10" class="day-col-switch">
									<el-switch style="display: block" v-model="isTime" active-color="#20A0FF" inactive-color="#13ce66" active-text="最大时间" inactive-text="平均时间">
									</el-switch>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<internetTimelyChart-Day :xaxislist='internetTimelyDataXaxis' :height="viewHeightDay" :tabrange="internetTimelySelect" :legendlist='internetTimelyDataLegend'
									 :serieslist='internetTimelyDataSeriesList' :yaxislist='internetTimelyDataYaxis'></internetTimelyChart-Day>
								</el-col>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span="12">
						<el-card :style="{height:viewHeightDaySignaling}">
							<el-row class="day-row-time ">
								<el-col :span="6" class="day-col" style="text-align:right;">
									<span style="line-height:28px;font-size:15px;">账期:</span>
								</el-col>
								<el-col :span="8" class="day-col" style="text-align:left;">
									<el-select v-model="signalingTimeliness" size="mini">
										<el-option label="请选择" value="">
										</el-option>
										<el-option v-for="item in signalingTimelinessList" :key="item.acctdate" :label="item.acctdate" :value="item.acctdate">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="10" class="day-col">
									<el-button-group>
										<el-button type="primary" size="mini" @click="handleViewSingaling" icon="el-icon-zoom-in">查询</el-button>
										<el-button type="primary" size="mini" @click="handleDataDownloadSignling" icon="el-icon-download">下载</el-button>
										<a :href="downUrl" target='blank' style="display:none;">
											<span id="downloadSignling">下载</span>
										</a>
									</el-button-group>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24" style="padding-right:20px;">
									<el-table :data="signalingTimelinessTable" @row-click="handleView" stripe :height="viewHeightDayTable" border style="width: 100%">
										<el-table-column fixed="left" show-overflow-tooltip align="center" prop="acct_date" label="账期" width="90">
										</el-table-column>
										<el-table-column fixed="left" show-overflow-tooltip align="center" prop="prov_name" width="70" label="省份">
										</el-table-column>
										<el-table-column show-overflow-tooltip align="center" label="CS">
											<el-table-column show-overflow-tooltip align="center" prop="CSnumber" label="中断次数">
											</el-table-column>
											<el-table-column show-overflow-tooltip align="center" prop="CStime" label="中断时长">
											</el-table-column>
										</el-table-column>
										<el-table-column show-overflow-tooltip align="center" label="PS">
											<el-table-column show-overflow-tooltip align="center" prop="PSnumber" label="中断次数">
											</el-table-column>
											<el-table-column show-overflow-tooltip align="center" prop="PStime" label="中断时长">
											</el-table-column>
										</el-table-column>
										<el-table-column show-overflow-tooltip align="center" label="LTE">
											<el-table-column show-overflow-tooltip align="center" prop="LTEnumber" label="中断次数">
											</el-table-column>
											<el-table-column show-overflow-tooltip align="center" prop="LTEtime" label="中断时长">
											</el-table-column>
										</el-table-column>
										<!-- <el-table-column show-overflow-tooltip align="center" label="操作">
											<template slot-scope="scope">
												<el-button size="mini" @click="handleView(scope.row)" type="success">查看</el-button>
											</template>
										</el-table-column> -->
									</el-table>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<span style="color:#0c8fcf;font-size:14px;">信令文件延时性</span>
								</el-col>
							</el-row>
							<el-dialog title="信令延时性" @close="dialogEnable" :visible.sync="signalingdialog">
								<el-table :data="signalingTimelinessDetail" stripe border>
									<el-table-column type="index" :index="indexMethod" label="序号" width="60"></el-table-column>
									<el-table-column align="center" width="100" property="acct_date" label="账期"></el-table-column>
									<el-table-column align="center" property="prov_name" label="省份"></el-table-column>
									<el-table-column align="center" property="sa_type" label="数据域"></el-table-column>
									<el-table-column align="center" property="ventor_desc" label="厂商"></el-table-column>
									<el-table-column align="center" show-overflow-tooltip property="interface_desc" label="接口"></el-table-column>
									<el-table-column align="center" width="100" property="longtime" label="中断时间"></el-table-column>
									<el-table-column align="center" property="time" label="中断时长"></el-table-column>
								</el-table>
							</el-dialog>
						</el-card>
					</el-col>
				</el-row>
			</div>
		</section>
		<section class="panel" data-section-name="signaling">
			<div class="inner">
				<div class="title-panel">
					<p class="panel-title">
						<span>1</span>信令详单
					</p>
				</div>
				<el-tabs v-model="signalingActive" type="border-card" @tab-click="handlesetTabid">
					<el-tab-pane v-for="item in signalingOptions" :label="item.tabName" :key='item.tabName' :name="item.tabId">
						<keep-alive>
							<tab-pane v-if='signalingActive==item.tabId'></tab-pane>
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
				<el-tabs v-model="internetActive" type="border-card" @tab-click="handlesetTabid">
					<el-tab-pane v-for="item in internetOptions" :label="item.tabName" :key='item.tabName' :name="item.tabId">
						<keep-alive>
							<tab-pane v-if='internetActive==item.tabId'></tab-pane>
						</keep-alive>
					</el-tab-pane>
				</el-tabs>
			</div>
		</section>
		<section class="panel" data-section-name="interface">
			<div class="inner">
				<div class="title-panel">
					<p class="panel-title">
						<span>1</span>接口文件稽核
					</p>
				</div>
				<el-tabs v-model="interfaceActive" type="border-card" @tab-click="handlesetTabid">
					<el-tab-pane v-for="item in interfaceOptions" :label="item.tabName" :key='item.tabName' :name="item.tabId">
						<keep-alive>
							<tab-pane v-if='interfaceActive==item.tabId'></tab-pane>
						</keep-alive>
					</el-tab-pane>
				</el-tabs>
				<el-row class="subtitle">
					<el-col :span="24">
						<div class="grid-content">
							<p class="footer-title">©️版权所有 中国联通</p>
							<p class="footer-subtitle">建设单位：联通系统集成有限公司 山东省分公司</p>
						</div>
					</el-col>
				</el-row>
			</div>
		</section>
		<div style="display:none;">
			<input type="text" name="" data-greeting="header" ref="inputref" id="scrollData">
			<el-button @click="triggerScroll" id="1">默认按钮</el-button>
		</div>
		<el-button @click="handleDatas" v-show="false" id="buttonDialog"></el-button>
		<el-button @click="handleWeekData" v-show="false" id="dialogs"></el-button>
		<el-button @click="handleWorkflow" v-show="false" id="workflow"></el-button>
		<el-button @click="handleMapDetail" v-show="false" id="mapDetail"></el-button>
		<el-button @click="handleQuota" v-show="false" id="quotaDialog"></el-button>
		<el-dialog title="样例数据" :modal="isModal" @close="dialogEnable" fullscreen :visible.sync="dialogTableVisible">
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
			<span v-if="isSatype">数据域</span>
			<el-select size="small" v-if="isSatype" v-model="sampledata" placeholder="请选择数据域">
				<el-option label="cs" value="cs"></el-option>
				<el-option label="lte" value="lte"></el-option>
				<el-option label="ps" value="ps"></el-option>
			</el-select>
			<el-button @click="handleDataYl" size="small" type="primary">查询</el-button>
			<el-button @click="handleDataDownload" size="small" type="success">下载</el-button>
			<a :href="downUrl" target='blank' style="display:none;">
				<span id="download">下载</span>
			</a>
			<h1 style="margin-top:20px;" v-for="(name,index) in sdtnName">
				<span style="font-weight:bold;font-size:16px;">{{index+1 +'、'+ name.TABLE_COMMENT}}</span>
				<el-table v-if="index == indexs" v-for="(tables,indexs) in datalist" stripe border :key="tables.acct_date" style="width: 100%;margin-top:20px;"
				 max-height="500" :data="tables">
					<el-table-column show-overflow-tooltip align="center" v-for="item in columnsName[indexs]" :key="item.column_NAME" :property="item.column_NAME"
					 :label="item.column_COMMENT"></el-table-column>
				</el-table>
			</h1>
		</el-dialog>
		<el-dialog title="报告列表" @close="dialogEnable" fullscreen :modal="isModal" :visible.sync="outerVisible">
			<div class="block">
				<span class="demonstration">账期</span>
				<el-date-picker v-model="value1" type="date" placeholder="选择起始日期">
				</el-date-picker>
				<span class="demonstration">—</span>
				<el-date-picker v-model="value2" type="date" placeholder="选择结束日期">
				</el-date-picker>
				<el-button @click="handleWeekData" type="primary">查询</el-button>
			</div>
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
		<el-dialog title="我的工作流" @close="dialogEnable" fullscreen :modal="isModal" :modal-append-to-body="appendBody" :visible.sync="outerVisible2">
			<el-row>
				<el-col :span="12" style="text-align:right;">
					<span class="demonstration">账期</span>
					<el-date-picker size="small" v-model="value3" type="date" placeholder="选择起始日期">
					</el-date-picker>
					<span class="demonstration">—</span>
					<el-date-picker size="small" v-model="value4" type="date" placeholder="选择结束日期">
					</el-date-picker>
				</el-col>
				<el-col :span="12" style="text-align:left;">
					<span>省份</span>
					<el-select v-model="workflowProv" size="mini">
						<el-option label="请选择" value="">
						</el-option>
						<el-option v-for="item in internetProvList" :key="item.prov_id" :label="item.prov_name" :value="item.prov_id">
						</el-option>
					</el-select>
					<span>状态</span>
					<el-select size="small" v-model="workflowState" placeholder="请选择状态">
						<el-option label="请选择" value="">
						</el-option>
						<el-option label="进行中" value="2">
						</el-option>
						<el-option label="已完成" value="3">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12" style="padding-left:7%;">
					<span>指标</span>
					<el-input v-model="worlkflowzhibiao" placeholder="请输入内容" size="small" style="width:40%;"></el-input>
				</el-col>
				<el-col :span="12" style="text-align:left;">
					<el-checkbox v-model="checked">只显示现流转人是我的任务</el-checkbox>
					<el-button @click="handleWorkflow" type="primary" size="small" style="margin-left:8%;">查询</el-button>
				</el-col>
			</el-row>
			<el-table :data="workflow" stripe border @expand-change="handleTask" :row-key="getRowKeys" :expand-row-keys="expands">
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
				<el-table-column show-overflow-tooltip align="center" property="taskAcctdata" label="账期"></el-table-column>
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
				<el-table-column show-overflow-tooltip align="center" property="taskValue" label="预警值"></el-table-column>
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
			<el-dialog width="80%" @close="dialogEnable" title="详情流转" :visible.sync="innerVisible2" append-to-body>
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
		<el-dialog title="扣分详情" @close="dialogEnable" :visible.sync="dialogMapDetail">
			<el-table stripe border show-summary :summary-method="getSummaries" :data="dialogMapDetailData">
				<el-table-column show-overflow-tooltip align="center" property="taskId" label="编码"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="provname" label="省份"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskAcctdata" label="账期"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="quotaName" label="指标"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="muMetricname" label="度量"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskSatype" label="数据域"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskValue" label="当前值"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskUp" label="阈值上限"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskDown" label="阈值下限"></el-table-column>
				<el-table-column show-overflow-tooltip align="center" property="taskScore" label="扣分值"></el-table-column>
			</el-table>
		</el-dialog>
		<el-dialog :title="quotaTitle" @close="dialogEnable" :visible.sync="dialogQuota">
			<span v-for="item in quota">
				{{item.muMetricname +':'+ item.quotaCaliber}}<br /><br />
			</span>
		</el-dialog>
	</div>
</template>

<script>
	//导入组建
	import internetChart from '@/components/Charts/internetChart'
	import scoreChart from '@/components/Charts/scoreChart'
	import matchingChart from '@/components/Charts/matchingChart'
	import invalidNumberChart from '@/components/Charts/invalidNumberChart'
	import mapChart from '@/components/Charts/mapChart'
	import tabPane from '@/components/Charts/tabPane'
	import internetChartDay from '@/components/Charts/internetChartDay'
	import matchingChartDay from '@/components/Charts/matchingChartDay'
	import signalingChartDay from '@/components/Charts/signalingChartDay'
	import internetTimelyChartDay from '@/components/Charts/internetTimelyChartDay'

	//导入头部底部
	import headerView from '@/components/header/header'
	//导入service
	import * as Cookies from "js-cookie";
	import indexService from '../../service/indexService'
	import mixChartService from '../../service/mixChartService'

	import Vue from 'vue'

	export default {
		mixins: [indexService, mixChartService],
		components: { internetChart, scoreChart, matchingChart, invalidNumberChart, mapChart, headerView, tabPane, internetChartDay, matchingChartDay, signalingChartDay, internetTimelyChartDay },
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
				signalingTimeliness: '',

				internetProvList: [],
				internetAcctList: [],
				signalingAcctList: [],
				internetTimelyAcctList: [],
				signalingTimelinessList: [],
				signalingTimelinessTable: [],
				signalingTimelinessDetail: [],

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

				isTime: false,

				dialogTableVisible: false,
				outerVisible: false,
				innerVisible: false,
				outerVisible2: false,
				innerVisible2: false,
				dialogMapDetail: false,
				dialogMapDetailData: [],
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

				isModal: false,
				isSatype: false,

				columnsName: [],
				datalist: [],
				sdtnName: [],
				downUrl: '',

				getRowKeys(row) {
					return row.taskId;
				},
				expands: [],
				quota: [],
				quotaTitle: '',

				signalingdialog: false,

				loadingWeek: false,

				loadingDay: false,

				dialogQuota: false,

				isDayData: '',
				isInterface: '',
				isSignaling: '',
				isInternet: '',

				value1: new Date() - 3600 * 1000 * 24 * 7,
				value2: new Date(),

				value3: new Date() - 3600 * 1000 * 24 * 7,
				value4: new Date(),

				checked: false,
				workflowProv: '',
				workflowState: '',
				worlkflowzhibiao:'',
			}
		},
		beforeMount() {
			//js控制鼠标滚动翻页事件
			$(function () {
				//控制IE加载错误的问题
				function reurl() {
					var url = location.href; //把当前页面的地址赋给变量 url 
					var times = url.split("?"); //分切变量 url 分隔符号为 "?" 
					if (times[1] == 'borwerAgent=InternetExplorer') { //如果?后的值不等于borwerAgent=InternetExplorer表示没有刷新 
						url += "?1"; //把变量 url 的值加入 ?borwerAgent=InternetExplorer 
						self.location.replace(times[0]); //刷新页面 
					}
				}
				reurl()
				$.scrollify({
					section: ".panel",
					scrollbars: false,
					interstitialSection: ".header",
					before: function (i, panels) {

						var ref = panels[i].attr("data-section-name");

						$(".pagination .active").removeClass("active");

						$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");

						$("#scrollData").attr("data-greeting", ref);//设置值为Hello World
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
			//获取周报数据
			this.getWeekScore()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if (Cookies.get('orgId') && Cookies.get('disSort')) {
					// vm.$router.push('/')
				} else {
					vm.$router.push('/login')
				}
			})
		},
		//观察者
		//控制日报的数据处理
		watch: {
			internetSelect: function () {
				this.internetAcct = ''
				this.internetProv = ''
			},
			signalingSelect: function () {
				this.signalingProv = ''
				this.signalingAcct = ''
			},
			internetTimelySelect: function () {
				this.internetTimelyProv = ''
				this.internetTimelyAcct = ''
			},
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
				this.getInternetData(3, this.internetTimelyProv, '', this.isTime ? 1 : 0, '')
			},
			internetTimelyAcct: function () {
				this.getInternetData(3, '', this.internetTimelyAcct, this.isTime ? 1 : 0, '')
			},
			isTime: function () {
				this.getInternetData(3, this.internetTimelyProv, this.internetTimelyAcct, this.isTime ? 1 : 0, '')
			}
		},
		computed: {
			viewHeight: function () {
				return (window.innerHeight - 140) / 2 + 'px'
			},
			viewHeightDay: function () {
				return (window.innerHeight - 220) / 2 + 'px'
			},
			viewHeightDaySignaling: function () {
				return (window.innerHeight - 40) / 2 + 'px'
			},
			viewHeightDayTable: function () {
				return (window.innerHeight - 280) / 2
			},
		},
		methods: {
			//处理鼠标滑动到某个页面时候触发的方法
			triggerScroll() {
				var ref = $("#scrollData").attr("data-greeting");
				//互联网
				if (ref == "internet") {
					Cookies.set('isTabType', 'internet')
					if (this.isInternet == '') {
						this.internetOptions = [],
							this.internetActive = '',
							this.internetId = '',
							this.getInternetTab(Cookies.get('orgId'), "1");
						this.isInternet = 'already'
					}

					//信令
				} else if (ref == "signaling") {
					Cookies.set('isTabType', 'signaling')
					if (this.isSignaling == '') {
						this.signalingOptions = [],
							this.signalingActive = '',
							this.signalingId = '',
							this.getInternetTab(Cookies.get('orgId'), "2");
						this.isSignaling = 'already'
					}

					//接口
				} else if (ref == "interface") {
					Cookies.set('isTabType', 'interface')
					if (this.isInterface == '') {
						this.interfaceOptions = [],
							this.interfaceActive = '',
							this.interfaceId = '',
							this.getInternetTab(Cookies.get('orgId'), "3");
						this.isInterface = 'already'
					}
					//周报
				} else if (ref == 'week') {
					// this.getWeekScore()
					//日报
				} else if (ref == 'day') {
					if (this.isDayData == '') {
						this.getDayAcctDate(1)
						this.getDayAcctDate(2)
						this.getDayAcctDate(3)
						this.getDayAcctDate(4)
						this.getDayProv()
						this.getSignalingTimely()
						this.getSignalingTimeliness(this.signalingTimeliness)
						this.isDayData = 'already'
					}
				}
			},
			//获取工作流数据
			handleWorkflow() {
				$.scrollify.disable();
				this.getWorkFlow(Cookies.get('userid'), Cookies.get('loginname'),this.workflowProv,this.workflowState,this.value3,this.value4,this.worlkflowzhibiao,this.checked)
			},
			//获取周报数据
			handleWeekData() {
				$.scrollify.disable();
				this.getWeeksData(Cookies.get('userid'), Cookies.get('loginname'), this.value1, this.value2)
			},
			//获取样例数据
			handleDatas() {
				$.scrollify.disable();
				if (Cookies.get('isTabType') == 'internet') {
					this.getSampleTime(Cookies.get('orgId'), Cookies.get('internetTabid'), Cookies.get('loginname'))
				} else if (Cookies.get('isTabType') == 'signaling') {
					this.getSampleTime(Cookies.get('orgId'), Cookies.get('signalingTabid'), Cookies.get('loginname'))
				} else if (Cookies.get('isTabType') == 'interface') {
					this.getSampleTime(Cookies.get('orgId'), Cookies.get('interfaceTabid'), Cookies.get('loginname'))
				}
			},
			//发送任务
			sendTask(row) {
				if (this.isShow == 'send') {
					this.sendTasktoPerson(this.taskIds, this.sendPerson, this.tasktextarea, this.cuttime, this.copyPerson)
				} else if (this.isShow == 'success') {
					this.successTask(this.taskIds, this.sendPerson, this.tasktextarea, this.copyPerson)
				} else {
					this.backTask(this.taskIds, this.tasktextarea)
				}

			},
			//获取样例数据
			handleDataYl() {
				if (Cookies.get('isTabType') == 'internet') {
					this.getSampleData(Cookies.get('loginname'), Cookies.get('orgId'), Cookies.get('internetTabid'), this.sampletime, this.sampleprov, this.isSatype ? this.sampledata : '')
				} else if (Cookies.get('isTabType') == 'signaling') {
					this.getSampleData(Cookies.get('loginname'), Cookies.get('orgId'), Cookies.get('signalingTabid'), this.sampletime, this.sampleprov, this.isSatype ? this.sampledata : '')
				} else if (Cookies.get('isTabType') == 'interface') {
					this.getSampleData(Cookies.get('loginname'), Cookies.get('orgId'), Cookies.get('interfaceTabid'), this.sampletime, this.sampleprov, this.isSatype ? this.sampledata : '')
				}
			},
			handleDataDownload() {
				//控制satype
				const satype = this.isSatype ? this.sampledata : ''
				if (Cookies.get('isTabType') == 'internet') {
					var tabid = Cookies.get('internetTabid')
				} else if (Cookies.get('isTabType') == 'signaling') {
					var tabid = Cookies.get('signalingTabid')
				} else if (Cookies.get('isTabType') == 'interface') {
					var tabid = Cookies.get('interfaceTabid')
				}
				//正式下载路径
				this.downUrl = "http://10.162.26.141:8080/dataaudit_show/usertab/downExcel?orgid=" + Cookies.get('orgId') + "&tabid=" + tabid + "&acctdate=" + this.sampletime + "&provid=" + this.sampleprov + "&satype=" + satype + "&usercount=" + Cookies.get('loginname')
				//处理a按钮操作下载，定时器500ms后触发
				setTimeout(() => {
					$("#download").trigger("click")
				}, 500);
			},
			//信令及时性下载
			handleDataDownloadSignling() {
				//正式下载路径
				this.downUrl = "http://10.162.26.141:8080/dataaudit_show/email/downRibao?acctdate=" + this.signalingTimeliness + "&usercount=" + Cookies.get('loginname')
				//处理a按钮操作下载，定时器500ms后触发
				setTimeout(() => {
					$("#downloadSignling").trigger("click")
				}, 500);
			},
			//处理工作流点击只展开一行
			handleTask(row) {
				if (this.expands[0] == row.taskId) {
					this.expands = [];
				} else {
					this.expands = [];
					this.expands.push(row.taskId);
				}
				this.getTaskFlow(row.taskId)
			},
			//控制信令及时性显示序号
			indexMethod(index) {
				return index + 1;
			},
			// 工作流的操作
			// 通过不同的type控制不同的操作
			// back：退回
			// success：成功
			// send：指派
			taskStaff(row, type) {
				this.taskIds = row.taskId;
				this.isShow = type
				this.getStaff()
			},
			//显示信令及时性详情
			handleView(row, event, column) {
				$.scrollify.disable();
				this.getSignalingTimeDetail(row.acct_date, row.prov_id);
			},
			//显示信令及时性
			handleViewSingaling() {
				this.getSignalingTimeliness(this.signalingTimeliness)
			},
			handleEdit(index, row) {
				this.mailcontent = row.mailContent
				this.innerVisible = true
			},
			handleMapDetail() {
				$.scrollify.disable();
				this.getMapDetailData(Cookies.get('cityName'), Cookies.get('loginname'));
			},
			dialogEnable() {
				$.scrollify.enable();
			},
			getSummaries(param) {
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计';
						return;
					}
					if (index === 9) {
						const values = data.map(item => Number(item[column.property]));
						if (!values.every(value => isNaN(value))) {
							sums[index] = values.reduce((prev, curr) => {
								const value = Number(curr);
								if (!isNaN(value)) {
									return prev + curr;
								} else {
									return prev;
								}
							}, 0);
							sums[index] += '分';
						} else {
							sums[index] = '-';
						}
					}

				});

				return sums;
			},
			handlesetTabid(tab) {
				if (Cookies.get('isTabType') == 'internet') {
					Cookies.set('internetTabid', tab.name)
				} else if (Cookies.get('isTabType') == 'signaling') {
					Cookies.set('signalingTabid', tab.name)
				} else if (Cookies.get('isTabType') == 'interface') {
					Cookies.set('interfaceTabid', tab.name)
				}
			},
			handleQuota() {
				$.scrollify.disable();
				if (Cookies.get('isTabType') == 'internet') {
					for (var i = 0; i < this.internetOptions.length; i++) {
						if (this.internetOptions[i].tabId == Cookies.get('internetTabid')) {
							this.quotaTitle = this.internetOptions[i].tabName
						}
					}
					this.getQuota(Cookies.get('orgId'), Cookies.get('internetTabid'))
				} else if (Cookies.get('isTabType') == 'signaling') {
					for (var i = 0; i < this.signalingOptions.length; i++) {
						if (this.signalingOptions[i].tabId == Cookies.get('signalingTabid')) {
							this.quotaTitle = this.signalingOptions[i].tabName
						}
					}
					this.getQuota(Cookies.get('orgId'), Cookies.get('signalingTabid'))
				} else if (Cookies.get('isTabType') == 'interface') {
					for (var i = 0; i < this.interfaceOptions.length; i++) {
						if (this.interfaceOptions[i].tabId == Cookies.get('interfaceTabid')) {
							this.quotaTitle = this.interfaceOptions[i].tabName
						}
					}
					this.getQuota(Cookies.get('orgId'), Cookies.get('interfaceTabid'))
				}
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

	.inner {
		position: relative;
		/* height: 100%; */
		width: 80%;
		margin: 0 auto;
		min-height: 100%;
	}

	p {
		/* font-size: 4em; */
		line-height: 1.3;
	}

	.text {
		font-size: 14px;
	}

	.el-badge__content.is-fixed {
		right: 24px;
		top: 28px;
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

	p {
		line-height: 14px;
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
		background: rgba(218, 20, 12, .8);
		transition: right .3s;
		-webkit-transition: right .3s;
	}

	.more-nav ul {
		position: relative;
		z-index: 5;
		top: 2%;
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
		/* color: #c5c8d0; */
		color: #edf3ff;
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

	.card-style span {
		top: 52%;
		position: relative;
		width: 100%;
		font-size: 15px;
		font-weight: 500;
		display: inline-block;
		text-align: left;
	}

	.card-style div p {
		padding-bottom: 15px;
		white-space: pre-wrap;
		white-space: -moz-pre-wrap;
		white-space: -pre-wrap;
		white-space: -o-pre-wrap;
		word-wrap: break-word;
		text-align: left;
		font-size: 15px;
	}

	.day-row {
		display: inline-block;
		position: relative;
		padding-top: 10px;
	}

	.day-col {
		text-align: center;
		padding-right: 10px;
		/* width: 30%; */
	}

	.day-col-satype {
		text-align: right;
		padding-right: 10px;
	}

	.day-col-switch {
		text-align: center;
		padding-right: 10px;
	}

	.el-switch {
		line-height: 23px;
	}

	.col-right {
		text-align: right;
		padding-right: 5px;
		line-height: 40px;
	}

	.panel {
		background: #f4f4f4;
		position: relative;
	}

	.panel-title {
		font-size: 18px;
		color: #5e6d82;
	}

	.panel-title>span {
		background: #DA140C;
		color: #DA140C;
		padding: 0;
		margin: 0 5px;
	}

	.title-panel {
		text-align: left;
		position: absolute;
		/* height: 100%; */
		top: 2%;
		width: 100%;
	}

	.el-row {
		padding-top: 10px;
	}

	.current-report {
		line-height: 36px;
		font-size: 22px;
		font-weight: 500;
	}

	.current-report span {
		color: #DA140C;
	}

	.el-table td,
	.el-table th {
		padding: 3px 0;
	}

	.el-card__body {
		padding-right: 0;
	}

	.subtitle {
		bottom: 0%;
		text-align: center;
		position: absolute;
		width: 100%;
	}

	.grid-content {
		letter-spacing: 0.7px;
		padding-bottom: 10px;
		color: black;
	}

	.footer-title {
		font-size: 14px;
		padding-bottom: 10px;
	}

	.footer-subtitle {
		font-size: 14px;
		color: black;
	}
</style>