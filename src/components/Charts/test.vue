<template>
	<div>	
		<el-select v-model="value" placeholder="请选择" id="aaa" @change="youyou">
		  <el-option
			v-for="item in options"
			:key="item.value"
			:label="item.label"
			:value="item.value">
		  </el-option>
		</el-select>
		<el-button type="primary" @click="test">主要按钮</el-button>
	</div>
	  </template>


	  <script>
  export default {
	  watch:{
		value:function(){
			console.log(this.value,11111)
		}
	  },
	  beforeMount(){
		$(function () {
			// $("#aaa").val("选项3")
		});
	  }
	  ,

    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '选项1'
      }
	},
	methods:{
		test(){
			$("#aaa").val("选项3")
			// console.log( $("#aaa").val(),'22222222')
			
		},
		youyou(){
			console.log($("#aaa").val(),'22222222')
		}
	}
  }
</script>