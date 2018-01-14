import API from '../api/API'
const api = new API()
import * as Cookies from "js-cookie";

export default {

	methods: {
		getSampleRange(orgid, tabid, loginname) {
			return api.get(`dataaudit_show/usertab/selectRange?orgid=${orgid}&tabid=${tabid}`)
				.then(res => {
					if (res.data.data.length > 2) {
						this.getSampleData(loginname, orgid, tabid, this.sampletime, this.sampleprov, this.sampledata)
						this.isSatype = true;
					} else {
						this.getSampleData(loginname, orgid, tabid, this.sampletime, this.sampleprov, '')
						this.isSatype = false;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSampleTime(orgid, tabid, loginname) {
			return api.get(`dataaudit_show/usertab/selectylAcctdate?orgid=${orgid}&tabid=${tabid}&usercount=${loginname}`)
				.then(res => {
					if (res.data.code == "100003") {
						this.dialogEnable()
						this.$message.error(res.data.message);
					} else {
						this.sampletimeList = res.data.data
						this.sampletime = res.data.data[0].acctdate
						this.getSampleProv(orgid)
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSampleProv(orgid) {
			return api.get(`dataaudit_show/usertab/selectProv?orgid=${orgid}`)
				.then(res => {
					this.sampleprovList = res.data.data
					this.sampleprov = res.data.data[0].prov_id
					if (Cookies.get('isTabType') == 'internet') {
						this.getSampleRange(orgid, Cookies.get('internetTabid'), Cookies.get('loginname'))
					} else if (Cookies.get('isTabType') == 'signaling') {
						this.getSampleRange(orgid, Cookies.get('signalingTabid'), Cookies.get('loginname'))
					} else if (Cookies.get('isTabType') == 'interface') {
						this.getSampleRange(orgid, Cookies.get('interfaceTabid'), Cookies.get('loginname'))
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSampleData(loginname, orgid, tabid, acctdate, provid, satype) {
			return api.get(`dataaudit_show/usertab/selectylData?orgid=${orgid}&tabid=${tabid}&acctdate=${acctdate}&provid=${provid}&satype=${satype}&usercount=${loginname}`)
				.then(res => {
					this.columnsName = res.data.data.columnsName
					this.datalist = res.data.data.datalist
					this.sdtnName = res.data.data.sdtnName
					this.dialogTableVisible = true

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
		getSampleDataDownload(orgid, tabid, acctdate, provid, satype) {
			return api.get(`dataaudit_show/usertab/excel?orgid=${orgid}&tabid=${tabid}&acctdate=${acctdate}&provid=${provid}&satype=${satype}`)
				.then(res => {
					// this.columnsName = res.data.data.columnsName
					// this.datalist = res.data.data.datalist
					// this.sdtnName = res.data.data.sdtnName
					// this.dialogTableVisible = true

				})
				.catch(err => {
					console.log(err);
				});
		}

	}
}

