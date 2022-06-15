<template>
	<view>
		<view v-if="recommendData.column==='头像'">
			<view style="padding: 10px;justify-content: center;" class="flexRow borRadius">
				<view class="flexRow" style="flex: 1;margin-right: 1.2vw;">
					<view @click="chgSize('big')" 
					:class="{checkedBag:selectSize==='big',borRadius:selectSize==='big'}"
					style="flex: 1;background-color: #f3f4f6;padding: 5px;">
						<u--text size="13" :color="selectSize==='big' ? '#f4f4f5' : '#606266'" align="center" text="大图"></u--text>
					</view>
					<view @click="chgSize('min')" 
					:class="{checkedBag:selectSize==='min',borRadius:selectSize==='min'}" 
					style="flex: 1;background-color: #f3f4f6;padding: 5px;">
						<u--text size="13" :color="selectSize==='min' ? '#f4f4f5' : '#606266'" align="center" text="小图"></u--text>
					</view>
				</view>
				<view class="flexRow" style="flex: 1;margin-left: 1.2vw;">
					<view @click="chgShape('square')" 
					:class="{checkedBag:selectShape==='square',borRadius:selectShape==='square'}"
					 style="background-color: #f3f4f6;flex:1;padding: 5px;">
						<u--text size="13" :color="selectShape==='square' ? '#f4f4f5' : '#606266'" align="center" text="方图"></u--text>
					</view>
					<view @click="chgShape('circle')" 
					:class="{checkedBag:selectShape==='circle',borRadius:selectShape==='circle'}"
					 style="background-color: #f3f4f6;flex:1;padding: 5px;">
						<u--text size="13" :color="selectShape==='circle' ? '#f4f4f5' : '#606266'" align="center" text="圆图"></u--text>
					</view>
				</view>
			</view>
			<u-line></u-line>
		</view>
		<view style="padding: 10px;">
			<u-row justify="space-between">
				<u-col 
					span="10"
					textAlign="center"
				>
						<view class="userInfo">
							<u-avatar :src="userImageInfo.issueUser.avatar" size="30"></u-avatar>
							<view class="au">
								<u--text align="left" size="13" :text="userImageInfo.issueUser.name"></u--text>
								<u--text align="left" size="12" :text="userImageInfo.issueTime | formatDate"></u--text>
							</view>
						</view>
				</u-col>
				<u-col span="2">
					<u-button class="button" size="mini" type="primary" shape="circle" text="+关注"></u-button>
				</u-col>
			</u-row>
		</view>
		<view style="display: flex;justify-content: center;padding: 0 10px;">
			<u--text margin="8px 12px" align="center" color="#303133" lines="5" size="16px" :text="userImageInfo.userMessage"></u--text>
		</view>
		<view style="display: flex;flex-direction: row;align-items: center;justify-content: center;flex-wrap: wrap;">
			<view class="imageList" 
			:style="{marginRight:(index%2 === 0) && (item.length > 1) && selectSize==='min' ? '1vw' : '0'}" 
			v-for="(item,index) in userImageInfo.imageList" :key="item._id">
				<view class="imageItem" 
				:style="{marginRight:index2===0 ? '1vw' : '0'}" 
				v-for="(item2,index2) in item" :key="index">
					<u--image :lazy-load="true"
					:showLoading="true" 
					:src="item2" 
					:width="imageObj.imageWidth" 
					:height="imageObj.imageHeight" 
					:fade="true" 
					:shape="imageObj.shape"
					duration="450"
					>
						<template v-slot:loading>
							<u-loading-icon color="red"></u-loading-icon>
						</template>
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u--image>
				</view>
			</view>
		</view>
		<view style="padding: 10px;">
			<u-row
				justify="space-between"
			> 
				<u-col span="10">
					<view class="tags">
						<view>
							<u-tag @click="clickCategory" shape="circle" color="#19be6b" borderColor="#dbf1e1" bgColor="#dbf1e1" :text="userImageInfo.category" size="mini" icon="tags-fill"></u-tag>
						</view>
						<view style="margin-left: 5px;" v-for="(item,index) in userImageInfo.tags" :key="index">
							<u-tag @click="clickTagItem(item)" shape="circle" color="#606266" borderColor="#f3f4f6" bgColor="#f3f4f6" :text="item" size="mini"></u-tag>
						</view>
					</view>
				</u-col>
				<u-col span="2">
					<u-button open-type="share" @click="toShare" class="button" size="mini" type="primary" shape="circle" text="发送给好友"></u-button>
				</u-col>
			</u-row>
		</view>
		<u-gap height="6" bgColor="#f4f4f5"></u-gap>
		<view class="value_bottom">
			<u--text align="center" 
			color="#303133" 
			lineHeight="15"  
			prefixIcon="play-left-fill" 
			iconStyle="color:#303133;font-size:8px;margin-right:6px"  
			text="上一组"
			@click="preImage"
			></u--text>
			<u--text align="center" 
			color="#303133" 
			lineHeight="15"  
			suffixIcon="play-right-fill" 
			iconStyle="color:#303133;font-size:8px;margin-left:6px"  
			text="下一组"
			@click="nextImage"
			></u--text>
		</view>
		<u-gap height="6" bgColor="#f4f4f5"></u-gap>
		<!-- <view>
			<infoRecommend />
		</view> -->
		<!-- <view class="bottom">
			<u--text align="center" color="#606266"  prefixIcon="heart" iconStyle="font-size: 19px" text="333"></u--text>
		</view> -->
	</view>
</template>

<script>
	// import infoRecommend from '../../components/index/infoRecommend.vue'
	import { getImageByCategory,getAllTagListByCategory } from '../../api/api.js'
	import moment from 'moment'
	export default {
		props:{
			recommendData:Object
		},
		mounted() {
		},
		data(){
			return {
				value:'',
				dataInx:0,
				userImageList:[],
				userImageInfo:this.recommendData,
				imageObj:{
					imageHeight:'47vw',
					imageWidth:'47vw',
					shape:'square'
				},
				selectSize:'big',
				selectShape: 'square',
				tagList:[
					{text:'头像',path:'pages/imagePreview/imagePreview',id:'portrait'},
					{text:'壁纸',path:'pages/wallpaper/wallpaper',id:'wallpaper'},
					{text:'美图',path:'pages/prettyPictures/prettyPictures',id:'prettyPictures'},
					{text:'网名',path:'pages/netWorkName/netWorkName',id:'netWorkId'},
					{text:'签名',path:'pages/signature/signature',id:'signature'},
				]
			}
		},
		computed:{
			
		},
		filters:{
			formatDate(date){
				moment.locale('zh-cn')
				// let date = new Date(this.recommendData.issueTime)
				return moment(date).format('MMMDo h:mm')
			}
		},
		methods:{
			clickCategory(){
				let idx = this.tagList.findIndex(item=>item.text===this.userImageInfo.column);
				if(idx===-1){
					return
				}
				uni.$u.route({
					url: this.tagList[idx].path,
					params:{
						NavigationBarTitle:this.userImageInfo.column,
						toItem:this.userImageInfo.category
					}
				})
			},
			clickTagItem(tagName){
				getAllTagListByCategory({CategoryName:encodeURIComponent(this.userImageInfo.category)}).then((res)=>{
					let index = res.tagsList.findIndex(item=>tagName==item.name);
					if(index===-1){
						return
					}
					uni.$u.route({
						url: 'pages/tagPage/tagPage',
						params:{
							tagList:encodeURIComponent(JSON.stringify(res.tagsList)),
							category:this.userImageInfo.category,
							index
						}
					})
				})
			},
			formatTransform(){
				let imageListLen = this.userImageInfo.imageList.length;
				let imageArray = this.userImageInfo.imageList;
				let arr = [];
				for(let i=0;i < imageListLen;i+=2 ){
					arr.push(imageArray.slice(i,Math.min(imageListLen,i+2)));
				}
				this.userImageInfo.imageList = arr;
			},
			preImage(){
				this.dataInx--;
				if(this.dataInx<0){
					return uni.$u.route({
						type:'navigateBack'
					})
				}else {
					this.userImageInfo = this.userImageList[this.dataInx];
				}
			},
			nextImage(){
				if(this.dataInx > (this.userImageList.length-1)){
					getImageByCategory({notId:this.userImageInfo._id,columnName:encodeURIComponent(this.recommendData.category),skipNum:this.dataInx,needNum:1}).then((res)=>{
						if(res.imageData.length>0){
							this.userImageInfo = res.imageData[0]
							this.formatTransform();
						}
					})
					this.userImageList.push(this.userImageInfo);
				}else{
					 this.userImageInfo = this.userImageList[this.dataInx]
				}
				this.dataInx++;
			},
			toShare(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 5,
					href: "http://uniapp.dcloud.io/",
					title: "分享",
					imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
					miniProgram :{
						id:'wxee2cae1360a4fce7',
						path:'http://uniapp.dcloud.io/',
						type:0
					},
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			chgSize(size){
				if(size===this.selectSize){
					return
				}
				if(size==="big"){
					this.imageObj.imageHeight = '47vw'
					this.imageObj.imageWidth = '47vw'
				}
				if(size==="min"){
					this.imageObj.imageHeight = '23vw'
					this.imageObj.imageWidth = '23vw'
				}
				this.selectSize = size;
			},
			chgShape(shape){
				if(shape===this.selectShape){
					return
				}
				if(shape==="square"){
					this.imageObj.shape = 'square'
				}
				if(shape==="circle"){
					this.imageObj.shape = 'circle'
				}
				this.selectShape = shape;
			}
		},
		watch:{
			recommendData: function(){	
				this.userImageInfo = this.recommendData;
				this.formatTransform();
			},
			userImageInfo:function(){
				if(this.userImageInfo.column==='壁纸'){
					this.imageObj.imageWidth = '90vw';
					this.imageObj.imageHeight = '180vw';
				}
				this.$parent.likeNum = this.userImageInfo.likeNum;
				this.$parent.currImageInfoId = this.userImageInfo._id;
			}
		},
		components:{
			//infoRecommend
		}
	}
</script>

<style lang="scss" scoped>
	.flexRow {
			display: flex;
			flex-direction: row;
			align-items: center;
	}
	.borRadius {
		border-radius: 1vw;
	}
	.checkedBag {
		background-color: #2979ff !important;
	}
	.imageList {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		margin-top: 1vw;
		.imageItem {
		}
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
	// .bottom {
	// 	height: 8vh;
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: center;
	// 	align-items: center;
	// 	position: sticky;
	// 	bottom: 0;
	// 	background-color: #FFFFFF;
	// }
	.value_bottom {
		padding: 12px;
		display: flex;
		flex-direction: row;
	}
	.tags {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
</style>
