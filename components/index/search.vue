<template>
	<view>
		<view style="position: relative;">
			<view class="search">
				<view style="height: 3vh;flex: 1;">
					<u--text :text="currColumnName"
					@click="chgPullDown"
					align="center"
					lineHeight="3vh"
					suffixIcon="arrow-down-fill"
					color="#2979ff"
					iconStyle="font-size:8px;color:#2979ff;margin-left:3px"
					></u--text>
				</view>
				<view style="flex: 6;">
					<u-search
					@search="clickSearch"
					@custom="clickSearch"
					maxlength="20"
					actionText="搜索" 
					margin="10px" 
					height="3vh" 
					placeholder="搜索用户和内容" 
					:show-action="true"
					v-model="keyword"></u-search>
				</view>
			</view>
			<view class="pullDown" v-show="pullDownShow">
				<view v-for="(item,index) in tagList" :key="index"  style="padding: 5px;">
					<u--text @click="chgColumn(item.name)" align="center" color="#f4f4f5" size="13px" :text="item.name"></u--text>
				</view>
			</view>
		</view>
		<u-line></u-line>
		<view style="padding: 10px;">
			<view>
				<u--text margin="10px 0" size="13" color="#c0c4cc" text="热门搜索"></u--text>
			</view>
			<view class="tagsList">
				<view style="margin:5px;" v-for="(item,index) in categoryData" :key="index">
					<u-tag :text="item"
					@click="categoryItemClick(item)"
					borderColor="#f3f4f6" 
					bgColor="#f3f4f6" 
					color="#606266"
					shape="circle" >
					</u-tag>
				</view>
			</view>
		</view>
		<view style="padding: 10px;">
			<view>
				<u--text margin="0 0 10px 0" size="13" color="#c0c4cc" text="历史记录"></u--text>
			</view>
			<view v-for="(item,index) in searchHistory" :key="index">
				<view style="display: flex;flex-direction: row;margin: 10px 0;">
					<u--text size="14" color="#606266" :text="item"></u--text>
					<u-icon @click="delSearchItem(index)" name="close" color="#c0c4cc" size="12"></u-icon>
				</view>
				<u-line></u-line>
			</view>
			<view>
				<u--text margin="10px 0"
				@click="delAllHistory"
				align="center" 
				prefixIcon="trash" 
				size="13"
				lineHeight="13px"
				color="#c0c4cc"
				iconStyle="color:#c0c4cc;margin-right:3px"
				text="清除搜索历史"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	import { getCategoryByColumn,searchDateByColumnAndKeyword } from '../../api/api.js'
	import antiShake from '../../utils/antiShake.js'
	export default {
		data(){
			return {
				keyword:'',
				pullDownShow:false,
				currColumnName:'头像',
				searchHistory:[],
				timer:null,
				tagList:[
					{name:'头像',path:'pages/imagePreview/imagePreview'},
					{name:'壁纸',path:'pages/wallpaper/wallpaper'},
					{name:'美图',path:'pages/prettyPictures/prettyPictures'},
					{name:'网名',path:'pages/signature/signature'},
					{name:'签名',path:'pages/signature/signature'},
					{name:'用户',path:'pages/my/myInfo'}
				],
				categoryDataMap:new Map(),
				categoryData:[]
			}
		},
		mounted() {
			getCategoryByColumn({columnName:this.currColumnName}).then((res)=>{
				this.categoryDataMap.set(this.currColumnName,res.categoryData)
				this.categoryData = res.categoryData
			})
			this.searchHistory = uni.getStorageSync('searchHistory') ? Array.from(JSON.parse(uni.getStorageSync('searchHistory'))) : [];
		},
		watch:{
			keyword:function(newVal,oldVal){
				if(newVal.length <= 0){
					return
				}
				if(this.timer){
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(()=>{
					searchDateByColumnAndKeyword({columnName:encodeURIComponent(this.currColumnName),keyword:encodeURIComponent(this.keyword)}).then((res)=>{
						
					})
				},1000)
			}
		},
		methods:{
			chgColumn(name){
				this.keyword = ''
				if(this.categoryDataMap.has(name)){
					this.categoryData = this.categoryDataMap.get(name)
				}else{
					getCategoryByColumn({columnName:name}).then((res)=>{
						if(res.categoryData.length < 1 || !res.categoryData[0]){
							res.categoryData = ['历神']
						}
						this.categoryDataMap.set(name,res.categoryData)
						this.categoryData = res.categoryData
					})
				}
				this.currColumnName = name
				this.pullDownShow = false
			},
			categoryItemClick(categoryName){
				let obj = this.tagList.find(item=>this.currColumnName === item.name)
				uni.$u.route({
					url: obj.path,
					params: {
						NavigationBarTitle:obj.name,
						toItem:categoryName
					}
				})
			},
			chgPullDown(){
				this.pullDownShow = !this.pullDownShow
			},
			clickSearch(value){
				if(value.trim().length <= 0){
					return
				}
				let searchHistory = uni.getStorageSync('searchHistory');
				if(this.searchHistory.length > 11){
					this.searchHistory.pop()
				}
				this.searchHistory.push(value)
				if(searchHistory){
					let arr = JSON.parse(searchHistory);
					if(arr.length > 11){
						arr.pop()
					}
					arr.push(value)
					uni.setStorageSync('searchHistory',JSON.stringify(arr))
				}else{
					uni.setStorageSync('searchHistory',JSON.stringify([value]))
				}
			},
			delSearchItem(index){
				let arr = JSON.parse(uni.getStorageSync('searchHistory'));
				arr.splice(index,index+1);
				uni.setStorageSync('searchHistory',JSON.stringify(arr))
				this.searchHistory.splice(index,index+1);
			},
			delAllHistory(){
				let arr = JSON.parse(uni.getStorageSync('searchHistory'));
				arr = []
				uni.setStorageSync('searchHistory',JSON.stringify(arr))
				this.searchHistory = [];
			}
		}
	}
</script>

<style lang="scss">
	.search{
		padding: 0 10px;
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: row;
	}
	.tagsList {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.pullDown {
		border-radius: 3px;
		padding: 5px 8px;
		transform: translate(10px);
		z-index: 999;
		background-color: #2C405A;
		position: absolute;
	}
	.pullDown:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 10px;
		transform: translateY(-5px);
		width:0;
		height:0;
		border-right:6px solid transparent;
		border-left:6px solid transparent;
		border-bottom:6px solid #2C405A;
	}
</style>
