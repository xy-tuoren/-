<template>
	<view>
		<view style="padding: 2.5vw;">
			<view class="imageList">
				<view style="width: 46vw" 
				@click="itemClick(index)"
				v-for="(item,index) in dataList"
				:key="index"
				:style="{marginRight:index%2===0 ? '3vw' : '0'}">
					<u--image :lazy-load="true"
					:showLoading="true" 
					:src="item.imageList[0]" 
					width="46vw" 
					:height="imageHeight" 
					:fade="true" 
					duration="450"
					>
						<template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						</template>
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u--image>
					<view class="imageBottom">
						<view style="flex:3">
							<u--text color="#303133" lines="1" size="12px" :text="item.userMessage"></u--text>
						</view>
						<view style="flex:1">
							<u--text align="right" color="#909399" size="12px"  prefixIcon="heart" iconStyle="font-size: 15px" :text="item.likeNum"></u--text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			imageHeight:String,
			dataList:Array
		},
		mounted() {
			
		},
		data(){
			return {
				
			}
		},
		methods:{
			itemClick(index){
				uni.$u.route({
					url: 'pages/userimageInfo/userimageInfo',
					params:{
						recommendData:encodeURIComponent(JSON.stringify(this.dataList[index]))
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imageList {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.imageBottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin: 8px 0;
	}
</style>
