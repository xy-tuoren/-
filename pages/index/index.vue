<template>
	<view class="content">
		<view class="header">
			<u-search 
			@click="searchClick" 
			:disabled="true"
			class="search" 
			margin="10px 10px 15px 10px" 
			height="25px" placeholder="猜你喜欢" 
			:showAction="false" 
			v-model="keyword"></u-search>
			<view style="padding: 10;">
				<u-grid
				:border="false"
				:col="tagList.length"
				@click="tagListItemClick"
				>
					<u-grid-item
						v-for="(item,index) in tagList"
						:key="index"
					>
						<view style="padding-bottom: 10px;">
							<u--image :lazy-load="true"
							:showLoading="true" 
							:src="item.image" 
							shape="circle" 
							width="13vw" 
							height="13vw" 
							:fade="true" 
							duration="450"
							>
								<template v-slot:loading>
								    <u-loading-icon color="red"></u-loading-icon>
								</template>
								<view slot="error" style="font-size: 24rpx;">加载失败</view>
							</u--image>
							<u-gap height="5" bgColor="#FFFFFF"></u-gap>
							<u--text align="center" color="#606266" size="13px"  :text="item.text"></u--text>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="recommend">
			<u-gap height="8" bgColor="#f4f4f5" marginBottom="10px"></u-gap>
			<text style="margin-left: 10px;">精选推荐</text>
			<u-line color="#d6d7d9" length="100vw" margin="10px 0 0 0"></u-line>
			<view v-for="(item,index) in recommendList" :key="item._id">
				<view class="exhibitList">
					<recommend-exhibit :recommendData="item" />
				</view>
				<u-gap height="8" bgColor="#f4f4f5"></u-gap>
			</view>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import recommendExhibit from '../../components/index/recommendExhibit.vue'
	import { getRecommend,getRanColumnImage } from '../../api/api.js'
 	export default {
		data() {
			return {
				keyword: '',
				tagList:[
					{image:'/static/tagListImage/demo.jpg',text:'头像',path:'pages/imagePreview/imagePreview',id:'portrait'},
					{image:'/static/tagListImage/demo.jpg',text:'壁纸',path:'pages/wallpaper/wallpaper',id:'wallpaper'},
					{image:'/static/tagListImage/demo.jpg',text:'美图',path:'pages/prettyPictures/prettyPictures',id:'prettyPictures'},
					{image:'/static/tagListImage/demo.jpg',text:'网名',path:'pages/signature/signature',id:'netWorkId'},
					{image:'/static/tagListImage/demo.jpg',text:'签名',path:'pages/signature/signature',id:'signature'},
				],
				recommendList:[
					{
						_id:'1',
						userId:{
							userAvatar:require('../../static/tagListImage/demo.jpg'),
							userName:'历神'
						},
						issueDate:'12123123',
						text:'用户想说的话',
						categoryName:'分类',
						tagsList:[
							{name:'标签1'},
							{name:'标签2'},
							{name:'标签3'}
						],
						imageList:[
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg',
							'/static/tagListImage/demo.jpg'
						],
						likeNum:'999'
					}
				]
			}
		},
		onLoad() {
			getRanColumnImage().then((res)=>{
				res.columnList.forEach((item,index)=>{
					this.tagList[index].image = item.imageList[0]
				})
			})
			this.$store.commit('changeTabBarIdx',0);
			getRecommend({needNum:5,skipNum:0}).then(({recommend})=>{
				this.recommendList = recommend
			})
			this.$store.dispatch('getLikeImageIdList');
		}, 
		methods: {
			tagListItemClick(name){
				let obj = this.tagList[name]; 
				uni.$u.route({
					url: obj.path,
					params: {
						id: obj.id,
						NavigationBarTitle:obj.text
					}
				})
			},
			searchClick(){
				uni.$u.route({
					url: 'pages/searchInfo/searchInfo',
				})
			}
		},
		components: {
			recommendExhibit
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
	}
	.recommend {
		.exhibitList {
			padding: 10px;
		}
	}
	.content {
		background-color: $uni-bg-color;
		display: flex;
		flex-direction: column; 
		align-items: center;
		justify-content: center;
	}
</style>
