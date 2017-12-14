<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="24">
				<div class="grid-content">
					<p class="footer-title">线上与我们联系</p>
					<p class="footer-subtitle">请您留言,我们将尽快与您取得联系</p>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="grid-content">
					<el-row :gutter="5">
						<el-col :span="10" :offset="4">
							<div class="grid-content">
								<el-input v-model="name" placeholder="姓名"></el-input>
							</div>
						</el-col>
						<el-col :span="10">
							<div class="grid-content">
								<el-input v-model="phone" placeholder="电话"></el-input>
							</div>
						</el-col>
					</el-row>
					<el-row :gutter="5">
						<el-col :span="10" :offset="4">
							<div class="grid-content">
								<el-input v-model="email" placeholder="邮箱"></el-input>
							</div>
						</el-col>
						<el-col :span="10">
							<div class="grid-content">
								<el-input v-model="theme" placeholder="主题"></el-input>
							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
			<el-col :span="10">
				<div class="grid-content">
					<el-input type="textarea" :rows="4" placeholder="留言" v-model="message">
					</el-input>
				</div>
			</el-col>
		</el-row>
		<el-row :gutter="5">
			<el-col :span="4">
				<div class="grid-content">
					<p class="footer-friend-link">友情链接</p>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content">
					<p class="footer-friend-link">
						<a href="#" class="footer-other-link">联通ITSM服务支撑平台</a>
					</p>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content">
					<p class="footer-friend-link">
						<a href="#" class="footer-other-link">联通集团数据分析系统</a>
					</p>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content">
					<p class="footer-friend-link">
						<a href="#" class="footer-other-link">BBS北六综合呈现1.0</a>
					</p>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content">
					<p class="footer-friend-link footer-p-textalign-c">
						<a href="#" class="footer-other-link">统一知识库</a>
					</p>
				</div>
			</el-col>
			<el-col :span="4">
				<div class="grid-content">
					<p class="footer-friend-link footer-p-textalign-l">
						<a href="#" class="footer-other-link">OCS网管系统</a>
					</p>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script>

	export default {
		data() {
			return {
				name: '',
				phone: '',
				email: '',
				theme: '',
				message:'',
			}
		}
	}
</script>

<style scoped>
	.el-row {
		margin-bottom: 16px;
	}

	.el-row:last-child {
		margin-bottom: 0;
	}

	.el-col {
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.footer-title {
		font-size: 35px;
		font-weight: bold;
		color: #AEDC82;
	}

	.footer-subtitle {
		font-size: 20px;
		font-weight: 600;
		color: #ffffff;
	}

	.footer-friend-link {
		font-size: 18px;
		font-weight: 500;
		color: #ffffff;
		text-align: right;
	}

	.footer-other-link {
		font-size: 16px;
		font-weight: 300;
		color: #ffffff;
	}

	.footer-p-textalign-c {
		text-align: center;
	}

	.footer-p-textalign-l {
		text-align: left;
	}
</style>