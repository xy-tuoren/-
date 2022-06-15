<template>
	<tab-bar></tab-bar>
</template>

<script>
	export default {
		onLoad() {
			this.$store.commit('changeTabBarIdx',1);
		}
	}
</script>

<style>
</style>
