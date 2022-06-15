<template>
	<view class="userInfo" :style="{background:backgroundImageSet,backgroundSize:'100%'}">
		<view style="margin: 15px 0 20px 0;border: 2px solid #F1F1F1;border-radius: 50%;">
			<u-avatar :src="userAvatar" size="60"></u-avatar>
		</view>
		<view >
			<u--text size="15" align="center" color="#FFFFFF" :text="NavigationBarTitle"></u--text>
		</view>
		<view style="margin: 3px 0 20px 0;">
			<u--text size="12" align="center" color="#FFFFFF" text="暂无签名"></u--text>
		</view>
		<view style="display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		">
			<view>
				<u--text size="12" margin="0 0 3px 0" lineHeight="12px" align="center" color="#FFFFFF" text="1"></u--text>
				<u--text size="12" lineHeight="12px" align="center" color="#FFFFFF" text="关注"></u--text>
			</view>
			<view>
				<u-line direction="col" margin="0 20px 0 20px" color="#FFFFFF" length="15"></u-line>
			</view>
			<view>
				<u--text size="12" margin="0 0 3px 0" lineHeight="12px" align="center" color="#FFFFFF" text="0"></u--text>
				<u--text size="12" lineHeight="12px" align="center" color="#FFFFFF" text="粉丝"></u--text>
			</view>
		</view>
		<view style="display: flex;justify-content: center;">
			<u-tabs :list="tagList"
			:scrollable="tagList.length > 4 ? true : false" 
			:inactiveStyle="{
				color: '#606266',
				fontSize: '14px'
			}"
			:current="currentActive"
			@click="tabItemClick"
			itemStyle="padding-left: 23px;padding-top:23px ;padding-right: 23px; height: 30px;"
			:activeStyle="{
				color: '#2979ff',
				fontSize: '14px',
				fontWeight: 'bold',
			}"
			>
			</u-tabs>
		</view>
		<view style="width: 100vw;">
			<u-line margin="5px 0px"></u-line>
		</view>
		<view>
			<imagePreview v-show="imagePreviewShow" :dataList="imagePreviewList" :imageHeight="imageHeight"></imagePreview>
			<signature v-show="signatureShow" v-for="item in signatureDataList" :itemData="item" :key="item.userId"/>
			<netWorkName v-show="netWorkName"  v-for="item in netWorkNameDataList" :key="item.userId" :itemData="item" />
			<view style="position: fixed;top: 45%;left: 50%;transform: translateX(-50%);">
				<u--text v-show="notValueShow" size="12" align="center" color="#909399" text="还没有内容哦~"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	import imagePreview from '../../components/index/imagePreview.vue'
	import signature from '../../components/index/signature.vue'
	import netWorkName from '../../components/index/netWorkName.vue'
	export default {
		data() {
			return {
				notValueShow:false,
				imagePreviewShow:true,
				signatureShow:false,
				netWorkName:false,
				imageHeight:"46vw",
				imagePreviewList:[],
				signatureDataList:[],
				netWorkNameDataList:[],
				currentActive:0,
				NavigationBarTitle:'',
				backgroundSrc:'../../static/tagListImage/demo.jpg',
				tagList: [{
							name: '头像',
						}, {
							name: '壁纸',
						}, {
							name: '美图'
						}, {
							name: '网名'
						}, {
							name: '签名',
						}]
			}
		},
		methods: {
			tabItemClick(item){
				switch(item.name){
					case '头像': 
						this.imageHeight="46vw";
						this.imagePreviewShow=true;
						this.signatureShow=false;
						this.netWorkName=false;
						break;
					case '壁纸':
						this.imageHeight="90vw";
						this.imagePreviewShow=true;
						this.signatureShow=false;
						this.netWorkName=false;
						break;
					case '美图':
						this.imageHeight="46vw";
						this.imagePreviewShow=true;
						this.signatureShow=false;
						this.netWorkName=false;
						break;
					case '网名':
						this.imagePreviewShow=false;
						this.signatureShow=false;
						this.netWorkName=true;
						break;
					case '签名':
						this.imagePreviewShow=false;
						this.signatureShow=true;
						this.netWorkName=false;
						break;
				}
			}
		},
		onLoad(obj) {
			this.NavigationBarTitle = obj.NavigationBarTitle || '历神'
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.NavigationBarTitle
			});
		},
		computed:{
			backgroundImageSet(){
				return `url(${this.backgroundSrc}) no-repeat`
			}
		},
		components:{
			imagePreview,
			signature,
			netWorkName
		}
	}
</script>

<style scoped lang="scss">
	.userInfo {
		padding: 12px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
