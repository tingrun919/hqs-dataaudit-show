<template>
	<div class="login-container">
		<el-form class="card-box login-form" autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
			<h3 class="title">数据稽核应用平台</h3>
			<el-form-item prop="usercount">
				<el-input name="usercount" type="text" v-model="loginForm.usercount" placeholder="邮箱" />
			</el-form-item>

			<el-form-item prop="password">
				<el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
				 placeholder="密码" />
			</el-form-item>

			<el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
		</el-form>
	</div>
</template>

<script>
	import API from '../../../api/API'
	const api = new API()
	import * as Cookies from "js-cookie";
	export default {
		data() {
			return {
				loginForm: {
					usercount: '',
					password: ''
				},
				pwdType: 'password',
				loading: false,
			}
		},
		beforeMount() {
			if (Cookies.get('orgId') && Cookies.get('disSort')) {
				this.$router.push('/index')
				this.$router.go('/index')
			} else {
				this.$router.push('/login')
			}
		},
		methods: {
			handleLogin() {
				this.loading = true
				api.get('dataaudit_show/user/login', this.loginForm)
					.then(res => {
						if (res.data.code == '100003') {
							this.loading = false
							this.$message.error(res.data.message);
						} else {
							//部门ID
							Cookies.set('orgId', res.data.data[0].ORG_ID);
							//所属组织分类
							Cookies.set('disSort', res.data.data[0].DIS_SORT);
							//所属城市
							let result = res.data.data[0].ORG_NAME.split("-")
							Cookies.set('city', result[1]);
							Cookies.set('userid', res.data.data[0].STAFF_ID);
							Cookies.set('username', res.data.data[0].STAFF_NAME);
							Cookies.set('orgname', res.data.data[0].ORG_NAME);
							this.loading = false
							this.myBrowser()
						}
					})
					.catch(err => {
						this.loading = false
						console.log(err);
					});
			},
			myBrowser() {
				if (!!window.ActiveXObject || "ActiveXObject" in window) {
					this.$router.push('/index?borwerAgent=InternetExplorer')
				} else {
					this.$router.push('/index')
					this.$router.go('/index')
				}
			}
		},
	}
</script>
<style>
	.login-container {
		position: relative;
		width: 100%;
		height: 100%;
		height: 100vh;
		background-color: #2d3a4b;
	}

	.login-form {
		position: absolute;
		left: 0;
		right: 0;
		width: 330px;
		padding: 35px 35px 15px 35px;
		margin: 120px auto;
	}

	.title {
		font-size: 26px;
		font-weight: 400;
		color: #eee;
		margin: 0px auto 40px auto;
		text-align: center;
		font-weight: bold;
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}

	.login-container input {
		background: transparent;
		border: 0px;
		-webkit-appearance: none;
		border-radius: 0px;
		padding: 12px 5px 12px 15px;
		color: #eee;
		height: 47px;
	}
</style>