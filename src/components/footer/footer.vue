<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div class="grid-content">
					<p class="footer-title">©️版权所有 中国联通</p>
					<p class="footer-subtitle">建设单位：联通系统集成有限公司 山东省分公司</p>
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

	.grid-content {
		letter-spacing: 0.7px;
		padding-bottom: 10px;
		color: #ffffff;
	}

	.footer-title {
		font-size: 14px;
		padding-bottom:10px;
	}

	.footer-subtitle {
		font-size: 14px;
		color: #ffffff;
	}
</style>