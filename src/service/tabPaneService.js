import API from '../api/API'
const api = new API()

export default {

	methods: {
		//获取城市列表
		getProv() {
			return api.get('dataaudit_show/usertab/selectProv')
				.then(res => {
					this.options2 = res.data.data
					this.value2 = res.data.data[0].prov_id
				})
				.catch(err => {
					console.log(err);
				});
		},
		
	}
}

