<script>
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
		
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	/* @import './static/iconfont/iconfont.css'; */

	
uni-tabbar, uni-tabbar .uni-tabbar{
	z-index: 1001;
}
</style>
