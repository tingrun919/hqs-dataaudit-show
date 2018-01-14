<template>
	<div class="components-container" element-loading-text="数据加载中" v-loading="loadingTabLoading">
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
			<mix-chart :height="viewHeightMixChart" width='100%' :tabrange="tabRangeDefault" :xaxislist='xaxis' :legendlist='legend'
			 :serieslist='serieslist' :yaxislist='yaxis'></mix-chart>
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
		components: { mixChart, fieldChart },
		watch: {
			tabRangeDefault: function () {
				if (this.tabRangeDefault == 1) {
					//日期
					if (Cookies.get('isTabType') == 'internet') {
						this.getAcctDate(Cookies.get('orgId'), Cookies.get('internetTabid'));
					} else if (Cookies.get('isTabType') == 'signaling') {
						this.getAcctDate(Cookies.get('orgId'), Cookies.get('signalingTabid'));
					} else if (Cookies.get('isTabType') == 'interface') {
						this.getAcctDate(Cookies.get('orgId'), Cookies.get('interfaceTabid'));
					}
				} else {
					//地域
					this.getProv(Cookies.get('orgId'));
				}
			},
			acctDateDefault: function () {
				if (Cookies.get('disSort') == 3) {
					if (Cookies.get('isTabType') == 'internet') {
						this.getData(Cookies.get('orgId'), Cookies.get('internetTabid'), this.provDefault, this.acctDateDefault, Cookies.get('loginname'))
					} else if (Cookies.get('isTabType') == 'signaling') {
						this.getData(Cookies.get('orgId'), Cookies.get('signalingTabid'), this.provDefault, this.acctDateDefault, Cookies.get('loginname'))
					} else if (Cookies.get('isTabType') == 'interface') {
						this.getData(Cookies.get('orgId'), Cookies.get('interfaceTabid'), this.provDefault, this.acctDateDefault, Cookies.get('loginname'))
					}
				} else {
					if (Cookies.get('isTabType') == 'internet') {
						this.getData(Cookies.get('orgId'), Cookies.get('internetTabid'), '', this.acctDateDefault, Cookies.get('loginname'))
					} else if (Cookies.get('isTabType') == 'signaling') {
						this.getData(Cookies.get('orgId'), Cookies.get('signalingTabid'), '', this.acctDateDefault, Cookies.get('loginname'))
					} else if (Cookies.get('isTabType') == 'interface') {
						this.getData(Cookies.get('orgId'), Cookies.get('interfaceTabid'), '', this.acctDateDefault, Cookies.get('loginname'))
					}
				}
			},
			provDefault: function () {
				if (Cookies.get('isTabType') == 'internet') {
					this.getData(Cookies.get('orgId'), Cookies.get('internetTabid'), this.provDefault, '', Cookies.get('loginname'))
				} else if (Cookies.get('isTabType') == 'signaling') {
					this.getData(Cookies.get('orgId'), Cookies.get('signalingTabid'), this.provDefault, '', Cookies.get('loginname'))
				} else if (Cookies.get('isTabType') == 'interface') {
					this.getData(Cookies.get('orgId'), Cookies.get('interfaceTabid'), this.provDefault, '', Cookies.get('loginname'))
				}
			}
		},
		computed: {
			viewHeightMixChart: function () {
				return (window.innerHeight - 220) + 'px'
			}
		},
		beforeMount() {
			if (Cookies.get('isTabType') == 'internet') {
				this.getRange(Cookies.get('orgId'), Cookies.get('internetTabid'))
			} else if (Cookies.get('isTabType') == 'signaling') {
				this.getRange(Cookies.get('orgId'), Cookies.get('signalingTabid'))
			} else if (Cookies.get('isTabType') == 'interface') {
				this.getRange(Cookies.get('orgId'), Cookies.get('interfaceTabid'))
			}
		},
		data() {
			return {
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

				tasklength: 0,

				taskStaffs: [],
				sendPerson: '',
				copyPerson: '',
				tasktextarea: '',
				cuttime: '',
				taskIds: '',
				userId: Cookies.get('userid'),

				isShow: '',
				loadingTabLoading: false,
			}
		},
	}
</script>

<style scoped>
	.chart-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.col-right {
		text-align: right;
		padding-right: 5px;
		line-height: 40px;
	}
</style>