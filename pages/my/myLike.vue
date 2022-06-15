<template>
	<view>
		<view>
			<u-tabs :list="tagList"
			:scrollable="tagList.length > 4 ? true : false" 
			:inactiveStyle="{
				color: '#606266',
				fontSize: '14px'
			}"
			:current="currentActive"
			@click="tabItemClick"
			itemStyle="padding-left: 23px;padding-top:5px ;padding-right: 23px; height: 35px;"
			:activeStyle="{
				color: '#2979ff',
				fontSize: '14px',
				fontWeight: 'bold',
			}"
			>
			</u-tabs>
			<u-line margin="5px 0px"></u-line>
		</view>
		<view>
			<imagePreview v-show="imagePreviewShow" :dataList="imagePreviewList" :imageHeight="imageHeight"></imagePreview>
			<signature v-show="signatureShow" v-for="item in signatureDataList" :itemData="item" :key="item.userId"/>
			<netWorkName v-show="netWorkName"  v-for="item in netWorkNameDataList" :key="item.userId" :itemData="item" />
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
				imagePreviewShow:true,
				signatureShow:false,
				netWorkName:false,
				imageHeight:"46vw",
				imagePreviewList:[
					{
						image:'/static/tagListImage/demo.jpg',
						text:'我乃历神我乃历神',
						likeNum:'999'
					},
					{
						image:'/static/tagListImage/demo.jpg',
						text:'我乃历神我乃历神',
						likeNum:'999'
					},
					{
						image:'/static/tagListImage/demo.jpg',
						text:'我乃历神我乃历神',
						likeNum:'999'
					},
				],
				signatureDataList:[
					{
						userId:'sssss',
						userAvatar:require('../../static/tagListImage/demo.jpg'),
						userName:'历神',
						issueDate:1234232,
						backgroundImage:require('../../static/tagListImage/demo.jpg'),
						signature:'我乃历神',
						categoryName:'历神话日记',
						tagList:[
							{name:'传说'},
							{name:'史诗'}
						],
						likeNum:999
					},{
						userId:'ss1sss',
						userAvatar:require('../../static/tagListImage/demo.jpg'),
						userName:'历神',
						issueDate:1234232,
						backgroundImage:require('../../static/tagListImage/demo.jpg'),
						signature:'我乃历神',
						categoryName:'历神话日记',
						tagList:[
							{name:'传说'},
							{name:'史诗'}
						],
						likeNum:999
					},{
						userId:'ss2sss',
						userAvatar:require('../../static/tagListImage/demo.jpg'),
						userName:'历神',
						issueDate:1234232,
						backgroundImage:require('../../static/tagListImage/demo.jpg'),
						signature:'我乃历神',
						categoryName:'历神话日记',
						tagList:[
							{name:'传说'},
							{name:'史诗'}
						],
						likeNum:999
					}
				],
				netWorkNameDataList:[
					{
						userId:'sssss',
						userAvatar:require('../../static/tagListImage/demo.jpg'),
						userName:'历神',
						issueDate:1234232,
						netWorkName:'我乃历神',
						categoryName:'历神话日记',
						tagList:[
							{name:'传说'},
							{name:'史诗'}
						],
						likeNum:999
					},{
						userId:'ss1sss',
						userAvatar:require('../../static/tagListImage/demo.jpg'),
						userName:'历神',
						issueDate:1234232,
						netWorkName:'我乃历神',
						categoryName:'历神话日记',
						tagList:[
							{name:'传说'},
							{name:'史诗'}
						],
						likeNum:999
					},{
						userId:'ss2sss',
						userAvatar:require('../../static/tagListImage/demo.jpg'),
						userName:'历神',
						issueDate:1234232,
						netWorkName:'我乃历神',
						categoryName:'历神话日记',
						tagList:[
							{name:'传说'},
							{name:'史诗'}
						],
						likeNum:999
					}
				],
				currentActive:0,
				tagList: [{
							name: '头像',
						}, {
							name: '壁纸',
						}, {
							name: '美图'
						}, {
							name: '网名'
						}, {
							name: '签名'
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
		components:{
			imagePreview,
			signature,
			netWorkName
		}
	}
</script>

<style scoped>

</style>
