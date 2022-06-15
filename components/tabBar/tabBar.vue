<template>
	<u-tabbar :value="value" 
	@change="tabbarChange" 
	:fixed="true" 
	:placeholder="true"
	:safeAreaInsetBottom="true" 
	activeColor="#2979ff" 
	inactiveColor="#7d7e80">
	<u-tabbar-item v-for="(item,index) in tabbarlist" :key=index :text="item.text"  @click="tabbarItemClick" :icon="item.icon"></u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		name:'tabBar',
		data() {
			return {
				value:0,
				tabbarlist:[
					{text:'首页',icon:'home',path:'/pages/index/index',},
					{text:'关注',icon:'heart',path:'/pages/attention/attention'},
					{text:'我的',icon:'account',path:'/pages/my/my'}
				]
			}
		},
		mounted(){
			this.value = this.$store.state.currTabBarIdx;
			this.tabbarlist[this.value].icon = this.tabbarlist[this.value].icon + '-fill';
		},
		methods: {
			tabbarChange(name){
				this.$store.commit('changeTabBarIdx',name);
			},
			tabbarItemClick(name){
				uni.switchTab({url: this.tabbarlist[name].path});
			}
		}
	}
</script>

<style lang="scss">
</style>
