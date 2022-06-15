<template>
	<view style="margin: 6px;background-color: #FFFFFF;border-radius: 5px;">
		<view style="padding: 12px;">
			<u-row justify="space-between">
				<u-col 
					span="10"
					textAlign="center"
				>
						<view class="userInfo">
							<u-avatar :src="itemData.userAvatar" size="30"></u-avatar>
							<view class="au">
								<u--text align="left" size="13" mode="name" :text="itemData.userName"></u--text>
								<u--text align="left" size="12" mode="date" :text="itemData.issueDate"></u--text>
							</view>
						</view>
				</u-col>
				<u-col span="2">
					<u-button class="button" size="mini" type="primary" shape="circle" text="+关注"></u-button>
				</u-col>
			</u-row>
			<view class="value">
				<u--text align="center" margin="15px 0px" lines="1" color="#303133" :text="itemData.netWorkName"></u--text>
				<u-gap height="8" bgColor="#FFFFFF"></u-gap>
				<view class="tags">
					<view>
						<u-tag shape="circle" color="#19be6b" borderColor="#dbf1e1" bgColor="#dbf1e1" :text="itemData.categoryName" size="mini" icon="tags-fill"></u-tag>
					</view>
					<view style="margin-left: 6px;" v-for="(item,index) in itemData.tagList" :key="index">
						<u-tag shape="circle" color="#606266" borderColor="#f3f4f6" bgColor="#f3f4f6" :text="item.name" size="mini"></u-tag>
					</view>
				</view>
				<u-gap height="10" bgColor="#FFFFFF"></u-gap>
				<view class="value_bottom">
					<u--text align="center" color="#909399" lineHeight="15"  prefixIcon="heart" iconStyle="font-size: 18px;color:#909399" :text="itemData.likeNum"></u--text>
					<u--text align="center" @click="copyText" color="#909399" lineHeight="15"  prefixIcon="bookmark" iconStyle="font-size: 18px;color:#909399" text="复制"></u--text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			itemData:Object
		},
		data(){
			return {
				netWorkName:'我乃历神'
			}
		},
		methods:{
			copyText(){
				uni.setClipboardData({
					data:this.itemData.netWorkName,
					success:function(){
						
					}
				})
			}
		}
	}
	
</script>

<style lang="scss" scoped>
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
