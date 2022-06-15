<template>
	<view class="signature" :style="{background:backgroundImageSet,backgroundSize:'100%'}" >
		<view style="padding: 12px;">
			<u-row justify="space-between">
				<u-col 
					span="10"
					textAlign="center"
				>
						<view class="userInfo">
							<u-avatar :src="itemData.issueUser.avatar" size="30"></u-avatar>
							<view class="au">
								<u--text align="left" 
								:color="itemData.backgroundImage.length > 0 ? '#F3F4F6' : '#303133'"  
								size="13" mode="name" 
								:text="itemData.issueUser.name"></u--text>
								<u--text align="left" 
								:color="itemData.backgroundImage.length > 0 ? '#c0c0c0'  : '#909399'" 
								size="12" 
								:text="itemData.issueTime | formatDate"></u--text>
							</view>
						</view>
				</u-col>
				<u-col span="2">
					<u-button class="button" size="mini" type="primary" shape="circle" text="+关注"></u-button>
				</u-col>
			</u-row>
			<view class="value">
				<u--text align="center" 
					size="13"
					margin="10px 0 25px 0"
					lines="5" 
					:color="itemData.backgroundImage.length > 0 ? '#F3F4F6' : '#303133'"
					:text="itemData.characters">
				</u--text>
				<view class="tags">
					<view>
						<u-tag shape="circle" 
						color="#19be6b" 
						borderColor="#dbf1e1" 
						bgColor="#dbf1e1" 
						:text="itemData.category" 
						@click="categoryClick"
						size="mini" 
						icon="tags-fill" 
						>
						</u-tag>
					</view>
					<view style="margin-left: 6px;" v-for="(item,index) in itemData.tags" :key="index">
						<u-tag shape="circle" 
						color="#606266" 
						borderColor="#f3f4f6" 
						bgColor="#f3f4f6" 
						:text="item" 
						@click="tagClick(item)"
						size="mini"></u-tag>
					</view>
				</view>
				<view class="value_bottom">
					<u--text align="center" 
					:color="itemData.backgroundImage.length > 0 ? '#F3F4F6'  : '#909399'" 
					lineHeight="15"  
					prefixIcon="heart" 
					:iconStyle="{color:itemData.backgroundImage.length > 0 ? '#F3F4F6'  : '#909399',fontSize: '18px'}"  
					:text="itemData.likeNum"></u--text>
					<u--text align="center" 
					@click="copyText" 
					:color="itemData.backgroundImage.length > 0 ? '#F3F4F6'  : '#909399'" 
					lineHeight="15"  prefixIcon="bookmark" 
					:iconStyle="{color:itemData.backgroundImage.length > 0 ? '#F3F4F6'  : '#909399',fontSize: '18px'}"  
					text="复制"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moment from "moment"
	import { getCharactersDataByColumn,getCharactersByCategory,getCharactersAllTagByCategory } from '../../api/api.js'
	export default {
		props:{
			itemData:Object
		},
		data(){
			return {
			}
		},
		methods:{
			copyText(){
				uni.setClipboardData({
					data:this.itemData.characters,
					success:function(){
						
					}
				})
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
			categoryClick(){
				uni.$u.route({
					url: 'pages/signature/signature',
					params:{
						NavigationBarTitle:this.itemData.column,
						toItem:this.itemData.category
					}
				})
			},
			tagClick(tagName){
				getCharactersAllTagByCategory({CategoryName:encodeURIComponent(this.itemData.category)}).then((res)=>{
					let index = res.tagsList.findIndex(item=>tagName==item.name);
					if(index===-1){
						return
					}
					uni.$u.route({
						url: 'pages/tagPage/characters',
						params:{
							tagList:encodeURIComponent(JSON.stringify(res.tagsList)),
							category:this.itemData.category,
							index
						}
					})
				})
			}
		},
		computed:{
			backgroundImageSet(){
				return `url(${this.itemData.backgroundImage}) no-repeat`
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.signature {
		margin: 6px;
		background-color: #FFFFFF !important;
		border-radius: 5px;
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
		.value_bottom {
			margin-top: 10px;
			display: flex;
			flex-direction: row;
		}
	}
	.imageList {
		margin-top: 5px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
</style>
