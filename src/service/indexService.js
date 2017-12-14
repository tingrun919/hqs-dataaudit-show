import API from '../api/API'
const api = new API()

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
								this.internetActive = result[i].tabName;
								this.internetId = result[i].tabId;
							}
							//信令
						} else if (typeid == 2) {
							this.signalingOptions = this.signalingOptions.concat(result[i]);
							if (i == 0) {
								this.signalingActive = result[i].tabName;
								this.signalingId = result[i].tabId;
							}
							//接口
						} else if (typeid == 3) {
							this.interfaceOptions = this.interfaceOptions.concat(result[i]);
							if (i == 0) {
								this.interfaceActive = result[i].tabName;
								this.interfaceId = result[i].tabId;
							}
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getWeekScore() {
			return api.get(`dataaudit_show/email/selectFirstscreen?type=1`)
				.then(res => {
					this.scoreQuotaList = res.data.data.quota
					this.scoreScreenList = res.data.data.screen
					this.getWeekData()
				})
				.catch(err => {
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
					console.log(err);
				});
		},
		getWeekEvaluation() {
			return api.get(`dataaudit_show/email/selectFirstscreen?type=5`)
				.then(res => {
					this.screenContent = res.data.data[0].screenContent
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
			//type:1->互联网 2->信令
			return api.get(`dataaudit_show/usertab/selectRiAcctdate?type=${type}`)
				.then(res => {
					if (type == 1) {
						this.internetAcctList = res.data.data
						this.internetAcct = res.data.data[0].acctdate
					} else if(type == 2){
						this.signalingAcctList = res.data.data
						this.signalingAcct = res.data.data[0].acctdate
					}else if(type == 3){
						this.internetTimelyAcctList = res.data.data
						this.internetTimelyAcct = res.data.data[0].acctdate
					}
				})
				.catch(err => {
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
					}else if (type == 3){
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
		getSignalingTimely(){
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
		}
	}
}

