<template>
	<view style="padding: 20px;">
		<view>
			<u-input  placeholder="请输入qq邮箱"
			 prefixIcon="account"
			 prefixIconStyle="font-size: 22px;color: #909399"
			 v-model="email"
			>
			</u-input>
		</view>
		<view style="margin: 10px 0;">
			<u-input  
			:password="isPassword"
			v-model="password"
			placeholder="请输入密码"
			prefixIcon="lock"
			prefixIconStyle="font-size: 22px;color: #909399"
			>
				<template slot="suffix">
					<u-icon name="eye-fill" @click="chgState" size="18"></u-icon>
				</template>
			</u-input>
		</view>
		<view style="margin: 20px 0 10px 0;">
			<u-button @click="onSubmit" type="primary" text="登录"></u-button>
		</view>
		<view style="display: flex;flex-direction: row;">
			<u--text @click="toRegister(1)" align="left" size="13" text="忘记密码?"></u--text>
			<u--text @click="toRegister(2)" align="right" size="13" color="#007aff" text="注册账号"></u--text>
		</view>
	</view>
</template>

<script>
	import { login } from "../../api/api.js"
	export default {
		data() {
			return {
				isPassword:true,
				email:'',
				password:''
			}
		},
		methods: {
			chgState(){
				this.isPassword = !this.isPassword
			},
			toRegister(state){
				uni.$u.route({
					url: 'pages/my/register',
					params:{
						NavigationBarTitle:state===1 ? '忘记密码' : '注册账号',
						state
					}
				})
			},
			onSubmit(){
				if(this.email.trim().length<1){
					return uni.$u.toast("请输入账号!")
				}
				if(this.password.trim().length<1){
					return uni.$u.toast("请输入密码!")
				}
				let rex = /.{6,20}/;
				if(!rex.test(this.password.trim()) && this.password!=='admin'){
					return uni.$u.toast("密码格式不正确!")
				}
				/*
					网络请求
				*/
			    login({password:this.password,email:this.email}).then((res)=>{
					this.$store.dispatch('setToken',res.token).then(()=>{
						setTimeout(()=>{
							uni.$u.route({
								type:'switchTab',
								url: 'pages/index/index'
							})
						},1000)
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
