<template>
	<view>
		<u-tabs :list="tagList" 
		:scrollable="tagList.length > 4 ? true : false" 
		:inactiveStyle="{
			color: '#909399',
			fontSize: '13px'
		}"
		:current="currentActive"
		@click="tabItemClick"
		itemStyle="padding-left: 15px;padding-top:5px ;padding-right: 15px; height: 28px;"
		:activeStyle="{
			color: '#2979ff',
			fontSize: '12px',
			fontWeight: 'bold',
			transform: 'scale(1.05)'
		}"
		>
		</u-tabs>
		<imagePreview :dataList="dataList" imageHeight="46vw"/>
	</view>
</template>

<script>
	import imagePreview from '../../components/index/imagePreview.vue'
	import { getDataByTagAndCategory } from '../../api/api.js'
	export default {
		data() {
			return {
				NavigationBarTitle:'',
				category:'',
				dataMap:new Map(),
				dataList:[],
				currentActive:0,
				pageSize:8,
				tagMap:new Map(),
				tagList: [{
							name: 'xy',
						}, {
							name: '推荐',
						}, {
							name: '电影'
						}, {
							name: '标签'
						}, {
							name: '音乐'
						}, {
							name: '美食'
						}, {
							name: '文化'
						}, {
							name: '财经'
						}, {
							name: '手工'
				}]
			}
		},
		methods: {
			tabItemClick(index){
				if(this.dataMap.has(index.name)){
					this.dataList = this.dataMap.get(index.name);
				}else{
					getDataByTagAndCategory({
						CategoryName:encodeURIComponent(this.category),
						tagName:encodeURIComponent(index.name),
						skipNum:0,
						needNum:this.pageSize
					})
					.then((res)=>{
						this.dataMap.set(index.name,res.imageData);
						this.dataList = res.imageData;
					})
				}
				this.NavigationBarTitle = index.name;
				uni.setNavigationBarTitle({
					title: index.name
				});
			}
		},
		onLoad(obj) {
			this.category = obj.category;
			this.tagList = JSON.parse(decodeURIComponent(obj.tagList));
			this.tagList.forEach(item=>this.tagMap.set(item.name,1));
			this.currentActive = obj.index;
			this.NavigationBarTitle = this.tagList[this.currentActive].name;
			getDataByTagAndCategory({
				CategoryName:encodeURIComponent(this.category),
				tagName:encodeURIComponent(this.NavigationBarTitle),
				skipNum:0,
				needNum:this.pageSize
			})
			.then((res)=>{
				this.dataMap.set(this.NavigationBarTitle,res.imageData);
				this.dataList = res.imageData;
			})
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.NavigationBarTitle
			});
		},
		onReachBottom(){
			this.tagMap.set(this.NavigationBarTitle,this.tagMap.get(this.NavigationBarTitle)+1);
			getDataByTagAndCategory({
				CategoryName:encodeURIComponent(this.category),
				tagName:encodeURIComponent(this.NavigationBarTitle),
				skipNum:(this.tagMap.get(this.NavigationBarTitle)-1)*this.pageSize,
				needNum:this.pageSize
			})
			.then((res)=>{
				this.dataMap.set(this.NavigationBarTitle,[...this.dataMap.get(this.NavigationBarTitle),...res.imageData]);
				this.dataList = this.dataMap.get(this.NavigationBarTitle);
			})
		},
		components:{
			imagePreview,
		}
	}
</script>

<style>

</style>
