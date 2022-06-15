<template>
	<view>
		<view style="padding: 10px;">
			<u--text :text="categoryName+'相关推荐'" lines="1"></u--text>
		</view>
		<u-line></u-line>
		<view style="padding: 2.5vw;">
			<view class="imageList">
				<view 
				 @click="toImageInfo(index)"
				 style="width: 46vw;"
				 :style="{marginRight:index%2===0 ? '3vw' : '0'}"
				 v-for="(item,index) in imagePreviewData"
				 :key="item._id"
				 >
					<u--image :lazy-load="true"
					:showLoading="true" 
					:src="item.imageList[0]" 
					width="46vw" 
					height="46vw" 
					:fade="true" 
					duration="450"
					>
						<template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						</template>
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u--image>
					<view class="imageBottom">
						<u--text color="#303133" lines="1" size="12px" :text="item.userMessage"></u--text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getImageByCategory } from '../../api/api.js'
	export default {
		props:{
			categoryName:String,
			currImageId:String
		},
		data(){
			return {
				imagePreviewData:[]
			}
		},
		mounted() {
			
		},
		watch:{
			categoryName:function(val){
				getImageByCategory({columnName:encodeURIComponent(val),notId:this.currImageId,skipNum:0,needNum:8}).then((res)=>{
					this.imagePreviewData = res.imageData
				})
			}
		},
		methods:{
			toImageInfo(index){
				uni.$u.route({
					url: 'pages/userimageInfo/userimageInfo',
					params:{
						recommendData:encodeURIComponent(JSON.stringify(this.imagePreviewData[index]))
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.imageList {
		width:95vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		.imageBottom {
			margin: 8px 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
	}
</style>
