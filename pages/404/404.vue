<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			let timer = setTimeout(()=>{
				clearTimeout(timer);
				uni.switchTab({
					url:'../index/index'
				})
			},2000)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
