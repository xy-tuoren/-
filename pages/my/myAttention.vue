<template>
	<view>
		<view v-for="(item,index) in AttentionList" :key="item.userId._id">
			<view style="display: flex;
			padding: 10px;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;">
				<view style="display: flex;
				flex: 10;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;">
					<view style="margin-right: 8px;">
						<u-avatar :src="item.userId.userAvatar"></u-avatar>
					</view>
					<view>
						<u--text color="#606266" size="13" :text="item.userId.userName"></u--text>
						<u--text color="#909399" size="12" :text="item.userId.userSignature"></u--text>
					</view>
				</view>
				<view style="flex: 2;">
					<u-button 
					@click="chgAttention(index)"
					:color="item.isAttention===true ? '#c0c4cc' : '#2979ff'"
					size="mini" 
					:type="item.isAttention===true ? 'info' : 'primary'"
					shape="circle" 
					:text="item.isAttention===true ? '已关注' : '+关注'"></u-button>
				</view>
			</view>
			<u-line></u-line>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				AttentionList:[
					{
						userId:{
							_id:'1',
							userName:'历神',
							userAvatar:'',
							userSignature:'我乃历神'
						},
						isAttention:true
					},
					{
						userId:{
							_id:'2',
							userName:'历神',
							userAvatar:'',
							userSignature:'我乃历神'
						},
						isAttention:true
					},
					{
						userId:{
							_id:'3',
							userName:'历神',
							userAvatar:'',
							userSignature:'我乃历神'
						},
						isAttention:true
					}
				]
			}
		},
		methods: {
			chgAttention(index){
				this.AttentionList[index].isAttention = !this.AttentionList[index].isAttention
			}
		}
	}
</script>

<style scoped>

</style>
