<template>
	<view>
		<view class="login_body">
			<view>
				<input class="login_text" type="text" placeholder="账户名/手机号/Email">
			</view>
			<view>
				<input class="login_text" type="password" placeholder="请输入您的密码">
			</view>
			<view class="login_btn">
				<button type="submit" >登录</button>
			</view>
			<view class="login_link">
				<a href="#">立即注册</a>
				<a href="#">找回密码</a>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>
<style>
	.login_body {
		width: 100%;
		margin-top: 40upx;
		box-sizing: border-box;
		padding: 0upx 10upx;
	}

	.login_text {
		width: 100%;
		height: 80upx;
		border: none;
		border-bottom: 0.1upx #ccc solid;
		margin-bottom: 10upx;
		outline: none;
		text-indent: 20upx;
	}

	.login_btn {
		height: 100upx;
		width: 100%;
		margin: 40upx auto;
		text-align: center;
		margin-bottom: 20upx;
		
	}


	.login_btn button {
		width: 100%;
		height: 90upx;
		background: #e54847;
		border-radius: 6upx;
		border: none;
		display: block;
		color: white;
		font-size:32upx !important;
		line-height:90upx;
		/* margin-bottom: 10upx; */
	}

	.login_link {
		display: flex;
		justify-content: space-between;
	}

	.login_link a {
		text-decoration: none;
		margin: 0 10upx;
		font-size: 24upx;
		color: #e54847;
	}
</style>
