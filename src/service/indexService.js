import API from '../api/API'
const api = new API()
import * as Cookies from "js-cookie";

export default {

	methods: {
		//根据tabType获取tab页
		getInternetTab(orgid, typeid) {
			return api.get(`dataaudit_show/usertab/selectTab?orgid=${orgid}&tabtype=${typeid}`)
				.then(res => {
					let result = res.data.data;
					for (let i = 0; i < result.length; i++) {
						//互联网
						if (typeid == 1) {
							this.internetOptions = this.internetOptions.concat(result[i]);
							if (i == 0) {
								this.internetActive = result[i].tabId;
								this.internetId = result[i].tabId;
								Cookies.set('internetTabid',result[i].tabId)
							}
							//信令
						} else if (typeid == 2) {
							this.signalingOptions = this.signalingOptions.concat(result[i]);
							if (i == 0) {
								this.signalingActive = result[i].tabId;
								this.signalingId = result[i].tabId;
								Cookies.set('signalingTabid',result[i].tabId)
							}
							//接口
						} else if (typeid == 3) {
							this.interfaceOptions = this.interfaceOptions.concat(result[i]);
							if (i == 0) {
								this.interfaceActive = result[i].tabId;
								this.interfaceId = result[i].tabId;
								Cookies.set('interfaceTabid',result[i].tabId)
							}
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getWeekScore() {
			this.loadingWeek = true;
			return api.get(`dataaudit_show/email/selectFirstscreen?type=1`)
				.then(res => {
					this.scoreQuotaList = res.data.data.quota
					this.scoreScreenList = res.data.data.screen
					this.dataFormat = res.data.data.acctdate
					this.getWeekData()
				})
				.catch(err => {
					this.loadingWeek = false;
					console.log(err);
				});
		},
		getWeekData() {
			return api.get(`dataaudit_show/email/selectFirstscreen?type=2`)
				.then(res => {
					this.dataYaxis = res.data.data.yaxis
					this.dataSeriesList = res.data.data.serieslist
					this.dataXaxis = res.data.data.xaxis
					this.dataLegend = res.data.data.legend
					this.dataScreen = res.data.data.screen
					this.getWeekMatch()
				})
				.catch(err => {
					this.loadingWeek = false;
					console.log(err);
				});
		},
		getWeekMatch() {
			return api.get(`dataaudit_show/email/selectFirstscreen?type=3`)
				.then(res => {
					this.matchYaxis = res.data.data.yaxis
					this.matchSeriesList = res.data.data.serieslist
					this.matchXaxis = res.data.data.xaxis
					this.matchLegend = res.data.data.legend
					this.matchScreen = res.data.data.screen
					this.getWeekNumber()
				})
				.catch(err => {
					this.loadingWeek = false;
					console.log(err);
				});
		},
		getWeekNumber() {
			return api.get(`dataaudit_show/email/selectFirstscreen?type=4`)
				.then(res => {
					this.numberYaxis = res.data.data.yaxis
					this.numberSeriesList = res.data.data.serieslist
					this.numberXaxis = res.data.data.xaxis
					this.numberLegend = res.data.data.legend
					this.numberScreen = res.data.data.screen
					this.getWeekEvaluation()
				})
				.catch(err => {
					this.loadingWeek = false;
					console.log(err);
				});
		},
		getWeekEvaluation() {
			return api.get(`dataaudit_show/email/selectFirstscreen?type=5`)
				.then(res => {
					this.screenContent = res.data.data[0].screenContent
					this.loadingWeek = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		getDayProv() {
			return api.get('dataaudit_show/usertab/selectProv')
				.then(res => {
					this.internetProvList = res.data.data
				})
				.catch(err => {
					console.log(err);
				});
		},
		getDayAcctDate(type) {
			//type:1->互联网 2->信令 3->左下角 4->日表格
			this.loadingDay = true;
			return api.get(`dataaudit_show/usertab/selectRiAcctdate?type=${type}`)
				.then(res => {
					if (type == 1) {
						this.internetAcctList = res.data.data
						this.internetAcct = res.data.data[0].acctdate
					} else if (type == 2) {
						this.signalingAcctList = res.data.data
						this.signalingAcct = res.data.data[0].acctdate
					} else if (type == 3) {
						this.internetTimelyAcctList = res.data.data
						this.internetTimelyAcct = res.data.data[0].acctdate
					} else if (type == 4) {
						this.signalingTimelinessList = res.data.data
					}
				})
				.catch(err => {
					this.loadingDay = false;
					console.log(err);
				});
		},
		getInternetData(type, provid, acctdate, datetype, satype) {
			return api.get(`dataaudit_show/email/selectRibao?type=${type}&provid=${provid}&acctdate=${acctdate}&datetype=${datetype}&satype=${satype}`)
				.then(res => {
					if (type == 1) {
						this.internetDataYaxis = res.data.data.yaxis
						this.internetDataSeriesList = res.data.data.serieslist
						this.internetDataXaxis = res.data.data.xaxis
						this.internetDataLegend = res.data.data.legend
					} else if (type == 2) {
						this.signalingDataYaxis = res.data.data.yaxis
						this.signalingDataSeriesList = res.data.data.serieslist
						this.signalingDataXaxis = res.data.data.xaxis
						this.signalingDataLegend = res.data.data.legend
					} else if (type == 3) {
						this.internetTimelyDataYaxis = res.data.data.yaxis
						this.internetTimelyDataSeriesList = res.data.data.serieslist
						this.internetTimelyDataXaxis = res.data.data.xaxis
						this.internetTimelyDataLegend = res.data.data.legend
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSignalingTimely() {
			return api.get('dataaudit_show/email/selRibao')
				.then(res => {
					this.dataIndex = 0;
					this.signalingTimelyDataYaxis = res.data.data.yaxis
					this.signalingTimelyDataSeriesList = res.data.data.serieslist
					this.signalingTimelyDataXaxis = res.data.data.xaxis
					this.signalingTimelyDataLegend = res.data.data.legend
				})
				.catch(err => {
					console.log(err);
				});
		},
		getWorkFlow(userid, loginname) {
			return api.get(`dataaudit_show/task/selectTask?userid=${userid}&usercount=${loginname}`)
				.then(res => {
					this.outerVisible2 = true
					this.workflow = res.data.data
				})
				.catch(err => {
					console.log(err);
				});
		},
		getTaskFlow(taskid) {
			return api.get(`dataaudit_show/task/selectTaskFlow?taskid=${taskid}`)
				.then(res => {
					this.taskflow = res.data.data
					this.tasklength = this.taskflow.length
				})
				.catch(err => {
					console.log(err);
				});
		},
		getStaff() {
			return api.get('dataaudit_show/task/selectStaffs')
				.then(res => {
					this.innerVisible2 = true
					this.taskStaffs = res.data.data
				})
				.catch(err => {
					console.log(err);
				});
		},
		sendTasktoPerson(taskid, userid, event, cuttime, taskcopy) {
			return api.get(`dataaudit_show/task/taskAssign?taskid=${taskid}&userid=${userid}&event=${event}&cuttime=${cuttime}&taskcopy=${taskcopy}`)
				.then(res => {
					if (res.data.code == '100003') {
						this.loading = false
						this.$message.error(res.data.message);
					} else {
						this.$message({
							message: '发送成功！',
							type: 'success'
						});
						this.innerVisible2 = false
						this.outerVisible2 = false
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		backTask(taskid, event) {
			return api.get(`dataaudit_show/task/taskBack?taskid=${taskid}&event=${event}`)
				.then(res => {
					if (res.data.code == '100003') {
						this.loading = false
						this.$message.error(res.data.message);
					} else {
						this.$message({
							message: '退回成功！',
							type: 'success'
						});
						this.innerVisible2 = false
						this.outerVisible2 = false
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		successTask(taskid, userid, event, taskcopy) {
			return api.get(`dataaudit_show/task/taskFinish?taskid=${taskid}&userid=${userid}&event=${event}&taskcopy=${taskcopy}`)
				.then(res => {
					if (res.data.code == '100003') {
						this.loading = false
						this.$message.error(res.data.message);
					} else {
						this.$message({
							message: '发送成功！',
							type: 'success'
						});
						this.innerVisible2 = false
						this.outerVisible2 = false

					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getWeeksData(userid, loginname) {
			return api.get(`dataaudit_show/email/selWeekly?userid=${userid}&usercount=${loginname}`)
				.then(res => {
					this.outerVisible = true
					this.weekly = res.data.data
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSignalingTimeliness(acctdate) {
			return api.get(`dataaudit_show/email/reselRibao?acctdate=${acctdate}`)
				.then(res => {
					this.signalingTimelinessTable = res.data.data
					this.loadingDay = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSignalingTimeDetail(acctdate, provid) {
			return api.get(`dataaudit_show/email/reAllRibao?acctdate=${acctdate}&provid=${provid}`)
				.then(res => {
					this.signalingTimelinessDetail = res.data.data
					this.signalingdialog = true;
				})
				.catch(err => {
					console.log(err);
				});
		},
		getMapDetailData(prov_name, loginname) {
			this.fullscreenLoading = true;
			var prov_names = encodeURI(prov_name)
			return api.get(`dataaudit_show/task/mapTask?prov_name=${prov_names}&usercount=${loginname}`)
				.then(res => {
					this.dialogMapDetailData = res.data.data
					this.dialogMapDetail = true;
					this.fullscreenLoading = false;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
}

