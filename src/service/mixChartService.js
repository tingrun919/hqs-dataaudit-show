import API from '../api/API'
const api = new API()

export default {

	methods: {
		getSampleTime(orgid, tabid) {
			return api.get(`dataaudit_show/usertab/selectylAcctdate?orgid=${orgid}&tabid=${tabid}`)
				.then(res => {
					this.sampletimeList = res.data.data
					this.sampletime = res.data.data[0].acctdate
					this.getSampleProv(orgid)
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
					this.getSampleData(orgid, this.tabId, this.sampletime, this.sampleprov, this.sampledata)
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSampleData(orgid, tabid, acctdate, provid, satype) {
			return api.get(`dataaudit_show/usertab/selectylData?orgid=${orgid}&tabid=${tabid}&acctdate=${acctdate}&provid=${provid}&satype=${satype}`)
				.then(res => {
					this.dialogTableVisible = true
					this.columnsName = res.data.data.columnsName
					this.datalist = res.data.data.datalist
					this.sdtnName = res.data.data.sdtnName
				})
				.catch(err => {
					console.log(err);
				});
		},
		getWeeksData(userid) {
			return api.get(`dataaudit_show/email/selWeekly?userid=${userid}`)
				.then(res => {
					this.outerVisible = true
					this.weekly = res.data.data
				})
				.catch(err => {
					console.log(err);
				});
		},
		getWorkFlow(userid) {
			return api.get(`dataaudit_show/task/selectTask?userid=${userid}`)
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
		successTask(taskid, userid, event, taskcopy){
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
		backTask(taskid, event){
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
		}

	}
}

