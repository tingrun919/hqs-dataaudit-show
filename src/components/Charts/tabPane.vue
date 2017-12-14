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
			<mix-chart height='100%' width='100%' :xaxislist='xaxis' :legendlist='legend' :serieslist='serieslist' :yaxislist='yaxis'></mix-chart>
		</div>
	</div>
</template>

<script>
	import mixChart from '@/components/Charts/mixChart.vue'
	import fieldChart from '@/components/Charts/fieldChart.vue'

	import tabPaneService from '../../service/tabPaneService'
	import * as Cookies from "js-cookie";

	export default {
		mixins: [tabPaneService],
		props: ['tabId'],
		components: { mixChart, fieldChart },
		watch: {
			tabRangeDefault: function () {
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
				this.getData(Cookies.get('orgId'), this.tabId,this.provDefault, '', )
			}
		},
		beforeMount() {
			this.getRange(Cookies.get('orgId'), this.tabId)
		},
		data() {
			return {
				tabRange: [],
				tabRangeDefault: '',

				acctDate: [],
				acctDateDefault: '',

				prov: [],
				provDefault: '',

				isData: false,

				xaxis:[],
				legend:[],
				serieslist:[],
				yaxis:[],

			}
		},
		methods: {

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
</style>