<template>
	<view style="position: sticky;top: 0px;z-index: 998;">
		<view class="header">
			<u-row justify="space-between">
				<u-col span="5">
					<view>
						<u--text 
						@click="chgPullDown" 
						color="#303133" 
						:text="showText"
						size="14px"
						suffixIcon="arrow-down-fill"
						iconStyle="font-size:8px;margin-left:3px"
						>
						</u--text>
					</view>
				</u-col>
				<u-col span="5" offset="2">
					<view class="header-right">
						<view @click="headerRight('推荐')">
							<u--text align="center" :color="checked===1 ? '#007aff' : '#606266'" size="13px" text="推荐"></u--text>
						</view>
						<view>
							<u-line direction="col" length="10"></u-line>
						</view>
						<view @click="headerRight('好评榜')">
							<u--text align="center" :color="checked===2 ? '#007aff' : '#606266'" size="13px" text="好评榜"></u--text>
						</view>
						<view>
							<u-line direction="col" length="10"></u-line>
						</view>
						<view @click="headerRight('最新')">
							<u--text align="right" :color="checked===3 ? '#007aff' : '#606266'" size="13px" text="最新"></u--text>
						</view>
					</view>
				</u-col>
			</u-row>
			<view class="pullDown" v-show="pullDownShow">
				<view v-for="(item,index) in headerData" :key="index" @click="$emit('update:NavigationBarTitle',item)" style="padding: 5px;">
					<u--text align="center" color="#f4f4f5" size="13px" :text="item"></u--text>
				</view>
			</view>
		</view>
		<u-overlay zIndex="1" :show="pullDownShow" @click="pullDownShow = false"></u-overlay>
		<u-line></u-line>
	</view>
</template>

<script>
	export default {
		props:{
			showText:String,
			headerData:{
				type:Array
			}
		},
		data(){
			return {
				checked:1,
				pullDownShow:false
			}
		},
		methods:{
			chgPullDown(){
				this.pullDownShow = !this.pullDownShow
			},
			headerRight(name){
				switch(name){
					case '推荐': this.$emit('clickRecommend');this.checked=1;break;
					case '好评榜': this.$emit('clickReputation');this.checked=2;break;
					case '最新': this.$emit('clickNewest');this.checked=3;break;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		background-color: #FFFFFF;
		position: relative;
		z-index: 998;
		padding: 10px;
		.header-right {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-around;
		}
		.pullDown {
			border-radius: 3px;
			padding: 5px 8px;
			top: 10;
			transform: translateY(10px);
			left: 5;
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
	}
</style>
