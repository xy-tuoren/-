<template>
	<view>
		<imageHeader @clickRecommend="clickRecommend" 
		@clickReputation="clickReputation"  
		@clickNewest="clickNewest"
		:NavigationBarTitle.sync="NavigationBarTitle" 
		:headerData="selectListData"
		:showText="NavigationBarTitle"
		/>
		<view v-show="NavigationBarTitle!=selectListData[0]">
			<u-tabs :list="tagList" 
			:scrollable="true" 
			:inactiveStyle="{
				color: '#909399',
				fontSize: '13px'
			}"
			:current="currentActive"
			@click="tabItemClick"
			itemStyle="padding-left: 3vw;padding-top:5px ;padding-right: 3vw; height: 28px;"
			:activeStyle="{
				color: '#2979ff',
				fontSize: '12px',
				fontWeight: 'bold',
				transform: 'scale(1.05)'
			}"
			>
			</u-tabs>
		</view>
		<imagePreview :dataList="imagePreviewData" imageHeight="90vw"/>
	</view>
</template>

<script>
	import imagePreview from '../../components/index/imagePreview.vue'
	import imageHeader from '../../components/index/header.vue'
	import { getColumnDataByName,getImageByCategory,getAllTagListByCategory } from '../../api/api.js'
	export default {
		data() {
			return {
				NavigationBarTitle:'',
				selectListData:[],
				imagePreviewList:new Map(),
				imagePreviewData:[],
				pageMap:new Map(),
				pageSize:8,
				currentActive:0,
				tagListMap:new Map(),
				tagList: [{
							name: 'xy',
						}, {
							name: '推荐'}]
			}
		},
		methods: {
			//点击推荐
			clickRecommend(){
				let arr = this.imagePreviewList.get(this.NavigationBarTitle);
				arr.sort(() => Math.random() - 0.5)
				this.imagePreviewList.set(this.NavigationBarTitle,arr);
			},
			//点击好评榜
			clickReputation(){
				let arr = this.imagePreviewList.get(this.NavigationBarTitle);
				arr.sort((a,b)=>{
					return b.likeNum - a.likeNum
				})
				this.imagePreviewList.set(this.NavigationBarTitle,arr);
			},
			//点击最新
			clickNewest(){
				let arr = this.imagePreviewList.get(this.NavigationBarTitle);
				arr.sort((a,b)=>{
					return (new Date(b.issueTime)).getTime() - (new Date(a.issueTime)).getTime()
				})
				this.imagePreviewList.set(this.NavigationBarTitle,arr);
			},
			tabItemClick(index){
				uni.$u.route({
					url: 'pages/tagPage/tagPage',
					params:{
						category:this.NavigationBarTitle,
						index:index.index,
						tagList:encodeURIComponent(JSON.stringify(this.tagListMap.get(this.NavigationBarTitle)))
					}
				})
			}
		},
		watch:{
			NavigationBarTitle:function(val){ 
				if(!this.imagePreviewList.has(val)){
					getAllTagListByCategory({CategoryName:encodeURIComponent(val)}).then((res)=>{
						this.tagListMap.set(val,res.tagsList)
						this.tagList = res.tagsList;
					});
					getImageByCategory({columnName:encodeURIComponent(val),skipNum:0,needNum:this.pageSize}).then((res)=>{
						this.imagePreviewList.set(val,res.imageData)
						this.imagePreviewData = res.imageData
						uni.setNavigationBarTitle({
							title: this.NavigationBarTitle
						});
					})
				}else{
					this.imagePreviewData = this.imagePreviewList.get(val);
					this.tagList = this.tagListMap.get(val);
					uni.setNavigationBarTitle({
						title: this.NavigationBarTitle
					});
				}
			}
		},
		onLoad(obj) { 
			getColumnDataByName({columnName:encodeURIComponent(obj.NavigationBarTitle),skipNum:0,needNum:this.pageSize}).then((res)=>{
				this.NavigationBarTitle = obj.NavigationBarTitle || '';
				this.selectListData.push(this.NavigationBarTitle);
				this.imagePreviewList.set(this.NavigationBarTitle,res.columnData);
				this.imagePreviewData = res.columnData;
				[].push.apply(this.selectListData,res.selectListData);
				this.selectListData.forEach(item=>this.pageMap.set(item,1));
				if(obj.toItem){
					this.NavigationBarTitle = obj.toItem;
				}
			})
		},
		onReachBottom(){
			if(this.NavigationBarTitle==this.selectListData[0]){
				this.pageMap.set(this.NavigationBarTitle,this.pageMap.get(this.NavigationBarTitle)+1)
				getColumnDataByName({columnName:encodeURIComponent(this.NavigationBarTitle),skipNum:(this.pageMap.get(this.NavigationBarTitle)-1)*this.pageSize,needNum:this.pageSize}).then((res)=>{
					let arr = [...this.imagePreviewList.get(this.NavigationBarTitle),...res.columnData];
					this.imagePreviewList.set(this.NavigationBarTitle,arr);
					this.imagePreviewData = arr;
				})
			}else {
				this.pageMap.set(this.NavigationBarTitle,this.pageMap.get(this.NavigationBarTitle)+1)
				getImageByCategory({columnName:encodeURIComponent(this.NavigationBarTitle),skipNum:(this.pageMap.get(this.NavigationBarTitle)-1)*this.pageSize,needNum:this.pageSize}).then((res)=>{
					let arr = [...this.imagePreviewList.get(this.NavigationBarTitle),...res.imageData];
					this.imagePreviewList.set(this.NavigationBarTitle,arr);
					this.imagePreviewData = arr;
				})
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.NavigationBarTitle
			});
		},
		components:{
			imagePreview,
			imageHeader
		}
	}
</script>

<style>

</style>
