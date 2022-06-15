<template>
	<view style="background-color: #f4f4f5;">
		<image-header @clickRecommend="clickRecommend" 
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
		<signature v-for="item in signatureData" :itemData="item" :key="item._id"/>
	</view>
</template>

<script>
	import imageHeader from '../../components/index/header.vue'
	import signature from '../../components/index/signature.vue'
	import { getCharactersDataByColumn,getCharactersByCategory,getCharactersAllTagByCategory } from '../../api/api.js'
	export default {
		data() {
			return {
				NavigationBarTitle:'',
				selectListData:[],
				signatureDataList:new Map(),
				signatureData:[],
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
				let arr = this.signatureDataList.get(this.NavigationBarTitle);
				arr.sort(() => Math.random() - 0.5)
				this.signatureDataList.set(this.NavigationBarTitle,arr);
			},
			//点击好评榜
			clickReputation(){
				let arr = this.signatureDataList.get(this.NavigationBarTitle);
				arr.sort((a,b)=>{
					return b.likeNum - a.likeNum
				})
				this.signatureDataList.set(this.NavigationBarTitle,arr);
			},
			//点击最新
			clickNewest(){
				let arr = this.signatureDataList.get(this.NavigationBarTitle);
				arr.sort((a,b)=>{
					return (new Date(b.issueTime)).getTime() - (new Date(a.issueTime)).getTime()
				})
				this.signatureDataList.set(this.NavigationBarTitle,arr);
			},
			tabItemClick(index){
				uni.$u.route({
					url: 'pages/tagPage/characters',
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
				if(!this.signatureDataList.has(val)){
					getCharactersAllTagByCategory({CategoryName:encodeURIComponent(val)}).then((res)=>{
						this.tagListMap.set(val,res.tagsList)
						this.tagList = res.tagsList;
					});
					getCharactersByCategory({columnName:encodeURIComponent(val),skipNum:0,needNum:this.pageSize}).then((res)=>{
						this.signatureDataList.set(val,res.imageData)
						this.signatureData = res.imageData
						uni.setNavigationBarTitle({
							title: this.NavigationBarTitle
						});
					})
				}else{
					this.signatureData = this.signatureDataList.get(val);
					this.tagList = this.tagListMap.get(val);
					uni.setNavigationBarTitle({
						title: this.NavigationBarTitle
					});
				}
			}
		},
		onLoad(obj) { 
			getCharactersDataByColumn({columnName:encodeURIComponent(obj.NavigationBarTitle),skipNum:0,needNum:this.pageSize}).then((res)=>{
				this.NavigationBarTitle = obj.NavigationBarTitle || '';
				this.selectListData.push(this.NavigationBarTitle);
				this.signatureDataList.set(this.NavigationBarTitle,res.columnData);
				this.signatureData = res.columnData;
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
				getCharactersDataByColumn({columnName:encodeURIComponent(this.NavigationBarTitle),skipNum:(this.pageMap.get(this.NavigationBarTitle)-1)*this.pageSize,needNum:this.pageSize}).then((res)=>{
					let arr = [...this.signatureDataList.get(this.NavigationBarTitle),...res.columnData];
					this.signatureDataList.set(this.NavigationBarTitle,arr);
					this.signatureData = arr;
				})
			}else {
				this.pageMap.set(this.NavigationBarTitle,this.pageMap.get(this.NavigationBarTitle)+1)
				getCharactersByCategory({columnName:encodeURIComponent(this.NavigationBarTitle),skipNum:(this.pageMap.get(this.NavigationBarTitle)-1)*this.pageSize,needNum:this.pageSize}).then((res)=>{
					let arr = [...this.signatureDataList.get(this.NavigationBarTitle),...res.imageData];
					this.signatureDataList.set(this.NavigationBarTitle,arr);
					this.signatureData = arr;
				})
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.NavigationBarTitle
			});
		},
		components: {
			imageHeader,
			signature
		}
	}
</script>

<style lang="scss">

</style>
