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
		<signature v-for="(item,index) in dataList" :itemData="item" :key="item._id"/>
	</view>
</template>

<script>
	import signature from '../../components/index/signature.vue'
	import { getCharactersDataByTagAndCategory } from '../../api/api.js'
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
					getCharactersDataByTagAndCategory({
						CategoryName:encodeURIComponent(this.category),
						tagName:encodeURIComponent(index.name),
						skipNum:0,
						needNum:this.pageSize
					})
					.then((res)=>{
						this.dataMap.set(index.name,res.charactersData);
						this.dataList = res.charactersData;
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
			getCharactersDataByTagAndCategory({
				CategoryName:encodeURIComponent(this.category),
				tagName:encodeURIComponent(this.NavigationBarTitle),
				skipNum:0,
				needNum:this.pageSize
			})
			.then((res)=>{
				this.dataMap.set(this.NavigationBarTitle,res.charactersData);
				this.dataList = res.charactersData;
			})
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.NavigationBarTitle
			});
		},
		onReachBottom(){
			this.tagMap.set(this.NavigationBarTitle,this.tagMap.get(this.NavigationBarTitle)+1);
			getCharactersDataByTagAndCategory({
				CategoryName:encodeURIComponent(this.category),
				tagName:encodeURIComponent(this.NavigationBarTitle),
				skipNum:(this.tagMap.get(this.NavigationBarTitle)-1)*this.pageSize,
				needNum:this.pageSize
			})
			.then((res)=>{
				this.dataMap.set(this.NavigationBarTitle,[...this.dataMap.get(this.NavigationBarTitle),...res.charactersData]);
				this.dataList = this.dataMap.get(this.NavigationBarTitle);
			})
		},
		components:{
			signature,
		}
	}
</script>

<style>

</style>
