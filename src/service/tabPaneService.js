import API from '../api/API'
const api = new API()
import * as Cookies from "js-cookie";

export default {

	methods: {
		getRange(orgid, tabid) {
			return api.get(`dataaudit_show/usertab/selectRange?orgid=${orgid}&tabid=${tabid}`)
				.then(res => {
					res.data.data.forEach(item => {
						if (item.rangeId != 3) {
							this.tabRange.push(item)
							this.isData = false;
						} else {
							this.isData = true;
						}
					});
					if (Cookies.get('disSort') == 3) {
						this.tabRangeDefault = res.data.data[1].rangeId;
					} else {
						this.tabRangeDefault = res.data.data[0].rangeId;
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		getAcctDate(orgid, tabid) {
			this.acctDate = []
			this.acctDateDefault = ''
			return api.get(`dataaudit_show/usertab/selectAcctdate?tabid=${tabid}&orgid=${orgid}`)
				.then(res => {
					this.acctDate = res.data.data
					this.acctDateDefault = res.data.data[0].acctdate
				})
				.catch(err => {
					console.log(err);
				});
		},
		getProv(orgid) {
			this.prov = []
			this.provDefault = ''
			return api.get(`dataaudit_show/usertab/selectProv?orgid=${orgid}`)
				.then(res => {
					this.prov = res.data.data
					this.provDefault = res.data.data[0].prov_id
				})
				.catch(err => {
					console.log(err);
				});
		},
		getData(orgid, tabid, provid, acctdate, loginname) {
			this.loadingTabLoading = true;
			return api.get(`dataaudit_show/usertab/selectData?tabid=${tabid}&orgid=${orgid}&provid=${provid}&acctdate=${acctdate}&usercount=${loginname}`)
				.then(res => {
					this.xaxis = res.data.data.xaxis
					this.legend = res.data.data.legend
					this.serieslist = res.data.data.serieslist
					this.yaxis = res.data.data.yaxis
					this.loadingTabLoading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
	}
}

