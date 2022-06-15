<template>
	<view style="padding: 20px;">
		<view style="margin: 10px 0;">
			<u-input 
			v-model="email"
			placeholder="请输入qq邮箱"
			prefixIcon="email"
			prefixIconStyle="font-size: 22px;color: #909399"
			>
			</u-input>
		</view>
		<view style="margin: 20px 0 10px 0;">
			<u-button @click="registerOrResetPassword" type="primary" text="下一步"></u-button>
		</view>
	</view>
</template>

<script>
	import { register } from "../../api/api.js"
	export default {
		data() {
			return {
				email:'',
				NavigationBarTitle:'',
				state:1
			}
		},
		methods: {
			registerOrResetPassword(){
				//忘记密码逻辑
				if(this.state===1){
					uni.$u.route({
						url: 'pages/my/registerInfo',
						params:{
							state:this.state
						}
					})
				}else{
					//注册逻辑
					if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)){
						/*
						  验证账号是否注册逻辑
						*/
					    register({email:this.email}).then((res)=>{
							if(res.isRegister){
								return
							}else{
								setTimeout(()=>{
									uni.$u.route({
										url: 'pages/my/registerInfo',
										params:{
											state:this.state,
											email:this.email
										}
									})
								},1000)
							}
						})
					}else{
						uni.$u.toast("邮箱格式错误!")
					}
				}
			}
		},
		onLoad(obj) {
			this.NavigationBarTitle = obj.NavigationBarTitle || ''
			this.state = obj.state
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.NavigationBarTitle
			});
		}
	}
</script>

<style>

</style>
