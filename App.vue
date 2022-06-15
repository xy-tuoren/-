<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			
		},
		onHide: function() {
		
		},
		onPageNotFound: function() {
			uni.navigateTo({
				url:'pages/404/404'
			})
		}
	}
</script>

<style lang="scss">
	@import 'uview-ui/index.scss'
	// 每个页面公共css
</style>
