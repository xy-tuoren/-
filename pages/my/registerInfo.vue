<template>
	<view style="padding: 20px;">
		<view>
			<u-input  placeholder="请输入验证码"
			 prefixIcon="edit-pen"
			 prefixIconStyle="font-size: 22px;color: #909399"
			 v-model="verify"
			>
			<template slot="suffix">
				<u-code :seconds="seconds" 
				ref="uCode" 
				:keep-running="true"
				@change="codeChange">
				</u-code>
				<u-button
					type="success"
					size="mini" 
					@tap="getCode">
					{{tips}}
				</u-button>
			</template>	
			</u-input>
		</view>
		<view style="margin: 10px 0;">
			<u-input  
			:password="isPassword"
			v-model="password"
			placeholder="请设置密码"
			prefixIcon="lock-open"
			prefixIconStyle="font-size: 22px;color: #909399"
			>
				<template slot="suffix">
					<u-icon name="eye-fill" @click="chgState" size="18"></u-icon>
				</template>
			</u-input>
		</view>
		<view v-show="password.length>0" style="margin: 10px 0;">
			<u-input
			:password="isPassword"
			v-model="password2"
			placeholder="请再次输入密码"
			prefixIcon="lock-open"
			prefixIconStyle="font-size: 22px;color: #909399"
			>
				<template slot="suffix">
					<u-icon name="eye-fill" @click="chgState" size="18"></u-icon>
				</template>
			</u-input>
		</view>
		<view>
			<u--text size="12" color="#909399" text="密码需由6-20个数字 字母或者符号组成"></u--text>
		</view>
		<view style="margin: 25px 0 10px 0;">
			<u-button @click="onSubmit" type="primary" text="下一步"></u-button>
		</view>
		
	</view>
</template>

<script>
	import { register } from "../../api/api.js"
	export default {
		data() {
			return {
				//1从忘记密码过来 2从注册账号过来
				state:0,
				seconds:60,
				isPassword:true,
				verify:'',
				password:'',
				password2:'',
				tips:'',
				email:''
			}
		},
		onLoad(obj) {
			this.state = obj.state;
			this.email = obj.email;
			if(obj.state==='2'){
				this.$refs.uCode.start();
			}
		}, 
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.email.length < 1){
					uni.$u.toast("请先输入邮箱!")
					setTimeout(()=>{
						uni.$u.route({
							url: 'pages/my/register',
						})
					},1000)
					return
				}
				if (this.$refs.uCode.canGetCode) {
					register({email:this.email}).then(() => {
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					});
				} else {
				  uni.$u.toast('倒计时结束后再发送');
			    }
		    },
			onSubmit(){
				// if(this.verify.length<1){
				// 	return uni.$u.toast("请输入验证码!")
				// }
				// if(this.password!==this.password2){
				// 	return uni.$u.toast("两次输入的密码不一致!")
				// }
				// let rex = /.{6,20}/;
				// if(!rex.test(this.password)){
				// 	return uni.$u.toast("密码格式不正确!")
				// }
				/*
					网络请求
				*/
			    register({password:this.password,verify:this.verify,email:this.email}).then((res)=>{
					console.log(1111)
					this.$store.dispatch('setToken',res.token).then(()=>{
						console.log(2222)
						setTimeout(()=>{
							uni.$u.route({
								type:'switchTab',
								url: 'pages/index/index'
							})
						},800)
					});
				})
			},
			chgState(){
				this.isPassword = !this.isPassword
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
