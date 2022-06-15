<template>
	<view style="padding: 10px;">
		<view 
			@click="toUserInfo" 
			style="display: flex;flex-direction: row;align-items: center;margin: 15px 0;"
		>
			<view>
				<u-avatar :src="userAvatar" size="50"></u-avatar>
			</view>
			<view style="margin-left: 15px;">
				<u--text size="18" :text="userId.length < 1 ? '点击登录' : userName"></u--text>
				<u--text color="#909399" size="13" :text="userId.length < 1 ? '1秒登录体验更多功能' : '点击查看或编辑个人信息'"></u--text>
			</view>
		</view>
		<view>
			<view style="margin-top: 30px;" @click="toMylike">
				<view class="rowFlex">
					<u--text size="13" lineHeight="13" 
					iconStyle="margin-right:3px;font-size:#909399" 
					prefixIcon="heart" 
					text="我的喜欢"
					></u--text>
					<u-icon name="arrow-right" ></u-icon>
				</view>
				<u-line></u-line>
			</view>
			<view @click="toMyAttention">
				<view class="rowFlex">
					<u--text size="13" 
					lineHeight="13" 
					iconStyle="margin-right:3px;font-size:#909399" 
					prefixIcon="man-add" 
					text="我的关注"></u--text>
					<u-icon name="arrow-right" ></u-icon>
				</view>
				<u-line></u-line>
			</view>
			<view @click="toMyFans">
				<view class="rowFlex">
					<u--text size="13" 
					lineHeight="13" 
					iconStyle="margin-right:3px;font-size:#909399" 
					prefixIcon="list" 
					text="我的粉丝"></u--text>
					<u-icon name="arrow-right" ></u-icon>
				</view>
				<u-line></u-line>
			</view>
			<view>
				<view class="rowFlex">
					<u--text size="13" 
					lineHeight="13" 
					iconStyle="margin-right:3px;font-size:#909399" 
					prefixIcon="error-circle" 
					text="意见反馈"></u--text>
					<u-icon name="arrow-right" ></u-icon>
				</view>
				<u-line></u-line>
			</view>
			<view @click="toMySetting">
				<view class="rowFlex">
					<u--text size="13" 
					lineHeight="13" 
					iconStyle="margin-right:3px;font-size:#909399" 
					prefixIcon="setting" 
					text="设置"></u--text>
					<u-icon name="arrow-right" ></u-icon>
				</view>
				<u-line></u-line>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import { getUserInfo } from "../../api/api.js"
	export default {
		data() {
			return {
				userData:{},
				userId:'',
				userName:'',
				userAvatar:''
			}
		},
		onLoad() {
			this.$store.commit('changeTabBarIdx',2);
			if(this.$store.state.token){
				getUserInfo({token:this.$store.state.token}).then(({data})=>{
					this.userName = data.name;
					this.userAvatar = data.avatar;
					this.userId = data._id;
					
				}).catch((rej)=>{
					console.log(rej)
				})
			}
		},
		methods: {
			toUserInfo(){
				if(this.userId.length<1){
					uni.$u.route({
						type:'redirectTo',
						url: 'pages/my/login',
					})
				}else{
					uni.$u.route({
						url: 'pages/my/myInfo',
						params:{
							NavigationBarTitle:this.userName
						}
					})
				}
			},
			toMylike(){
				uni.$u.route({
					url: 'pages/my/myLike',
					params:{
						
					}
				})
			},
			toMyAttention(){
				uni.$u.route({
					url: 'pages/my/myAttention',
					params:{
						
					}
				})
			},
			toMyFans(){
				uni.$u.route({
					url: 'pages/my/myFans',
					params:{
						
					}
				})
			},
			toMySetting(){
				uni.$u.route({
					url: 'pages/my/mySetting',
					params:{
						
					}
				})
			}
		}
	}
</script>

<style>
	.rowFlex {
		margin: 15px 0px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
