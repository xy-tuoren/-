<template>
	<view>
		<userImageInfo :recommendData="recommendData"/>
		<view>
			<infoRecommend :categoryName="recommendData.category" :currImageId="recommendData._id" />
		</view>
		<view class="slider" @click="clickSlider" :class="{isShow:sliderShow}">
			<view>
				<u--text algin="center" size="13" prefixIcon="grid" iconStyle="margin-right:3px;color:#19be6b"  text="查看更多"></u--text>
			</view>
			<view>
				<u--text algin="center" size="13" color="#19be6b" :text="recommendData.category"></u--text>
			</view>
		</view>
		<view class="bottom" @click="clickLike">
			<u--text align="center" color="#606266"  :prefixIcon="getLikeIcon" :iconStyle="{fontSize: '19px',color:getLikeIconColor}" :text="likeNum"></u--text>
		</view>
	</view>
</template>

<script>
	import userImageInfo from "../../components/index/userImageInfo.vue"
	import infoRecommend from '../../components/index/infoRecommend.vue'
	import { updateLikeNumById } from '../../api/api.js'
	export default {
		data() {
			return {
				recommendData:{},
				sliderShow:false,
				likeNum:0,
				currImageInfoId:'',
				itemList:[
					{text:'头像',path:'pages/imagePreview/imagePreview'},
					{text:'壁纸',path:'pages/wallpaper/wallpaper'},
					{text:'美图',path:'pages/prettyPictures/prettyPictures'},
					{text:'网名',path:'pages/netWorkName/netWorkName'},
					{text:'签名',path:'pages/signature/signature'}
				],
			}
		},
		onLoad(obj){
			if(obj.recommendData){
				this.recommendData = JSON.parse(decodeURIComponent(obj.recommendData));
				this.likeNum = this.recommendData.likeNum;
				this.currImageInfoId = this.recommendData._id
			}
			this.$data.flag = true;
		},
		onPageScroll(obj){
			if(this.$data.flag){
				this.$data.flag = false;
				setTimeout(()=>{
					if(!this.$data.scroll){
						this.$data.scroll = obj.scrollTop;
						this.sliderShow = true;
						this.$data.flag = true;
						return
					}
					if(this.$data.scroll < obj.scrollTop){
						this.sliderShow = true;
					}
					if(this.$data.scroll > obj.scrollTop){
						this.sliderShow = false;
					}
					this.$data.scroll = obj.scrollTop;
					this.$data.flag = true;
				},100)
			}
		},
		methods: {
			clickSlider(){
				let idx = this.itemList.findIndex((item)=>{
					return this.recommendData.category.includes(item.text)
				})
				uni.$u.route({
					url: this.itemList[idx].path,
					params: {
						NavigationBarTitle:this.itemList[idx].text,
						toItem:this.recommendData.category
					}
				})
			},
			clickLike(){
				updateLikeNumById({_id:this.currImageInfoId,token:this.$store.state.token}).then((res)=>{
					if(res.likeNum){
						this.likeNum++;
						this.$children[0].userImageInfo.likeNum++;
					}else{
						this.likeNum--;
						this.$children[0].userImageInfo.likeNum--;
					}
					this.$store.dispatch('getLikeImageIdList');
				})
			}
		},
		components:{
			userImageInfo,
			infoRecommend
		},
		computed:{
			getLikeIcon(){
				return this.$store.state.userLikeImageList.includes(this.currImageInfoId) ? 'heart-fill' : 'heart';
			},
			getLikeIconColor(){
				return this.$store.state.userLikeImageList.includes(this.currImageInfoId) ? '#fa3534' : '#606266';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.slider {
		position: fixed;
		background-color: #FFFFFF;
		border-radius: 5vh 0% 0% 5vh;
		height: 5vh;
		right: 0;
		padding: 5px;
		bottom: 15vh;
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-direction: row;
		transition: all .8s;
		transform: translateX(100%);
		opacity: 0;
	}
	.bottom {
		height: 8vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: sticky;
		bottom: 0;
		background-color: #FFFFFF;
	}
	.isShow {
		opacity: 1;
		transform: translateX(0);
	}
</style>
