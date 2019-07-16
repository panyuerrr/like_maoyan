<template>
	<view>
		<view class="title">{{news.title}}</view>
		<view class="shortintro">
			<view style="margin-left:20upx;">{{news.time}}</view>
			<view class="comment">
			<view >评论数:{{news.commentCount}}</view>
			<view style="margin-left:20upx;margin-right: 10upx;">相关电影/影人</view>
			</view>
		</view>
		<view class="content">
	           <!-- <rich-text :nodes="Array" class="ccc"></rich-text>		 -->
	         <rich-text :nodes="strings">
				 
			 </rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news:{},
				strings:''
			}
		},
		onLoad(){
			uni.request({
				url: '../../static/Detail.json',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res);
					this.news=res.data;
					this.strings=this.imgStyle(res.data.content);
				},
				fail: () => {},
				complete: () => {}
			});
			
			
		},
		methods: {
		    imgStyle(html){
			return  html.replace(/<img/ig,'<img style="width:100%;"');	
				
			},
		}
	}
</script>

<style>
 .title{
	 font-size:42upx;
	 text-align: center;
	 height: 100upx;
	 line-height: 100upx;
 }
.shortintro{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 10upx;
	margin-bottom: 10upx;
}
.comment{
	display: flex;
	flex-direction: row;
	align-items: center;
	color:#576B95;
}
.content{
	box-sizing: border-box;
    padding: 0px 20upx;
}
.content uni-rich-text img{
    width: 100% !important;
	display: inline-block;
}

</style>
