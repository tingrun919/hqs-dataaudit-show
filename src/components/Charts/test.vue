<template>
	<div>
		<input type="text" name="" :data-greeting="result" ref="inputref" id="kkk">
		<el-button @click="test" id="1">默认按钮</el-button>			
	</div>
</template>


<script>
	export default {
		watch: {
			result: function () {
				console.log(this.result, "11111")//观察result的变化
			}
		},
		beforeMount() {
			$(function () {
					$("#kkk").attr("data-greeting", "Hello World");//设置值为Hello World
					console.log($("#kkk").data("greeting"),'设置之后')//打印设置之后的值
					$("#1").trigger("click");
			});
		},
		data() {
			return {
				result:'aaa',//初始值
			}
		},
		methods: {
			test() {
				console.log($("#kkk").data("greeting"),'按钮触发data属性')//打印设置之后的值
				console.log(this.result,'按钮触发vue')//打印data的值
			},
		}
	}
</script>