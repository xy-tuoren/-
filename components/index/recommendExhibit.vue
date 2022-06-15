<template>
	<view id="recommendExhibit">
		<u-row
			justify="space-between"
		>
			<u-col 
				span="10"
				textAlign="center"
			>
					<view class="userInfo">
						<u-avatar :src=" recommendData.issueUser ? recommendData.issueUser.avatar : '' " size="30"></u-avatar>
						<view class="au">
							<u--text align="left"  size="13" mode="name" :text=" recommendData.issueUser ? recommendData.issueUser.name : '' "></u--text>
							<u--text align="left" size="12" color="#909399" :text="recommendData.issueTime | formatDate"></u--text>
						</view>
					</view>
			</u-col>
			<u-col span="2">
				<u-button size="mini" type="primary" shape="circle" text="+关注"></u-button>
			</u-col>
		</u-row>
		<view class="value" @click="recommendClick">
			<u--text :text="recommendData.userMessage" size="13"></u--text>
			<view class="imageList">
				<view v-for="(item,index) in recommendData.imageList" 
				:key='index'
				style="margin-top: 1vw;"
				:style="{marginLeft: index%3===1 ? '1vw' : 0,marginRight: index%3===1 ? '1vw' : 0 }">
					<u--image :lazy-load="true"
							:showLoading="true" 
							:src="item" 
							:fade="true" 
							height="30.5vw"
							width="30.5vw"
							duration="450"
							>
						<template v-slot:loading>
							<u-loading-icon color="red">111</u-loading-icon>
						</template>
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u--image>
				</view>
				
			</view>
			<u-gap height="8" bgColor="#FFFFFF"></u-gap>
			<u-row 
				justify="space-between"
			> 
				<u-col span="10">
					<view class="tags">
						<view>
							<u-tag shape="circle" 
							color="#19be6b" 
							borderColor="#dbf1e1" 
							bgColor="#dbf1e1" 
							@click="categoryClick"
							:text="recommendData.category" 
							size="mini" 
							icon="tags-fill"></u-tag>
						</view>
						<view style="margin-left: 5px;" v-for="(item,index) in recommendData.tags" :key="index">
							<u-tag shape="circle" 
							color="#606266" 
							borderColor="#f3f4f6" 
							bgColor="#f3f4f6" 
							:text="item"
							@click="tagClick(item)"
							size="mini"></u-tag>
						</view>
					</view>
				</u-col>
				<u-col span="2">
					<u--text align="right" color="#606266"  :prefixIcon="getLikeIcon" :iconStyle="{fontSize: '19px',marginRight: '3px',color:getLikeIconColor}" :text="recommendData.likeNum"></u--text>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import moment  from 'moment'
	import { getAllTagListByCategory } from '../../api/api.js'
	export default {
		props:{
			recommendData:{
				type:Object
			}
		},
		data(){
			return {
				tagList:[
					{text:'头像',path:'pages/imagePreview/imagePreview',id:'portrait'},
					{text:'壁纸',path:'pages/wallpaper/wallpaper',id:'wallpaper'},
					{text:'美图',path:'pages/prettyPictures/prettyPictures',id:'prettyPictures'},
					{text:'网名',path:'pages/netWorkName/netWorkName',id:'netWorkId'},
					{text:'签名',path:'pages/signature/signature',id:'signature'},
				],
			}
		},
		mounted(){
			
		},
		computed:{
			getLikeIcon(){
				return this.$store.state.userLikeImageList.includes(this.recommendData._id) ? 'heart-fill' : 'heart';
			},
			getLikeIconColor(){
				return this.$store.state.userLikeImageList.includes(this.recommendData._id) ? '#fa3534' : '#606266';
			}
		},
		filters:{
			formatDate(date){
				moment.locale('zh-cn')
				// let date = new Date(this.recommendData.issueTime)
				return moment(date).format('MMMDo h:mm')
			}
		},
		methods:{
			recommendClick(){
				uni.$u.route({
					url: 'pages/userimageInfo/userimageInfo',
					params:{
						recommendData:encodeURIComponent(JSON.stringify(this.recommendData))
					}
				})
			},
			categoryClick(){
				let idx = this.tagList.findIndex(item=>this.recommendData.column===item.text);
				if(idx===-1){
					return
				}
				uni.$u.route({
					url: this.tagList[idx].path,
					params:{
						NavigationBarTitle:this.recommendData.column,
						toItem:this.recommendData.category
					}
				})
			},
			tagClick(tagName){
				getAllTagListByCategory({CategoryName:encodeURIComponent(this.recommendData.category)}).then((res)=>{
					let index = res.tagsList.findIndex(item=>tagName==item.name);
					if(index===-1){
						return
					}
					uni.$u.route({
						url: 'pages/tagPage/tagPage',
						params:{
							tagList:encodeURIComponent(JSON.stringify(res.tagsList)),
							category:this.recommendData.category,
							index
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#recommendExhibit {
		padding: 10px 0;
	}
	.userInfo {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		.au {
			padding-left: 5px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
		}
	}
	.value {
		margin-top: 10px;
	}
	.imageList {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	.tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
</style>
