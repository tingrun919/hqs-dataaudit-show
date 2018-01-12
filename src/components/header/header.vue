<template>
	<header class="header" data-section-name="header">
		<div class="logo">
			<img src="../../assets/logo.png" class="nav-logo">
			<span style="padding-left:5px;">
				<span style="padding-right:8px;">|</span>数据稽核应用平台</span>
		</div>
		<ul class="nav">
			<li class="nav-item">{{riqi}} {{week}}</li>
			<li class="nav-item">|</li>
			<li class="nav-item">
				<span class="nav-link" @click="tests">
					<el-badge is-dot :hidden="istask">
						<span>工作流</span>
					</el-badge>
				</span>
			</li>
			<li class="nav-item">|</li>
			<li class="nav-item">{{name}}

			</li>
			<li class="nav-item" v-if="fromlogin">|</li>
			<li class="nav-item" v-if="fromlogin">
				<span class="nav-link" @click="logout">退出</span>
			</li>
		</ul>
	</header>
</template>
<script>
	import * as Cookies from "js-cookie";

	export default {
		data() {
			return {
				name: Cookies.get('username') + '-' + Cookies.get('orgname'),
				time: null,
				riqi: null,
				week: null,
			};
		},
		computed:{
			istask:function(){
				if(Cookies.get('iftask') == 1)
					return false
				else
					return true
			},
			fromlogin:function(){
				if(Cookies.get('fromlogin') == 'normal')
					return true
				else
					return false
			}
		},
		beforeMount() {
			// this.timer()
			this.myday()
			console.log(this.istask,'iftask')
		},
		methods: {
			logout() {
				Cookies.set('disSort', '');
				Cookies.set('orgId', '');
				Cookies.set('city', '');
				Cookies.set('userid', '');
				Cookies.set('username', '');
				Cookies.set('orgname', '');
				Cookies.set('loginname','');
				Cookies.set('iftask','');
				Cookies.set('fromlogin','');
				this.$router.push('/login')
			},
			mytime() {
				var a = new Date();
				var now = a.toLocaleTimeString().replace(/^\D*/, '')
				this.time = now
			},
			myday() {
				var a = new Date();
				var seperator1 = "-";
				var month = a.getMonth() + 1;
				var strDate = a.getDate();
				var currentdate = a.getFullYear() + seperator1 + month + seperator1 + strDate
				this.riqi = currentdate

				this.week = "星期" + "日一二三四五六".charAt(new Date().getDay());

			},
			tests() {
				$("#workflow").trigger("click");
			}
		}
	};
</script>

<style scoped>
	.dialog-col {
		text-align: right;
		padding-right: 10px;
		line-height: 36px;
	}
</style>