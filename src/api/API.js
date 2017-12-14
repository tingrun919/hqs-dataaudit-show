import axios from 'axios'
import main from '../main'

axios.defaults.baseURL = 'http://192.168.1.103:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
class API {

	get(url, params) {
		return axios.get(url, { params: params });
	}

	post(url, params) {
		return axios.post(url, params);
	}

}
export default API;