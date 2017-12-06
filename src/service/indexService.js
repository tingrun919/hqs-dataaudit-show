import API from '../api/API'
const api = new API()

export default {

	methods: {
		//根据tabType获取tab页
		getHomeTab(orgid) {
			return api.get(`dataaudit_show/usertab/selectTab?orgid=${orgid}`)
				.then(res => {
					for (var value of res.data.data) {
						if (value.tabType == 2) {
							this.signalingActive = value.tabName
							this.signalingId = value.tabId
							break;
						} else {
							continue;
						}
					}
					res.data.data.forEach(item => {
						if (item.tabType == 2) {
							this.signalingOptions = this.signalingOptions.concat(item);
						}
					});
					this.getsignalingRange(this.signalingId)
				})
				.catch(err => {
					console.log(err);
				});
		},
		getsignalingRange(tabid) {
			return api.get(`dataaudit_show/usertab/selectRange?tabid=${tabid}`)
				.then(res => {
					this.signalingRange = res.data.data;
					this.signalingRangedefault = res.data.data[0].rangeId;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
}

