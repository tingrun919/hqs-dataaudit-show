<template>
	<div class="components-container" style='height:570px;'>
		<div class='chart-container'>
			<span class="select-one">稽核范围</span>
			<el-select class="select-one" size="mini" v-model="tabRangeDefault" placeholder="请选择">
				<el-option v-for="item in tabRange" :key="item.rangeId" :label="item.rangeLabel" :value="item.rangeId">
				</el-option>
			</el-select>
			<el-select class="select-one" size="mini" v-model="acctDateDefault" placeholder="请选择" v-if="tabRangeDefault == 1">
				<el-option v-for="items in acctDate" :key="items.acctdate" :label="items.acctdate" :value="items.acctdate">
				</el-option>
			</el-select>
			<el-select class="select-one" size="mini" v-model="provDefault" placeholder="请选择" v-else>
				<el-option v-for="items in prov" :key="items.prov_id" :label="items.prov_name" :value="items.prov_id">
				</el-option>
			</el-select>
			<!-- <field-chart height='100%' width='100%' :cs='cs' :ps='ps' :lte='lte' :ss='ss' :quota='quotaList' v-if="isData"></field-chart> -->
			<mix-chart height='100%' width='100%' :tabid="tabId" :xaxislist='xaxis' :legendlist='legend' :serieslist='serieslist' :yaxislist='yaxis'></mix-chart>
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
	</div>
</template>

<script>
	import mixChart from '@/components/Charts/mixChart.vue'
	import fieldChart from '@/components/Charts/fieldChart.vue'

	import tabPaneService from '../../service/tabPaneService'
	import mixChartService from '../../service/mixChartService'
	import * as Cookies from "js-cookie";

	export default {
		mixins: [tabPaneService, mixChartService],
		props: ['tabId'],
		components: { mixChart, fieldChart },
		watch: {
			tabRangeDefault: function () {
				this.testID = this.tabId
				if (this.tabRangeDefault == 1) {
					//日期
					this.getAcctDate(Cookies.get('orgId'), this.tabId);
				} else {
					//地域
					this.getProv(Cookies.get('orgId'));
				}
			},
			acctDateDefault: function () {
				if (Cookies.get('disSort') == 3) {
					this.getData(Cookies.get('orgId'), this.tabId, this.provDefault, this.acctDateDefault)
				} else {
					this.getData(Cookies.get('orgId'), this.tabId, '', this.acctDateDefault)
				}
			},
			provDefault: function () {
				this.getData(Cookies.get('orgId'), this.tabId, this.provDefault, '', )
			}
		},
		computed: {
			// isPerson: function () {
			// 	for (var i = 0; i < this.workflow.length; i++) {
			// 		var s = this.workflow[i].taskNowperson
			// 	}
			// 	var t = Cookies.get('userid')
			// 	return s == t ? true : false
			// }
		},
		beforeMount() {
			this.getRange(Cookies.get('orgId'), this.tabId)
		},
		data() {
			return {
				testID: '',
				sampletime: '',
				sampletimeList: [],
				sampleprov: '',
				sampleprovList: '',
				sampledata: 'cs',
				dialogTableVisible: false,
				outerVisible: false,
				innerVisible: false,
				outerVisible2: false,
				innerVisible2: false,

				columnsName: '',
				datalist: '',

				weekly: [],
				mailcontent: '',

				workflow: [],
				taskflow: [],
				appendBody: false,

				tabRange: [],
				tabRangeDefault: '',

				acctDate: [],
				acctDateDefault: '',

				prov: [],
				provDefault: '',

				isData: false,

				xaxis: [],
				legend: [],
				serieslist: [],
				yaxis: [],

				tasklength:0,

				taskStaffs: [],
				sendPerson: '',
				copyPerson: '',
				tasktextarea: '',
				cuttime:'',
				taskIds:'',
				userId:Cookies.get('userid'),

				isShow:'',
			}
		},
		methods: {
			handleData() {
				this.getSampleTime(Cookies.get('orgId'), this.tabId)
			},
			handleDataYl() {
				this.getSampleData(Cookies.get('orgId'), this.tabId, this.sampletime, this.sampleprov, this.sampledata)
			},
			handleWeelData() {
				this.getWeekData(Cookies.get('userid'))
			},
			handleEdit(index, row) {
				this.mailcontent = row.mailContent
				this.innerVisible = true
			},
			handleWorkflow() {
				this.getWorkFlow(Cookies.get('userid'))
			},
			handleTask(row) {
				this.getTaskFlow(row.taskId)
			},
			taskStaff(row,type) {
				this.taskIds = row.taskId;
				this.isShow = type
				this.getStaff()
			},
			sendTask(row) {
				if(this.isShow == 'send'){
					this.sendTasktoPerson(this.taskIds,this.sendPerson,this.tasktextarea,this.cuttime,this.copyPerson)
				}else if(this.isShow == 'success'){
					this.successTask(this.taskIds,this.sendPerson,this.tasktextarea,this.copyPerson)
				}else{
					this.backTask(this.taskIds,this.tasktextarea)
				}
				
			}

		}

	}
</script>

<style scoped>
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
		/* padding-bottom: 40px; */
	}

	.col-right {
		text-align: right;
		padding-right: 5px;
		line-height: 40px;
	}
</style>