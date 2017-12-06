<template>
	<header class="header" data-section-name="header">
		<div class="logo">
			<img src="../../assets/logo.png" class="nav-logo">
			<span style="padding-left:5px;">
				<span style="padding-right:8px;">|</span>数据稽核应用平台</span>
		</div>
		<ul class="nav">
			<li class="nav-item"><a href="#/zh-CN/guide" class="">国庆节</a></li>
			<li class="nav-item">|</li>
			<li class="nav-item"><a href="#/zh-CN/component" class="">10月1日 星期二</a></li>
			<li class="nav-item">|</li>
			<li class="nav-item"><a href="#/zh-CN/resource" class="">12:00</a></li>
			<li class="nav-item">|</li>
			<li class="nav-item"><a href="#/zh-CN/resource" class="nav-link"></a>admin（2）</a>
				<span class="arrow"></span>
				<ul class="nav-dropdown">
					<li>
						<el-badge :value="12" class="item">
							<span class="nav-link" @click="outerVisible = true">
								工作流
							</span>
						</el-badge>
					</li>
					<li>
						<span class="nav-link">二维码</span>
					</li>
					<li>
						<span class="nav-link">个人中心</span>
					</li>
					<li>
						<span class="nav-link" @click="logout">退出</span>
					</li>
				</ul>
			</li>
		</ul>
		<el-dialog title="我的工作流" fullscreen :modal-append-to-body="aaaa" :visible.sync="outerVisible">
			<el-table :data="gridData" stripe border>
				<el-table-column type="expand" accordion>
					<template slot-scope="props">
						<!-- <el-form label-position="left" inline class="demo-table-expand" v-if="props.row.isprocess === '是' ? true : false">
							<el-form-item label="日期">
								<span>{{ props.row.date }}</span>
							</el-form-item>
							<el-form-item label="姓名">
								<span>{{ props.row.name }}</span>
							</el-form-item>
							<el-form-item label="简介">
								<span>{{ props.row.address }}</span>
							</el-form-item>
						</el-form> -->
						<el-steps :active="6" align-center>
							<el-step :title="res" description="从A到B：这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
							<el-step title="2017-02-24" description="从B到C：这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
							<el-step title="2017-02-25" description="从C到D：这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
							<el-step title="2017-02-26" description="从D到E：这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
							<el-step title="2017-02-27" description="从E到F：这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
							<el-step title="2017-02-28" description="从F到G：这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
						</el-steps>
						<el-button type="success" style="margin-left:40%;margin-top:25px;" @click="innerVisible = true" v-if="props.row.isprocess === '是' ? false : true">流转</el-button>
						<el-button type="danger" style="margin-top:25px;" @click="innerVisible = true" v-if="props.row.isprocess === '是' ? false : true">驳回</el-button>
					</template>
				</el-table-column>
				<el-table-column property="date" label="日期" width="120"></el-table-column>
				<el-table-column property="name" label="稽核指标" width="80"></el-table-column>
				<el-table-column property="name" label="度量名称及数值" width="80"></el-table-column>
				<el-table-column property="name" label="预警级别" width="80"></el-table-column>
				<el-table-column property="address" label="简介"></el-table-column>
				<el-table-column property="isprocess" label="是否已处理">
					<template slot-scope="scope">
						<el-tag :type="scope.row.isprocess === '是' ? 'success' : 'danger'" close-transition>{{scope.row.isprocess}}</el-tag>
						<!-- <el-button size="mini" v-if="scope.row.isprocess === '是' ? false : true" type="primary" @click="innerVisible = true">查看</el-button> -->
					</template>

				</el-table-column>
				<!-- <el-table-column property="action" label="操作" width="100">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" @click="innerVisible = true">查看</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<el-dialog width="80%" title="详情流转" :visible.sync="innerVisible" append-to-body>
				<el-row>
					<el-col :span="2" class="dialog-col" :offset="3">
						<span style="line-height:28px;">发送</span>
					</el-col>
					<el-col :span="6">
						<el-select v-model="value9" filterable remote reserve-keyword placeholder="请选择人员" :remote-method="remoteMethod" :loading="loading">
							<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col :span="2" class="dialog-col" :offset="3">
						<span style="line-height:28px;">抄送</span>
					</el-col>
					<el-col :span="16">
						<el-select style="width:100%;" v-model="value10" multiple filterable remote reserve-keyword placeholder="请选择人员" :remote-method="remoteMethod"
						 :loading="loading">
							<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col :span="2" class="dialog-col" :offset="3">
						<span style="line-height:28px;">内容</span>
					</el-col>
					<el-col :span="16">
						<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容" v-model="textarea">
						</el-input>
					</el-col>
				</el-row>
				<el-row style="margin-top:20px;">
					<el-col :span="12" class="dialog-col">
						<el-button type="success">确定</el-button>
					</el-col>
					<el-col :span="12">
						<el-button type="danger" @click="innerVisible = false">取消</el-button>
					</el-col>
				</el-row>
			</el-dialog>
		</el-dialog>
	</header>
</template>
<script>
	import * as Cookies from "js-cookie";

	export default {
		data() {
			return {
				gridData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '周稽核报告预警已触发',
					isprocess: '是'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '日稽核报告预警已触发',
					isprocess: '否'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '信令详单预警已触发',
					isprocess: '是'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '用户漂移率预警已触发',
					isprocess: '是'
				}],
				res: "ssssss" + '<br/>' + "aaaaa",
				outerVisible: false,
				innerVisible: false,
				aaaa: false,
				textarea: '',
				options4: [],
				value9: [],
				value10: [],
				list: [],
				loading: false,
				states: ["Alabama", "Alaska", "Arizona",
					"Arkansas", "California", "Colorado",
					"Connecticut", "Delaware", "Florida",
					"Georgia", "Hawaii", "Idaho", "Illinois",
					"Indiana", "Iowa", "Kansas", "Kentucky",
					"Louisiana", "Maine", "Maryland",
					"Massachusetts", "Michigan", "Minnesota",
					"Mississippi", "Missouri", "Montana",
					"Nebraska", "Nevada", "New Hampshire",
					"New Jersey", "New Mexico", "New York",
					"North Carolina", "North Dakota", "Ohio",
					"Oklahoma", "Oregon", "Pennsylvania",
					"Rhode Island", "South Carolina",
					"South Dakota", "Tennessee", "Texas",
					"Utah", "Vermont", "Virginia",
					"Washington", "West Virginia", "Wisconsin",
					"Wyoming"]
			};
		},
		mounted() {
			this.list = this.states.map(item => {
				return { value: item, label: item };
			});
		},
		methods: {
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => { });
			},
			handleClick(row) {
				console.log(row);
			},
			remoteMethod(query) {
				if (query !== '') {
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						this.options4 = this.list.filter(item => {
							return item.label.toLowerCase()
								.indexOf(query.toLowerCase()) > -1;
						});
					}, 200);
				} else {
					this.options4 = [];
				}
			},
			logout() {
				Cookies.set('disSort', '');
				Cookies.set('orgId', '');
				this.$router.push('/login')
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