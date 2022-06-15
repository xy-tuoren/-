<template>
	<view>
		<imageHeader :headerData="selectListData"/>
		<u-tabs :list="tagList" 
		:scrollable="tagList.length > 4 ? true : false" 
		:inactiveStyle="{
			color: '#909399',
			fontSize: '13px'
		}"
		@click="tabItemClick"
		itemStyle="padding-left: 15px;padding-top:5px ;padding-right: 15px; height: 28px;"
		:activeStyle="{
			color: '#303133',
			fontSize: '12px',
			fontWeight: 'bold',
			transform: 'scale(1.05)'
		}"
		>
		</u-tabs>
		<imagePreview imageHeight="46vw"/>
	</view>
</template>

<script>
	import imagePreview from '../../components/index/imagePreview.vue'
	import imageHeader from '../../components/index/header.vue'
	export default {
		data() {
			return {
				NavigationBarTitle:'',
				selectListData:[],
				tagList: [{
							name: '标签',
						}, {
							name: '推荐',
						}, {
							name: '电影'
						}, {
							name: '科技'
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
			tabItemClick(item){
				uni.$u.route({
					url: 'pages/tagPage/tagPage',
					params:{
						NavigationBarTitle:item.name
					}
				})
			}
		},
		onLoad(obj) { 
			this.NavigationBarTitle = obj.NavigationBarTitle || ''
			this.selectListData.push(this.NavigationBarTitle)
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
