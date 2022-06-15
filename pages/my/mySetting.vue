<template>
	<view>
		<view style="padding: 10px;">
			<view class="rowFlex">
				<u--text size="13" lineHeight="13" 
				text="修改资料"
				></u--text>
				<u-icon name="arrow-right" ></u-icon>
			</view>
		</view>
		<u-line></u-line>
		<view>
			<u--text color="#2979ff" margin="20px 0 0 0" align="center" text="退出登录" ></u--text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.rowFlex {
		margin: 5px 0px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
